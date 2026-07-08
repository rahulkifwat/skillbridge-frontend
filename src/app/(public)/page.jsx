import HeroSection from "@/components/sections/HeroSection";
import FeatureGridSection from "@/components/sections/FeatureGridSection";
import LearnByDoingSection from "@/components/sections/LearnByDoingSection";
import StatsSection from "@/components/sections/StatsSection";
import TrustedBySection from "@/components/sections/TrustedBySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaBanner from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureGridSection />
      <LearnByDoingSection />
      <StatsSection />
      <TrustedBySection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
