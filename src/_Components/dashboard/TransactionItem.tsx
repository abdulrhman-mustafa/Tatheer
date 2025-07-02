// src/_Components/dashboard/TransactionItem.tsx

import React from 'react';
import Image from 'next/image';

interface TransactionItemProps {
    description: string;
    amount: number;
    date: string;
    type: 'debit' | 'credit';
    iconSrc: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
    description,
    amount,
    date,
    type,
    iconSrc,
}) => {
const amountColorClass = type === 'debit' ? 'text-red-500' : 'text-green-500';
const amountPrefix = type === 'debit' ? '-' : '+'; 

return (
    <div className="flex items-center justify-between bg-input rounded-sm p-2">
        <div className="flex items-center space-x-3">
        <Image
            src={iconSrc || '/send.svg'}
            alt="Transaction Icon"
            width={24}
            height={24}
            className="text-place"
            onError={(e) => { (e.target as HTMLImageElement).src = ''; }}
        />
            <div>
                <p className="text-sm font-medium text-place">{description}</p>
                <p className="text-xs text-place">{date}</p>
            </div>
        </div>
        <div className="text-right">
            <p className={`text-sm font-semibold ${amountColorClass}`}>
                {amountPrefix}${amount.toFixed(2)}
            </p>
        </div>
    </div>
);
};

export default TransactionItem;
