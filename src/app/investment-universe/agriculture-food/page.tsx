import { SubpageRoute, sectorRoute, subpageMetadata } from "@/components/sections/subpage/SubpageRoute";

const page = sectorRoute("agriculture-food");

export const metadata = subpageMetadata(page);

export default function AgricultureFoodPage() {
  return <SubpageRoute page={page} />;
}
