import { siteConfig } from "@/config/site";
import { esc, shell } from "@/lib/documents-access/mail";

import { ENQUIRY_TYPES, type EnquiryInput } from "./enquiry";

/**
 * Enquiry emails. Configuration (server-only):
 *   CONTACT_TO_EMAIL    required. Inbox that receives enquiries.
 *   CONTACT_FROM_EMAIL  optional. Sender on a Resend-verified domain (falls back to DOCUMENTS_FROM_EMAIL).
 *   CONTACT_SEND_ACK    optional. "false" disables the acknowledgement email to the sender.
 */
export const contactTo = () => process.env.CONTACT_TO_EMAIL?.trim() || "";
export const contactFrom = () => process.env.CONTACT_FROM_EMAIL?.trim() || process.env.DOCUMENTS_FROM_EMAIL?.trim() || "";
export const isContactConfigured = () => Boolean(process.env.RESEND_API_KEY && contactTo() && contactFrom());
export const sendAck = () => process.env.CONTACT_SEND_ACK?.trim().toLowerCase() !== "false";

const typeLabel = (id: string) => ENQUIRY_TYPES.find((t) => t.id === id)?.label ?? "Enquiry";
const PLATINUM = "#DAE8EA";
const SILVER = "#A9C1C5";
const TEAL = "#117B89";

/** Internal notification to the HAGER inbox. Reply goes straight to the sender. */
export function renderEnquiryNotification(e: EnquiryInput, ref: string) {
  const rows: [string, string][] = [
    ["Reference", ref],
    ["Nature of enquiry", typeLabel(e.type)],
    ["Name", e.name],
    ["Company", e.company || "—"],
    ["Email", e.email],
    ["Telephone", e.phone || "—"],
  ];
  const table = rows
    .map(([k, v]) => `<tr><td style="padding:9px 0;border-bottom:1px solid #27434d;width:38%;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${SILVER};vertical-align:top;">${esc(k)}</td><td style="padding:9px 0;border-bottom:1px solid #27434d;font-size:14px;color:#ffffff;">${esc(v)}</td></tr>`)
    .join("");
  const html = shell(
    `New enquiry from ${e.name}`,
    "New website enquiry",
    `<tr><td style="padding:28px 40px 6px;"><p style="margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${SILVER};">Website · New Enquiry</p></td></tr>
<tr><td style="padding:0 40px 8px;"><h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:28px;line-height:34px;color:#ffffff;">${esc(typeLabel(e.type))}</h1></td></tr>
<tr><td style="padding:16px 40px 6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #27434d;">${table}</table></td></tr>
<tr><td style="padding:18px 40px 6px;"><p style="margin:0 0 8px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${SILVER};">Message</p><div style="font-size:15px;line-height:24px;color:${PLATINUM};white-space:pre-wrap;border-left:2px solid ${TEAL};padding-left:16px;">${esc(e.message)}</div></td></tr>
<tr><td style="padding:16px 40px 26px;"><p style="margin:0;font-size:12px;line-height:18px;color:${SILVER};">Reply to this email to respond directly to ${esc(e.name)}. The sender consented to their details being used to respond to this enquiry.</p></td></tr>`,
  );
  const text = `New website enquiry (${ref})\n\nNature: ${typeLabel(e.type)}\nName: ${e.name}\nCompany: ${e.company || "-"}\nEmail: ${e.email}\nTelephone: ${e.phone || "-"}\n\nMessage:\n${e.message}\n`;
  return { subject: `Website enquiry · ${typeLabel(e.type)} · ${e.name} [${ref}]`, html, text };
}

/** Acknowledgement to the sender. Makes no promise of a response time. */
export function renderEnquiryAck(e: EnquiryInput, ref: string) {
  const html = shell(
    "Thank you for contacting HAGER INVESTMENT.",
    "We have received your enquiry",
    `<tr><td style="padding:28px 40px 6px;"><p style="margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${SILVER};">Enquiry received · ${esc(ref)}</p></td></tr>
<tr><td style="padding:0 40px 8px;"><h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:30px;line-height:36px;color:#ffffff;">Thank you, ${esc(e.name.split(" ")[0] || e.name)}.</h1></td></tr>
<tr><td style="padding:12px 40px 8px;"><p style="margin:0;font-size:15px;line-height:24px;color:${PLATINUM};">We have received your ${esc(typeLabel(e.type).toLowerCase())} enquiry. It will be reviewed and, where appropriate, we will reply to this email address.</p></td></tr>
<tr><td style="padding:12px 40px 26px;"><p style="margin:0;font-size:13px;line-height:20px;color:${SILVER};">Please keep the reference ${esc(ref)} for any follow-up. If you did not submit this enquiry, you can ignore this email.</p></td></tr>`,
  );
  const text = `Thank you for contacting ${siteConfig.name.toUpperCase()}.\n\nWe have received your ${typeLabel(e.type).toLowerCase()} enquiry (reference ${ref}). It will be reviewed and, where appropriate, we will reply to this email address.\n\nIf you did not submit this enquiry, you can ignore this email.`;
  return { subject: `We have received your enquiry [${ref}]`, html, text };
}
