// src/app/(dashboard)/wallet/components/TopUpWithdrawModal.tsx

import React, { FormEvent } from 'react';
import Modal from '@/_Components/ui/Modal';
import Input from '@/_Components/ui/Input';
import Button from '@/_Components/ui/Button'; 

interface TopUpWithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
    isAdvertiser: boolean;
    modalAmount: string;
    setModalAmount: (amount: string) => void;
    modalError: string;
    setModalError: (error: string) => void;
    loadingAction: boolean;
    onConfirmAction: (e: FormEvent) => void;
}

const TopUpWithdrawModal: React.FC<TopUpWithdrawModalProps> = ({
    isOpen,
    onClose,
    isAdvertiser,
    modalAmount,
    setModalAmount,
    modalError,
    setModalError,
    loadingAction,
    onConfirmAction,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isAdvertiser ? "Top Up Your Wallet" : "Withdraw from Your Wallet"}
            describtion={isAdvertiser ? "Add the amount you want to top up" : "Enter the amount you want to withdraw from your wallet."}
            className="md:w-1/2 w-full text-center"
        >
            <form onSubmit={onConfirmAction} className="space-y-4 ">
                <Input
                    id="amount"
                    label={isAdvertiser ? "Amount to top up" : "Withdraw amount"}
                    type="number"
                    placeholder={isAdvertiser ? "Example: $1000" : "Example: $50"}
                    value={modalAmount}
                    onChange={(e) => { setModalAmount(e.target.value); setModalError(""); }}
                    error={modalError}
                    step="0.01"
                    min="0"
                />
                {modalError && (
                    <p className="text-red-500 text-sm">{modalError}</p>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    className="w-full"
                    disabled={loadingAction}
                    loading={loadingAction}
                >
                    {isAdvertiser ? "Confirm" : "Confirm Withdrawal"}
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

export default TopUpWithdrawModal;