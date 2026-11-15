import { SubpageRoute, serviceRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = serviceRoute("mergers-acquisitions");

export const metadata = subpageMetadata(page);

export default function MergersAcquisitionsPage() {
  return <SubpageRoute page={page} />;
}
