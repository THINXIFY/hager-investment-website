import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("logistics");

export const metadata = subpageMetadata(page);

export default function LogisticsPage() {
  return <SubpageRoute page={page} />;
}
