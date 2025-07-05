// src/app/(dashboard)/wallet/components/AdvertiserCardsSection.tsx

import React from 'react';
import PaymentCard from '@/_Components/dashboard/PaymentCard';
import { CardData } from '@/types/index';

interface AdvertiserCardsSectionProps {
    paymentCards: CardData[];
    onEditCard: (cardId: string) => void;
    onRemoveCard: (cardId: string) => void;
}

const AdvertiserCardsSection: React.FC<AdvertiserCardsSectionProps> = ({
    paymentCards,
    onEditCard,
    onRemoveCard
}) => {
    return (
        <div className="mt-6 lg:w-1/2">
            {paymentCards.length > 0 ? (
                paymentCards.map(card => (
                    <PaymentCard
                        key={card.id}
                        holderName={card.holderName}
                        cardBank={card.cardBank}
                        cardNumber={card.cardNumber}
                        cardType={card.cardType}
                        onEdit={() => onEditCard(card.id)}
                        onRemove={() => onRemoveCard(card.id)}
                        className="mb-6 mx-auto"
                    />
                ))
            ) : (
                <p className="text-place text-sm text-center">
                    No payment cards added.
                </p>
                
            )}
        </div>
    );
};

export default AdvertiserCardsSection;