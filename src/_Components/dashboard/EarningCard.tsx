// src/_Components/dashboard/EarningCard.tsx

import React from 'react';
import Image from 'next/image';


interface EarningCardProps {
    brandLogoUrl: string;
    brandHeadline: string; // "Your skin deserves the best"
    productName: string;   // "Beauty Plus"
    description: string;
    postedTime: string;    // "Posted 23 minutes ago"
    imageUrl: string;
    clickCount: number;
    postedSinceDays: number;
    fixedPrice: number;
    earningCardImageUrl: string;
  // تم إزالة isWithdrawalPossible و onWithdrawalRequest من هنا
}

const EarningCard: React.FC<EarningCardProps> = ({
    brandLogoUrl,
    brandHeadline,
    productName,
    description,
    postedTime,
    earningCardImageUrl,
    clickCount,
    postedSinceDays,
    fixedPrice,
  // تم إزالة isWithdrawalPossible و onWithdrawalRequest من الـ props
}) => {
    return (
        <div className=" rounded-sm p-4 border border-place">
            <div className="flex items-center space-x-3 mb-3">
                <Image
                    src={brandLogoUrl || ''}
                    alt="Brand Logo"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/logos/default-brand-logo.png'; }}
                />
                <div>
                    <p className="text-sm font-semibold text-primary">{brandHeadline}</p>
                    <p className="text-xs text-secondary">{productName}</p>
                </div>
            </div>
        
        <p className="text-sm text-secondary mb-2">{description}</p>
        <p className="text-xs text-place mb-3">{postedTime}</p>
        
        <div className="mb-4">
            <Image
                src={earningCardImageUrl || '/makeup.svg'}
                alt="Product Image"
                width={300}
                height={200}
                className="rounded-sm object-cover w-full h-auto"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/campaigns/default-product.png'; }}
            />
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm text-secondary">
            <div className="p-2 border border-place rounded-sm">
                <p className="text-base font-semibold">{clickCount}</p>
                <p className="text-xs text-place">click count</p>
            </div>
            <div className="p-2 border border-place rounded-sm">
                <p className="text-base font-semibold">{postedSinceDays} Day</p>
                <p className="text-xs text-place">Posted Since</p>
            </div>
            <div className="p-2 border border-place rounded-sm">
                <p className="text-base font-semibold">${fixedPrice}</p>
                <p className="text-xs text-place">Fixed-Price</p>
            </div>
        </div>
        </div>
);
};

export default EarningCard;
