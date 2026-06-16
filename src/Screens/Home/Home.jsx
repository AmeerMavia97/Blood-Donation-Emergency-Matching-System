import Navbar from "@/Components/Layout/Navbar/Navbar";
import Footer from "@/Components/Layout/Footer/Footer";
import HeroSection from "@/Components/ScreensLayout/Home/HeroSection";
import Features from "@/Components/ScreensLayout/Home/Features";
import BloodGroupsImpactSection from "@/Components/ScreensLayout/Home/BloodGroupSection";
import LiveImpactSection from "@/Components/ScreensLayout/Home/EmergencyLiveImpact";
import FAQSection from "@/Components/ScreensLayout/Home/FAQSection";

const Home = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#E6E6E6] text-neutral-950">
      <Navbar />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-160px] top-[-120px] h-[420px] w-[420px] rounded-full bg-red-600/10 blur-[90px]" />
        <div className="absolute right-[-180px] top-[420px] h-[520px] w-[520px] rounded-full bg-neutral-950/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.74),rgba(229,229,229,0.88))]" />
      </div>
      <div className="relative z-10">
        <HeroSection />
        <Features />
        <BloodGroupsImpactSection />
        <LiveImpactSection/>
        <FAQSection />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
