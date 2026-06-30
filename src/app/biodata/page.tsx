import { Suspense } from "react";
import BioData from "@/components/BioData";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BioData />
    </Suspense>
  );
}