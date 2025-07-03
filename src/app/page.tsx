'use client';
import { ScrollToTopButton } from '@/_Components/common/ScrollToTopButton';
import AboutUsSection from '@/_Components/sections/AboutUsSection';
import { CustomerOpinionsSection } from '@/_Components/sections/CustomerOpinionsSection';
import { FAQSection } from '@/_Components/sections/FAQSection';
import { FooterSection } from '@/_Components/sections/Footer';
import HeroSection from '@/_Components/sections/HeroSection';
import { InfluencersSection } from '@/_Components/sections/InfluencersSection';


export default function HomePage() {

  return (
    <div>
      <HeroSection/>
      <AboutUsSection/>
      <InfluencersSection/>
      <CustomerOpinionsSection/>
      <FAQSection/>
      <FooterSection/>
      <ScrollToTopButton/>
    </div>
  );
}
