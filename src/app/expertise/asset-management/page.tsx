import { SubpageRoute, serviceRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = serviceRoute("asset-management");

export const metadata = subpageMetadata(page);

export default function AssetManagementPage() {
  return <SubpageRoute page={page} />;
}
