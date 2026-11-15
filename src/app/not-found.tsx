import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Section tone="white" className="flex min-h-[80svh] items-center pt-[calc(var(--header-h)+4rem)]">
      <div className="container-site">
        <Eyebrow index="404" className="mb-8">
          Page not found
        </Eyebrow>
        <h1 className="text-section mb-8 max-w-[18ch]">This page could not be found.</h1>
        <p className="text-lede mb-12 max-w-[34rem] text-(--fg-muted)">
          The page may have moved, or the address may be incorrect.
        </p>
        <ButtonLink href="/" variant="dark" arrow>
          Return to the homepage
        </ButtonLink>
      </div>
    </Section>
  );
}
