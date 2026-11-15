import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("energy");

export const metadata = subpageMetadata(page);

export default function EnergyPage() {
  return <SubpageRoute page={page} />;
}
