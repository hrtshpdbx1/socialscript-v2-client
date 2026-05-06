// Home.jsx
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import ProcessTimeline from "../components/sections/ProcessTimeline";
import ExploreSection from "../components/sections/ExploreSection";
import FaqSection from "../components/sections/FaqSection";
import AboutSection from "../components/sections/AboutSection";

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      
      <ExploreSection /> 
      <ProcessTimeline />
      <FaqSection />
      <AboutSection />
    </>
  );
}

export default Home;