// src/hooks/usePaymentCardsManagement.ts
import { useState } from 'react';
import { CardData } from '@/types/index';

export const usePayment = () => {
    const [paymentCards, setPaymentCards] = useState<CardData[]>([
        {
            id: 'card-1',
            holderName: "abdulrahman mustafa",
            cardBank: "Visa",
            cardNumber: "1234567890123456",
            cardType: "visa",
        },
    ]);

    
    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [showEditCardModal, setShowEditCardModal] = useState(false);
    const [editFormData, setEditFormData] = useState<Partial<CardData>>({});

    // open edit modal
    const handleEditCard = (cardId: string) => {
        const cardToEdit = paymentCards.find(card => card.id === cardId);
        if (cardToEdit) {
            setEditingCardId(cardId);
            setEditFormData({ ...cardToEdit });
            setShowEditCardModal(true);
        }
    };

    // save edited card
    const handleSaveCardEdit = () => {
        if (!editingCardId || !editFormData.holderName || !editFormData.cardNumber || !editFormData.cardBank) {
            alert("Please fill all required fields for the card.");
            return false;
        }

        setPaymentCards(prevCards =>
            prevCards.map(card =>
                card.id === editingCardId
                    ? { ...card, ...editFormData, cardType: editFormData.cardType || card.cardType }
                    : card
            )
        );

        // هنا هنبعت طلب للباك اند بتحديث البيانات

        setShowEditCardModal(false);
        setEditingCardId(null);
        setEditFormData({});
        alert("Card updated successfully .");
        return true; 
    };

    // remove card
    const handleRemoveCard = (cardId: string) => {
        const confirmDelete = confirm("Are you sure you want to remove this card?");
        if (confirmDelete) {
            setPaymentCards(prevCards => prevCards.filter(card => card.id !== cardId));
            // هنا هنبعت طلب لل backend لحذف البيانات
            alert("Card removed successfully (mock).");
        }
    };

    return {
        paymentCards,
        editingCardId,
        showEditCardModal,
        editFormData,
        handleEditCard,
        handleSaveCardEdit,
        handleRemoveCard,
        setShowEditCardModal,
        setEditFormData, 
    };
};