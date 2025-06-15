import ProcessFlowSection from "./components/ProcessFlowSection";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";


export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <ProcessFlowSection />
    </div>
  );
}