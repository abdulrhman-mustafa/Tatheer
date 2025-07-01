'use client'; // هذا التوجيه ضروري لاستخدام useRouter
import Header from '@/_Components/common/Header/Header';
import AboutUsSection from '@/_Components/sections/AboutUsSection';
import { CustomerOpinionsSection } from '@/_Components/sections/CustomerOpinionsSection';
import { FAQSection } from '@/_Components/sections/FAQSection';
import { FooterSection } from '@/_Components/sections/Footer';
import HeroSection from '@/_Components/sections/HeroSection';
import { InfluencersSection } from '@/_Components/sections/InfluencersSection';


export default function HomePage() {

  return (
    <div>
      <Header isAuthenticated={false} />
      <HeroSection/>
      <AboutUsSection/>
      <InfluencersSection/>
      <CustomerOpinionsSection/>
      <FAQSection/>
      <FooterSection/>
    </div>
  );
}
