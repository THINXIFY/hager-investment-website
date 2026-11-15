import { randomBytes } from "node:crypto";

import { validateEnquiry } from "@/lib/contact/enquiry";
import { contactFrom, contactTo, isContactConfigured, renderEnquiryAck, renderEnquiryNotification, sendAck } from "@/lib/contact/mail";
import { clientIp, json, readJson } from "@/lib/documents-access/http";
import { sendMail } from "@/lib/documents-access/mail";
import { rateLimit } from "@/lib/rate-limit";

const HOUR = 60 * 60 * 1000;
/** A person needs at least this long to fill in the form; faster submissions are treated as automated. */
const MIN_FILL_MS = 3000;

export async function POST(req: Request) {
  const parsed = await readJson(req);
  if ("error" in parsed) return parsed.error;
  const { body } = parsed;

  // Honeypot and time trap: bots get a convincing answer, nothing is sent.
  const startedAt = Number(body.startedAt);
  if ((typeof body.website === "string" && body.website.trim() !== "") || (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS)) {
    return json({ ok: true, reference: "HI-RECEIVED" });
  }

  const { data, errors } = validateEnquiry(body);
  if (Object.keys(errors).length) return json({ error: "invalid", fields: errors }, 400);

  if (!isContactConfigured()) return json({ error: "not_configured" }, 503);

  const byIp = rateLimit(`contact-ip:${clientIp(req)}`, 5, HOUR);
  const byEmail = rateLimit(`contact-email:${data.email}`, 3, HOUR);
  if (!byIp.allowed || !byEmail.allowed) {
    return json({ error: "rate_limited" }, 429, { "Retry-After": String(Math.max(byIp.retryAfterSec, byEmail.retryAfterSec)) });
  }

  const reference = `HI-${randomBytes(3).toString("hex").toUpperCase()}`;
  try {
    await sendMail({ to: contactTo(), from: contactFrom(), replyTo: data.email, ...renderEnquiryNotification(data, reference) });
  } catch {
    return json({ error: "mail_failure" }, 502);
  }
  // The acknowledgement is a courtesy; its failure does not fail the enquiry.
  if (sendAck()) await sendMail({ to: data.email, from: contactFrom(), ...renderEnquiryAck(data, reference) }).catch(() => undefined);

  return json({ ok: true, reference });
}
