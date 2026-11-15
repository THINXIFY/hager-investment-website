import { SubpageRoute, serviceRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = serviceRoute("private-equity");

export const metadata = subpageMetadata(page);

export default function PrivateEquityPage() {
  return <SubpageRoute page={page} />;
}
