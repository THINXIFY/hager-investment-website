import { SubpageRoute, serviceRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = serviceRoute("real-estate-investment");

export const metadata = subpageMetadata(page);

export default function RealEstateInvestmentPage() {
  return <SubpageRoute page={page} />;
}
