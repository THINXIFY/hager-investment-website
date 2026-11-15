/** Enquiry form schema, shared by the client form and the /api/contact route. */

export const ENQUIRY_TYPES = [
  { id: "investment", label: "Investment Opportunity", hint: "Introduce a company, project or asset for consideration." },
  { id: "partnership", label: "Partnership", hint: "Explore collaboration or a long-term relationship." },
  { id: "services", label: "Expertise & Services", hint: "Questions about our areas of expertise." },
  { id: "corporate", label: "Corporate Enquiry", hint: "Corporate information and business correspondence." },
  { id: "other", label: "Other", hint: "Anything else you would like to raise with us." },
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number]["id"];

export const LIMITS = { name: 120, company: 160, email: 254, phone: 40, message: 3000, messageMin: 20 } as const;

export interface EnquiryInput {
  type: EnquiryType;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

export type EnquiryErrors = Partial<Record<"type" | "name" | "email" | "phone" | "message" | "consent" | "company", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "");

/** Validates and normalises a submission. Same rules on both sides; the server is authoritative. */
export function validateEnquiry(raw: Record<string, unknown>): { data: EnquiryInput; errors: EnquiryErrors } {
  const type = ENQUIRY_TYPES.some((t) => t.id === raw.type) ? (raw.type as EnquiryType) : ("" as EnquiryType);
  const data: EnquiryInput = {
    type,
    name: clean(raw.name, LIMITS.name).replace(/[\r\n]+/g, " "),
    company: clean(raw.company, LIMITS.company).replace(/[\r\n]+/g, " "),
    email: clean(raw.email, LIMITS.email).toLowerCase(),
    phone: clean(raw.phone, LIMITS.phone).replace(/[\r\n]+/g, " "),
    message: clean(raw.message, LIMITS.message),
    consent: raw.consent === true,
  };
  const errors: EnquiryErrors = {};
  if (!data.type) errors.type = "Please choose the nature of your enquiry.";
  if (data.name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL.test(data.email) || /[\r\n,;<>]/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.phone && !/^[+\d][\d\s().\-/]{5,}$/.test(data.phone)) errors.phone = "Please enter a valid telephone number, or leave it blank.";
  if (data.message.length < LIMITS.messageMin) errors.message = `Please tell us a little more (at least ${LIMITS.messageMin} characters).`;
  if (!data.consent) errors.consent = "Please confirm that we may use your details to respond.";
  return { data, errors };
}
