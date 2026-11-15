import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("real-estate");

export const metadata = subpageMetadata(page);

export default function RealEstatePage() {
  return <SubpageRoute page={page} />;
}
