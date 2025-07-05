// src/_Components/dashboard/EarningCard.tsx

import React from 'react';
import Image from 'next/image';
import Button from '@/_Components/ui/Button';
import { twMerge } from 'tailwind-merge';
import { EarningCardData } from '@/types/earning';
import { useAuth } from '@/context/AuthContext';

interface EarningCardProps extends EarningCardData {
  onWithdrawalRequest: (earningId: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}

const EarningCard: React.FC<EarningCardProps> = ({
  id,
  brandLogoUrl,
  brandHeadline,
  productName,
  description,
  postedTime,
  earningCardImageUrl,
  clickCount,
  fixedPrice,
  isWithdrawalPossible,
  onWithdrawalRequest,
  isSelected,
  onSelect,
}) => {

  const { userRole } = useAuth();


  const isInfluencer = userRole === 'influencer';
  return (
    <div className="flex flex-col">
      <div
        className={twMerge(
          "bg-white rounded-sm flex flex-col border p-4 cursor-pointer",
          isSelected ? "border-primary ring-2 ring-primary" : "border-place",
          "transition-all duration-200 ease-in-out"
        )}
        onClick={onSelect}
      >
        <div className="pb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={brandLogoUrl}
              alt="Brand Logo"
              width={40}
              height={40}
              className="rounded-full mr-3 object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = '/icons/logo.svg'; }}
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-primary">{brandHeadline}</p>
              <p className="text-xs text-secondary">{productName}</p>
            </div>
          </div>
          {isSelected && (
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )}
        </div>

        <div className="py-2">
          <p className="text-md font-semibold text-secondary mb-2">{description}</p>
          <p className="text-sm text-place">{postedTime}</p>
        </div>

        <div className="relative w-full h-48 mt-2">
          <Image
            src={earningCardImageUrl}
            alt={productName}
            layout="fill"
            objectFit="cover"
            className='rounded-sm'
            onError={(e) => { (e.target as HTMLImageElement).src = '/makeup.svg'; }}
          />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 py-5 w-full">
          <div className="flex flex-col items-center justify-center text-center border border-place rounded-sm px-2 py-3">
            <span className="text-base font-bold text-secondary">{clickCount.toLocaleString()}</span>
            <span className="text-xs text-place">Click Count</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border border-place rounded-sm px-2 py-3">
            <span className="text-base font-bold text-secondary">{postedTime}</span>
            <span className="text-xs text-place">Posted Since</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border border-place rounded-sm px-2 py-3">
            <span className="text-base font-bold text-secondary">${fixedPrice.toFixed(2)}</span>
            <span className="text-xs text-place">Fixed-Price</span>
          </div>
        </div>
      </div> 

      {isInfluencer && (
        <div className="mt-4">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onWithdrawalRequest(id);
            }}
            size='medium'
            variant={isWithdrawalPossible ? 'primary' : 'ghost'}
            className={twMerge(
              "w-full",
              !isWithdrawalPossible && "bg-gray-300 text-gray-600 cursor-not-allowed"
            )}
            disabled={!isWithdrawalPossible}
          >
            {isWithdrawalPossible ? 'Withdrawal Request' : 'Withdrawal Request/Over $100'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EarningCard;
