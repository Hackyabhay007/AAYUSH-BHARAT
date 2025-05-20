// app/about/page.tsx or pages/about.tsx
import Banner from "@/app/(pages)/about-us/components/Banner";
import Vision from "@/app/(pages)/about-us/components/Vision";
import Promise from "@/app/(pages)/about-us/components/Promise";
// import FounderNote from "@/app/(pages)/about-us/components/FounderNote";
import Certifications from "@/app/(pages)/about-us/components/Certification";
import CTA from "@/app/(pages)/about-us/components/CTA";

export default function PageContent() {
  return (
    <main className="text-gray-900">
      <Banner />
      <Vision />
      <Promise />
      {/* <FounderNote /> */}
      <Certifications />
      <CTA />
    </main>
  );
}
