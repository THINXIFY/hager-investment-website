import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("life-sciences");

export const metadata = subpageMetadata(page);

export default function LifeSciencesPage() {
  return <SubpageRoute page={page} />;
}
