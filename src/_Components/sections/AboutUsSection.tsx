import React from "react";
import Image from "next/image";

const AboutUsSection = () => {
  return (
    <section id="about-us" className="bg-white py-10">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-secondary mb-10">
        About Us
      </h2>
      <div className="line relative"></div>
      <div className=" mx-auto px-4 md:px-10 flex py-10 items-center flex-col-reverse md:flex-row md:justify-between gap-8 md:gap-16">
        <div className="flex-1 md:text-start max-w-2xl">
          <p className="text-base md:text-lg max-w-xl text-place leading-relaxed">
            Tatheer is a comprehensive digital solution that empowers brands to
            create and run successful influencer marketing campaigns, while
            offering self-planned campaigns, where influencers can propose
            campaigns and collaborate with brands that align with their content
            and values. We help brands find the perfect influencers to achieve
            their marketing goals, ensuring their message reach the right
            audience, at the right time, with the right style.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/about.svg"
            alt="A team collaborating on a business project"
            width={600}
            height={400}
            className=" w-full max-w-md md:max-w-lg lg:max-w-xl h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
