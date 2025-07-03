import React from 'react'
import Image from 'next/image'
const HeroSection = () => {

  return (
    <section className='flex flex-col lg:flex-row justify-between items-center pt-16 md:py-4 px-4 md:px-10'>
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
        <div className="content flex-1 flex justify-center flex-col gap-8 max-w-[650px]">
          <h1 className='text-2xl md:text-5xl leading-tight xl:text-[80px] font-bold text-secondary'>The Right Campaign, With The Right Influencer</h1>
          <p className='text-sm text-place max-w-lg'>Tatheer is a platform that simplifies influencer marketing-advertisers create campaigns, influencers promote them, and get paid per quality clicks</p>
        </div>
        {/* IMAGE CONTAINER */}
      <div className="flex-1 flex my-5 justify-center items-center">
        <div className="relative w-full mx-auto">
          <Image
            className="absolute  top-[30%] -translate-y-1/2 -z-10 right-[51%] translate-x-1/2 object-contain"
            src="/Group10.svg"
            alt="layer Image"
            width={600}
            height={600}
          />
          <Image
            className="w-full h-auto object-contain max-h-[700px]"
            src="/Image.svg"
            alt="person Image"
            width={700}
            height={700}
            priority={true}
            fetchPriority='high'
          />
          <Image 
            src="/Rectangle2.svg"
            alt="Rectangle1"
            width={10}
            height={10}
            className="absolute w-auto h-auto top-24 xl:top-28 xl:left-28"
          />
          <Image 
            src="/Rectangle3.svg"
            alt="Rectangle2"
            width={15}
            height={15}
            className="absolute w-auto h-auto top-0 xl:top-14 left-56"

          />
          <Image 
            src="/Rectangle1.svg"
            alt="Rectangle3"
            width={15}
            height={15}
            className="absolute w-auto h-auto top-48 xl:top-24 right-0 xl:right-36"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
