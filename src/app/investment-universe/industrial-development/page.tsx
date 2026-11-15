import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("industrial-development");

export const metadata = subpageMetadata(page);

export default function IndustrialDevelopmentPage() {
  return <SubpageRoute page={page} />;
}
