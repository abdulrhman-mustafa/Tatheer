// src/app/(dashboard)/wallet/components/WalletBalanceCard.tsx

import React from 'react';
import Button from '@/_Components/ui/Button';

interface WalletBalanceCardProps {
    currentBalance: number;
    isAdvertiser: boolean;
    onOpenModal: () => void;
}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
    currentBalance,
    isAdvertiser,
    onOpenModal
}) => {
    return (
        <div className="bg-primary rounded-sm p-4 flex items-center justify-between text-white">
            <div>
                <p className="text-sm font-light">Current Balance</p>
                <p className="text-3xl">
                    ${currentBalance.toLocaleString()}
                </p>
            </div>

            <Button
                onClick={onOpenModal}
                variant="ghost"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {isAdvertiser ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                    )}
                </svg>
                <span>{isAdvertiser ? "Top Up" : "Withdraw"}</span>
            </Button>
        </div>
    );
};

export default WalletBalanceCard;