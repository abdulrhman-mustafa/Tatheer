import HeroSection from "@/_Components/sections/HeroSection";
import AboutUsSection from "@/_Components/sections/AboutUsSection";
import {InfluencersSection} from "@/_Components/sections/InfluencersSection";
import {CustomerOpinionsSection} from "@/_Components/sections/CustomerOpinionsSection";
import {FAQSection} from "@/_Components/sections/FAQSection";
import {FooterSection} from "@/_Components/sections/Footer";
import {ScrollToTopButton} from "@/_Components/common/ScrollToTopButton";
import Header from "@/_Components/common/Header/Header";


export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutUsSection />
      <InfluencersSection />
      <CustomerOpinionsSection />
      <FAQSection />
      <FooterSection />
      <ScrollToTopButton />
    </>
  );
}
