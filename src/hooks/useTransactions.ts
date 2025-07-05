// src/hooks/useWalletTransactions.ts

import { useState, FormEvent } from 'react';
import { mockTransactions } from '@/data/mockData';
import { TransactionData } from '@/types/index';

export const useTransactions = (isAdvertiser: boolean) => {
    const [currentBalance, setCurrentBalance] = useState(12255.0);
    const [showModal, setShowModal] = useState(false);
    const [modalAmount, setModalAmount] = useState("");
    const [modalError, setModalError] = useState("");
    const [loadingAction, setLoadingAction] = useState(false);

    // فلترة المعاملات بناءً على الدور
    const withdrawalRequests = isAdvertiser
        ? []
        : mockTransactions.filter((t: TransactionData) => t.type === "withdrawal" && t.status === "pending");

    const regularTransactions = mockTransactions.filter(
        (t: TransactionData) => !(t.type === "withdrawal" && t.status === "pending")
    );

    const handleOpenModal = () => {
        setShowModal(true);
        setModalAmount("");
        setModalError("");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalAmount("");
        setModalError(""); 
    };

    const handleConfirmAction = (e: FormEvent) => {
        e.preventDefault();
        setLoadingAction(true);
        setModalError("");

        const amount = parseFloat(modalAmount);

        if (isNaN(amount) || amount <= 0) {
            setModalError("Please enter a valid amount.");
            setLoadingAction(false);
            return;
        }

        if (isAdvertiser) {
            setTimeout(() => {
                setCurrentBalance((prevBalance) => prevBalance + amount);
                mockTransactions.push({
                    id: `trans-${Date.now()}`,
                    userId: "user-advertiser",
                    amount: amount,
                    type: "deposit",
                    date: new Date().toLocaleDateString("en-GB"),
                    status: "completed",
                    description: "Funds added to wallet",
                });
                setLoadingAction(false);
                setShowModal(false);
                alert(`Successfully added $${amount} to your wallet (mock).`);
            }, 1500);
        } else {
            if (amount > currentBalance) {
                setModalError("Insufficient balance.");
                setLoadingAction(false);
                return;
            }

            setTimeout(() => {
                setCurrentBalance((prevBalance) => prevBalance - amount);
                mockTransactions.push({
                    id: `trans-${Date.now()}`,
                    userId: "user-influencer",
                    amount: amount,
                    type: "withdrawal",
                    date: new Date().toLocaleDateString("en-GB"),
                    status: "completed",
                    description: "Withdrawal from wallet",
                });
                setLoadingAction(false);
                setShowModal(false);
                alert(`Successfully withdrew $${amount} (mock).`);
            }, 1500);
        }
    };

    return {
        currentBalance,
        withdrawalRequests,
        regularTransactions,
        showModal,
        modalAmount,
        modalError,
        loadingAction,
        handleOpenModal,
        handleCloseModal,
        handleConfirmAction,
        setModalAmount,
        setModalError,
        setCurrentBalance 
    };
};
