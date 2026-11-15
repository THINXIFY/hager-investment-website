import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("healthcare");

export const metadata = subpageMetadata(page);

export default function HealthcarePage() {
  return <SubpageRoute page={page} />;
}
