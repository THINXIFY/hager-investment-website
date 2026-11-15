import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("artificial-intelligence");

export const metadata = subpageMetadata(page);

export default function ArtificialIntelligencePage() {
  return <SubpageRoute page={page} />;
}
