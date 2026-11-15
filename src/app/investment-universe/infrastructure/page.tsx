import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("infrastructure");

export const metadata = subpageMetadata(page);

export default function InfrastructurePage() {
  return <SubpageRoute page={page} />;
}
