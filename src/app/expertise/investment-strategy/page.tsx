import { SubpageRoute, serviceRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = serviceRoute("investment-strategy");

export const metadata = subpageMetadata(page);

export default function InvestmentStrategyPage() {
  return <SubpageRoute page={page} />;
}
