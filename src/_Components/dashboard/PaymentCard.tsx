// src/_Components/dashboard/PaymentCard.tsx

import React from 'react';
import Image from 'next/image';
import Button from '@/_Components/ui/Button';

interface PaymentCardProps {
  holderName: string;
  cardBank: string;
  cardNumber: string; 
  cardType: 'VISA' | 'MasterCard' | string; 
  onEdit: () => void;
  onRemove: () => void; 
  className?: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  holderName,
  cardBank,
  cardNumber,
  cardType,
  onEdit,
  onRemove,
  className,
}) => {
  const formatNumber = (num: string) => {
    if (!num || num.length < 8) return num; 
    const firstFour = num.substring(0, 4);
    const lastFour = num.substring(num.length - 4);
    return `${firstFour} •••• •••• ${lastFour}`;
  };


  const getCardLogo = (type: string) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return '/icons/visa.svg';
      case 'mastercard':
        return '/icons/masterCard.png'; 
      default:
        return '/icons/visa.svg'; 
    }
  };

  return (
    <div className={`flex flex-col items-center  ${className}`}>
      {/* Card Display */}
      <div className="relative w-full aspect-[1.585/1] rounded-lg overflow-hidden"
          style={{
            backgroundImage: 'url(/cardbank.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
      >
        <div className="absolute inset-6 md:inset-12 flex flex-col justify-between">

            {/* Card Holder Name */}
            <div className="flex-grow flex items-start mt-5"> 
                <p className="text-lg md:text-2xl text-white font-bold tracking-wide">{holderName}</p>
            </div>

            {/* Card Bank & Number */}
            <div className="flex flex-col mb-4">
                <p className="text-base md:text-lg font-semibold text-white mb-1 tracking-wider">
                    {cardBank}
                </p>
                <p className="text-xl md:text-2xl font-mono text-white tracking-wider">
                    {formatNumber(cardNumber)}
                </p>
            </div>

            {/* Card Type Logo */}
            <div className="flex justify-end mb-5">
                <Image
                    src={getCardLogo(cardType)}
                    alt={`${cardType} Logo`}
                    width={90}
                    height={30}
                    objectFit="contain"
                    className="w-auto h-auto max-w-[90px]" 
                />
            </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-start w-full space-y-2">
        <Button
          onClick={onEdit}
          variant='link' 
          className="flex items-center px-0 py-0 text-place text-lg font-bold hover:text-secondary transition-colors"
        >
          <Image
            src="/edit.svg" 
            alt="Edit Icon"
            width={25}
            height={25}
            className="w-auto h-auto"
          />
          Edit Card
        </Button>
        <Button
          onClick={onRemove}
          variant='link'
          className="flex items-center px-0 py-0 text-place text-lg font-bold hover:text-secondary transition-colors"
        >
          <Image
            src="/remove.svg"
            alt="Remove Icon"
            width={25}
            height={25}
            className="w-auto h-auto"
          />
          Remove Card
        </Button>
      </div>
    </div>
  );
};

export default PaymentCard;