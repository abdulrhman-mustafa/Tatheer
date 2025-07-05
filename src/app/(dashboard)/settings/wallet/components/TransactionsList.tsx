// src/app/(dashboard)/wallet/components/TransactionsList.tsx

import React from 'react';
import Button from '@/_Components/ui/Button';
import TransactionItem from '@/_Components/dashboard/TransactionItem';
import { TransactionData } from '@/types/index';

interface TransactionsListProps {
    title: string;
    transactions: TransactionData[];
    showSeeMore?: boolean;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
    title,
    transactions,
    showSeeMore = false
}) => {
    return (
        <div className="mt-6 lg:w-1/2">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-normal text-secondary">{title}</h2>
                {showSeeMore && (
                    <Button variant="link" className="text-sm">
                        See more
                    </Button>
                )}
            </div>
            <div className="space-y-3">
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <TransactionItem
                            key={transaction.id}
                            description={transaction.description || "Transaction details"}
                            amount={transaction.amount}
                            date={new Date(transaction.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                            })}
                            type={
                                transaction.type === "deposit" ||
                                transaction.type === "campaign_earning"
                                    ? "credit"
                                    : "debit"
                            }
                            iconSrc="/send.svg"
                        />
                    ))
                ) : (
                    <p className="text-place text-sm text-center">
                        No {title.toLowerCase()}.
                    </p>
                )}
            </div>
        </div>
    );
};

export default TransactionsList;