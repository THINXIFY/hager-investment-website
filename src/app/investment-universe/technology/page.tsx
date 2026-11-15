import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("technology");

export const metadata = subpageMetadata(page);

export default function TechnologyPage() {
  return <SubpageRoute page={page} />;
}
