import heroGlassInterior from "@/assets/images/ct-primary-glass-interior.jpg";
import { contactDetails, siteConfig } from "@/config/site";

import type { Photo } from "./home";

/* ==========================================================================
   Contact (CT-02, company redesign, approved 2026-11-15):
   - an enquiry form (sent server-side through Resend to CONTACT_TO_EMAIL);
   - the registered office from the public LEI record, published on approval.
   Email and telephone appear only once confirmed in `contactDetails`.
   Nothing here implies dedicated teams, response times or regulated services.
   Photography is illustrative and implies no association with any building shown.
   ========================================================================== */

export { contactDetails };

export const officeAddress = contactDetails.address ?? ["Luxembourg"];
export const officeAddressLine = officeAddress.join(", ");
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddressLine)}`;

export const ctHero = {
  eyebrow: "Contact",
  titleLines: ["Begin a Meaningful", "Conversation."],
  title: "Begin a Meaningful Conversation.",
  description: "For investment opportunities, partnerships and corporate enquiries, we welcome you to get in touch with HAGER INVESTMENT.",
  image: { src: heroGlassInterior, alt: "A quiet, double-height interior with a tall wall of slender glazing and a single column" } satisfies Photo,
};

export const ctEnquiry = {
  eyebrow: "Send an Enquiry",
  title: "How Can We Help?",
  intro: "Tell us a little about yourself and the purpose of your enquiry. Every message is read and reviewed personally.",
  next: [
    { name: "Submit your enquiry", body: "Choose its nature and share the essentials." },
    { name: "Confirmation by email", body: "You receive an acknowledgement with your reference." },
    { name: "Personal review", body: "Where appropriate, we reply to you directly by email." },
  ],
};

export const ctOffice = {
  eyebrow: "Registered Office",
  title: "Established in Luxembourg.",
  body: "HAGER INVESTMENT is a société anonyme incorporated under the laws of the Grand Duchy of Luxembourg, with a corporate history dating to 1993.",
  locality: "Livange · Grand Duchy of Luxembourg",
};

/** Verified company facts only. */
export const ctCompany = {
  eyebrow: "Company Information",
  title: "Corporate Identity.",
  facts: [
    { term: "Company", value: "HAGER INVESTMENT" },
    { term: "Legal Form", value: "Société Anonyme (S.A.)" },
    { term: "Established", value: siteConfig.foundingYear },
    { term: "Jurisdiction", value: "Grand Duchy of Luxembourg" },
    { term: "Trade and Companies Register", value: `RCS Luxembourg ${siteConfig.registration}`, copy: siteConfig.registration },
    { term: "Legal Entity Identifier", value: siteConfig.lei, copy: siteConfig.lei },
  ] as { term: string; value: string; copy?: string }[],
  documents: {
    eyebrow: "Private Documents",
    title: "Request Corporate Documents.",
    body: "Verify your email address with a one-time code and the documents are sent securely to your inbox.",
  },
};

export const ctFaq = {
  eyebrow: "Frequently Asked",
  title: "Good to Know.",
  items: [
    {
      q: "What kinds of enquiries can I send?",
      a: "Investment opportunities, partnership proposals, questions about our areas of expertise and services, and corporate or general enquiries. Choose the nature of your enquiry in the form so it reaches the right context.",
    },
    {
      q: "How do I request HAGER INVESTMENT's private documents?",
      a: "Select “Request Private Documents”, enter your email address and confirm the six-digit code we send you. The documents are then emailed to that verified address.",
    },
    {
      q: "Can I attach files to my enquiry?",
      a: "The form accepts text only. Describe your proposal briefly; if further material is useful, we will follow up with you by email.",
    },
    {
      q: "Where is HAGER INVESTMENT registered?",
      a: `HAGER INVESTMENT is registered in Luxembourg with the Trade and Companies Register under RCS ${siteConfig.registration}. Its registered office is at ${officeAddressLine}.`,
    },
    {
      q: "How is my personal information handled?",
      a: "Details you submit are used only to review and respond to your enquiry, as described in our Privacy Policy.",
      link: { label: "Read the Privacy Policy", href: "/privacy-policy" },
    },
  ] as { q: string; a: string; link?: { label: string; href: string } }[],
};
