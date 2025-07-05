import React from 'react'
import Image from 'next/image'
const HeroSection = () => {

  return (
    <section className='flex flex-col lg:flex-row justify-between items-center py-6 md:py-0 px-4 md:px-10'>
        <Image
          className="absolute max-md:rotate-[270deg] left-7 md:left-[50%] -translate-x-1/2 top-30 md:top-0 w-auto h-auto  object-contain -z-20"
          src="/Intersection4.svg"
          alt="layer Image"
          width={120}
          height={120}
        />
        <Image
          className="absolute hidden w-auto h-auto lg:block lg:left-[60%] top-16  object-contain"
          src="/Intersection1.svg"
          alt="layer Image"
          width={80}
          height={80}
        />
        {/* TEXT CONTAINER */}
        <div className="content flex-1 flex justify-center flex-col gap-8 max-w-[550px]">
          <h1 className='text-2xl md:text-5xl leading-tight xl:text-[80px] font-bold text-secondary'>The Right Campaign, With The Right Influencer</h1>
          <p className='text-sm text-place max-w-lg'>Tatheer is a platform that simplifies influencer marketing-advertisers create campaigns, influencers promote them, and get paid per quality clicks</p>
        </div>
        {/* IMAGE CONTAINER */}
      <div className="flex-1 flex my-5 justify-end items-center">
            <Image
              src="/icons/hero.webp"
              alt="A team collaborating on a business project"
              width={800}
              height={400}
              className=" w-auto max-w-md md:max-w-lg lg:max-w-xl h-auto"
              priority
              fetchPriority='high'
            />
      </div>
    </section>
  )
}

export default HeroSection
