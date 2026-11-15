import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("financial-services");

export const metadata = subpageMetadata(page);

export default function FinancialServicesPage() {
  return <SubpageRoute page={page} />;
}
