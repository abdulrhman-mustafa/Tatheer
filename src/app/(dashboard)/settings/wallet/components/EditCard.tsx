// src/app/(dashboard)/wallet/components/EditCardModal.tsx

import React, { FormEvent } from 'react';
import Modal from '@/_Components/ui/Modal';
import Input from '@/_Components/ui/Input';
import Button from '@/_Components/ui/Button';
import { CardData } from '@/types/index';

interface EditCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingCardId: string | null; 
    editFormData: Partial<CardData>;
    setEditFormData: React.Dispatch<React.SetStateAction<Partial<CardData>>>; 
    onSave: () => boolean; 
}

const EditCardModal: React.FC<EditCardModalProps> = ({
    isOpen,
    onClose,
    editFormData,
    setEditFormData,
    onSave,
}) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const saved = onSave();
        if (saved) {
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose} 
            title="Edit Payment Card"
            describtion="Update the details of your payment card."
            className="md:w-1/2 w-full"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    id="holderName"
                    label="Card Holder Name"
                    type="text"
                    placeholder="e.g., Abdulrahman Mustafa"
                    value={editFormData.holderName || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, holderName: e.target.value })}
                />
                <Input
                    id="cardBank"
                    label="Card Bank"
                    type="text"
                    placeholder="e.g., Visa"
                    value={editFormData.cardBank || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, cardBank: e.target.value })}
                />
                <Input
                    id="cardNumber"
                    label="Card Number"
                    type="text"
                    placeholder="e.g., 1234567890123456"
                    value={editFormData.cardNumber || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, cardNumber: e.target.value })}
                    maxLength={16}
                />

                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    className="w-full"
                >
                    Save Changes
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="w-full"
                >
                    Cancel
                </Button>
            </form>
        </Modal>
    );
};

export default EditCardModal;