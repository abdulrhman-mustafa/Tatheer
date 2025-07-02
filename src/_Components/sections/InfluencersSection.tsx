    "use client";

    import React from "react";
    import Image from "next/image";
    import { Swiper, SwiperSlide } from "swiper/react";
    import { Autoplay } from "swiper/modules";
    import "swiper/css";
    import "swiper/css/autoplay";

    interface Influencer {
    id: string;
    name: string;
    imageUrl: string;
    }

    const mockInfluencers: Influencer[] = [
    {
        id: "1",
        name: "Mahmoud Hanafi",
        imageUrl: "/influencer-1.svg",
    },
    {
        id: "2",
        name: "Beauty Plus",
        imageUrl: "/influencer-2.svg",
    },
    {
        id: "3",
        name: "Omar Gaming",
        imageUrl: "/influencer-3.svg",
    },
    {
        id: "4",
        name: "Sara Cooks",
        imageUrl: "/influencer-4.svg",
    },
    {
        id: "5",
        name: "Mahmoud Hanafi",
        imageUrl: "/influencer-1.svg",
    },
    {
        id: "6",
        name: "Beauty Plus",
        imageUrl: "/influencer-2.svg",
    },
    {
        id: "7",
        name: "Omar Gaming",
        imageUrl: "/influencer-3.svg",
    },
    {
        id: "8",
        name: "Sara Cooks",
        imageUrl: "/influencer-4.svg",
    },
    ];

    export const InfluencersSection: React.FC = () => {
    return (
        <section
        id="influencers-section"
        className="bg-input py-16 md:py-24 text-center"
        >
        <h2 className="text-center text-3xl md:text-4xl font-bold text-secondary mb-10">
            Influencers
        </h2>
        <div className="line relative"></div>
        <div className="mx-auto px-4 md:px-6 lg:px-8">
            <div className="mb-12">
            <p className="text-base md:text-lg text-place max-w-2xl mx-auto">
                Grow your business through influencer-powered, pay-per-click
                campaigns.
            </p>
            </div>

            <Swiper
                spaceBetween={32} 
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 }, 
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 }, 
                }}
                grabCursor={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                dir="rtl"
                className="px-4 py-8"
            >
            {mockInfluencers.map((influencer) => (
                <SwiperSlide key={influencer.id}>
                <div className="rounded-sm">
                    <div className="relative mx-auto mb-4">
                    <Image
                        src={influencer.imageUrl}
                        alt={influencer.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full rounded-sm"
                    />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {influencer.name}
                    </h3>
                </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
        </section>
    );
    };
