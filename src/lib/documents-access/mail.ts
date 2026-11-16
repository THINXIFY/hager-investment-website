import { contactDetails, siteConfig } from "@/config/site";

/**
 * Server-only email delivery for private document requests, through Resend's REST API (plain fetch, no SDK).
 * Everything sensitive comes from environment variables; nothing reaches the browser.
 *
 *   RESEND_API_KEY        required. API key from Resend.
 *   DOCUMENTS_FROM_EMAIL  required. A sender on a domain verified with Resend,
 *                         e.g. "HAGER INVESTMENT <info@hager-investment.com>".
 *   DOCUMENTS_REPLY_TO    optional. Reply-to address (defaults to the confirmed contact email, if any).
 *   RESEND_API_URL        optional. Endpoint override (testing only).
 */
const DEFAULT_URL = "https://api.resend.com/emails";

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const fromAddress = () => process.env.DOCUMENTS_FROM_EMAIL?.trim() || process.env.CONTACT_FROM_EMAIL?.trim() || "";
const replyTo = () => process.env.DOCUMENTS_REPLY_TO?.trim() || contactDetails.email || "";

export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && fromAddress());
}

export interface OutgoingAttachment {
  filename: string;
  content: Buffer;
}

export async function sendMail(input: { to: string; subject: string; html: string; text: string; attachments?: OutgoingAttachment[]; from?: string; replyTo?: string }): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = input.from || fromAddress();
  const reply = input.replyTo ?? replyTo();
  if (!key || !from) throw new Error("mail_not_configured");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  try {
    const res = await fetch(process.env.RESEND_API_URL || DEFAULT_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [input.to],
        ...(reply ? { reply_to: reply } : {}),
        subject: input.subject,
        html: input.html,
        text: input.text,
        ...(input.attachments?.length ? { attachments: input.attachments.map((a) => ({ filename: a.filename, content: a.content.toString("base64") })) } : {}),
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`provider_${res.status}`);
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------ templates (HAGER palette) ------------------------------ */

const PETROL = "#102C35";
const TEAL = "#117B89";
const SILVER = "#A9C1C5";
const PLATINUM = "#DAE8EA";
const PORCELAIN = "#F7F6F1";

/** Verified identity only: no address or email is shown unless confirmed in contactDetails. */
const footerLine = () => `${siteConfig.name.toUpperCase()} · Société Anonyme · Luxembourg · RCS ${siteConfig.registration}`;

export function shell(preheader: string, title: string, body: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="color-scheme" content="light dark" /><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background-color:${PORCELAIN};font-family:Arial,Helvetica,sans-serif;">
<span style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;color:${PORCELAIN};">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${PORCELAIN};padding:32px 12px;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${PETROL};">
<tr><td style="padding:34px 40px 26px;">
<span style="font-family:Arial,Helvetica,sans-serif;font-size:22px;letter-spacing:6px;color:#ffffff;">HAGER</span><span style="display:inline-block;width:1px;height:18px;background-color:${SILVER};margin:0 12px;vertical-align:middle;"></span><span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:3px;color:${SILVER};vertical-align:middle;">INVESTMENT</span>
</td></tr>
<tr><td style="padding:0 40px;"><div style="height:1px;background-color:${TEAL};line-height:1px;font-size:1px;width:48px;">&nbsp;</div></td></tr>
${body}
<tr><td style="padding:8px 40px 34px;">
<div style="height:1px;background-color:#27434d;line-height:1px;font-size:1px;margin-bottom:18px;">&nbsp;</div>
<p style="margin:0;font-size:12px;line-height:18px;color:${SILVER};">${esc(footerLine())}</p>
</td></tr>
</table></td></tr></table></body></html>`;
}

export function renderOtpEmail(code: string, ttlMinutes: number) {
  const digits = code
    .split("")
    .map((d) => `<td style="padding:0 4px;"><div style="width:44px;height:56px;line-height:56px;text-align:center;font-size:26px;font-weight:bold;color:${PETROL};background-color:${PORCELAIN};">${d}</div></td>`)
    .join("");
  const html = shell(
    "Use this code to receive the requested HAGER INVESTMENT documents.",
    "Your HAGER INVESTMENT verification code",
    `<tr><td style="padding:28px 40px 6px;"><p style="margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${SILVER};">Private Documents · Verification</p></td></tr>
<tr><td style="padding:0 40px 8px;"><h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:30px;line-height:36px;color:#ffffff;">Your verification code</h1></td></tr>
<tr><td style="padding:12px 40px 4px;"><p style="margin:0;font-size:15px;line-height:24px;color:${PLATINUM};">Enter this six-digit code in the window on our website to confirm your email address. The requested documents will then be sent to you.</p></td></tr>
<tr><td style="padding:22px 36px 6px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>${digits}</tr></table></td></tr>
<tr><td style="padding:14px 40px 26px;"><p style="margin:0;font-size:13px;line-height:20px;color:${SILVER};">The code expires in ${ttlMinutes} minutes. If you did not make this request, you can safely ignore this email; no documents are sent without the code.</p></td></tr>`,
  );
  const text = `HAGER INVESTMENT - Private Documents\n\nYour verification code: ${code}\n\nEnter this code on our website to confirm your email address. It expires in ${ttlMinutes} minutes.\nIf you did not make this request, ignore this email; no documents are sent without the code.\n\n${footerLine()}`;
  return { subject: "Your HAGER INVESTMENT verification code", html, text };
}

export function renderDocumentsEmail(filenames: string[]) {
  const list = filenames
    .map((f) => `<tr><td style="padding:10px 0;border-bottom:1px solid #27434d;font-size:14px;line-height:20px;color:${PLATINUM};"><span style="color:${TEAL};">&#9670;</span>&nbsp;&nbsp;${esc(f)}</td></tr>`)
    .join("");
  const html = shell(
    "Your requested HAGER INVESTMENT documents are attached.",
    "Your requested HAGER INVESTMENT documents",
    `<tr><td style="padding:28px 40px 6px;"><p style="margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${SILVER};">Private Documents · Delivered</p></td></tr>
<tr><td style="padding:0 40px 8px;"><h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:30px;line-height:36px;color:#ffffff;">Your documents are attached</h1></td></tr>
<tr><td style="padding:12px 40px 8px;"><p style="margin:0;font-size:15px;line-height:24px;color:${PLATINUM};">Thank you for verifying your email address. The documents you requested from HAGER INVESTMENT are attached to this message:</p></td></tr>
<tr><td style="padding:10px 40px 6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #27434d;">${list}</table></td></tr>
<tr><td style="padding:16px 40px 26px;"><p style="margin:0;font-size:13px;line-height:20px;color:${SILVER};">These documents are confidential to the recipient. To discuss any of the opportunities they describe, simply reply to this email.</p></td></tr>`,
  );
  const text = `HAGER INVESTMENT - Private Documents\n\nThank you for verifying your email address. The documents you requested are attached:\n\n${filenames.map((f) => `- ${f}`).join("\n")}\n\nThese documents are confidential to the recipient. To discuss any of the opportunities they describe, simply reply to this email.\n\n${footerLine()}`;
  return { subject: "Your requested HAGER INVESTMENT documents", html, text };
}
