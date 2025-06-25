"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

interface CustomerOpinion {
    id: string;
    clientName: string;
    opinion: string;
    clientAvatarUrl?: string;
    rating?: number;
}

const mockCustomerOpinions: CustomerOpinion[] = [
    {
        id: "1",
        clientName: "Ali Mahmoud",
        opinion:
            "Tatheer is an amazing platform that makes influencer marketing incredibly easy and effective. The results were excellent!",
        clientAvatarUrl: "/influencer-1.svg",
        rating: 5,
    },
    {
        id: "2",
        clientName: "Hana Abdullah",
        opinion:
            "I was able to connect with influencers who truly understood my brand. The simplicity and efficiency of Tatheer are unmatched.",
        clientAvatarUrl: "/influencer-2.svg",
        rating: 4,
    },
    {
        id: "3",
        clientName: "Khaled Omar",
        opinion:
            "As an influencer, Tatheer provided me with great opportunities to collaborate with top brands and get paid fairly. Highly recommend!",
        clientAvatarUrl: "/influencer-3.svg",
        rating: 5,
    },
    {
        id: "4",
        clientName: "Layla Hassan",
        opinion:
            "The platform's intuitive design made it easy to launch my campaign. I saw significant engagement and a great return on investment.",
        clientAvatarUrl: "/influencer-4.svg",
        rating: 4,
    },
];

export const CustomerOpinionsSection: React.FC = () => {
const renderStars = (rating: number | undefined) => {
if (!rating) return null;
    const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
            stars.push(
                <span key={i} className="text-yellow-400">
                ★
                </span>
            );
            } else {
            stars.push(
                <span key={i} className="text-place">
                ☆
                </span>
            );
        }
}
    return <div className="flex justify-end mt-2">{stars}</div>;
};

return (
<section id="opinions" className="bg-white py-16 md:py-24">
    <h2 className="text-3xl mb-10 md:text-4xl font-bold text-secondary text-center">
        Customer Opinions
    </h2>
    <div className="line relative"></div>
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            grabCursor={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            dir="rtl"
            className="px-0 py-8"
        >
            {mockCustomerOpinions.map((opinion) => (
            <SwiperSlide key={opinion.id}>
                <div className="relative w-full max-w-sm bg-input rounded-sm  mx-auto">
                {/* Curved top border using clip-path */}
                <div
                    className="h-20 bg-gradient-to-r from-primary to-phover rounded-t-sm rounded-curve"
                />

                    {/* Card content */}
                    <div className="px-6 pb-6 -mt-10 relative rounded-sm">
                        <div className="flex justify-end mb-4">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                <Image
                                    src={opinion.clientAvatarUrl || "/images/avatar.jpg"}
                                    alt={`${opinion.clientName}'s avatar`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Name and title */}
                        <div className="text-left space-y-1">
                            <h3 className="text-xl font-semibold text-secondary">
                                {opinion.clientName}
                            </h3>
                            <p className="text-sm text-place">Customer</p>
                            {renderStars(opinion.rating)}
                        </div>

                        {/* Opinion text */}
                        <p className="mt-4 text-sm text-left text-place leading-relaxed">
                            {opinion.opinion}
                        </p>

                        
                    </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
    </div>
</section>
);
};
