import { SubpageRoute, serviceRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = serviceRoute("corporate-advisory");

export const metadata = subpageMetadata(page);

export default function CorporateAdvisoryPage() {
  return <SubpageRoute page={page} />;
}
