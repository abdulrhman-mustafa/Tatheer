// src/app/(dashboard)/wallet/page.tsx
"use client";

import React from "react";

// استيراد الكومبوننتات الفرعية
import WalletCard from './components/WalletCard';
import AdvertiserCards from './components/AdvertiserCards';
import TransactionsList from './components/TransactionsList';
import TopUpWithdrawModal from './components/TopUpWithdrawModal';
import EditCard from './components/EditCard';
import Back from "@/_Components/auth/Back";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/hooks/useTransactions";
import { usePayment } from "@/hooks/usePayment";

export default function WalletPage() {
    const { userRole } = useAuth();
    const isAdvertiser = userRole === "advertiser";

    const {
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
    } = useTransactions(isAdvertiser);

    const {
        paymentCards,
        editingCardId,
        showEditCardModal,
        editFormData,
        handleEditCard,
        handleSaveCardEdit,
        handleRemoveCard,
        setShowEditCardModal,
        setEditFormData,
    } = usePayment();

    return (
        <div className="p-4 text-secondary md:mb-10 md:bg-gray-50 rounded-sm">
            <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4 md:hidden">
                <Back />
                <h1 className="text-xl font-medium text-center flex-grow">Wallet</h1>
            </div>

            <h1 className="text-xl font-bold text-secondary mb-4 hidden md:block">Wallet</h1>

            {/* كارت الرصيد */}
            <div className="lg:w-1/2">
                <WalletCard
                    currentBalance={currentBalance}
                    isAdvertiser={isAdvertiser}
                    onOpenModal={handleOpenModal}
                />
            </div>

            {/* قسم بطاقات الدفع (للمعلن فقط) */}
            {isAdvertiser && (
                <AdvertiserCards
                    paymentCards={paymentCards}
                    onEditCard={handleEditCard}
                    onRemoveCard={handleRemoveCard}
                />
            )}

            {/* قائمة طلبات السحب (للمؤثر فقط) */}
            {!isAdvertiser && (
                <TransactionsList
                    title="Withdrawal Requests"
                    transactions={withdrawalRequests}
                    showSeeMore={true}
                />
            )}

            {/* قائمة المعاملات العادية */}
            <TransactionsList
                title="Transactions"
                transactions={regularTransactions}
                showSeeMore={true}
            />

            {/* مودال الإيداع/السحب */}
            <TopUpWithdrawModal
                isOpen={showModal}
                onClose={handleCloseModal}
                isAdvertiser={isAdvertiser}
                modalAmount={modalAmount}
                setModalAmount={setModalAmount}
                modalError={modalError}
                setModalError={setModalError}
                loadingAction={loadingAction}
                onConfirmAction={handleConfirmAction}
            />

            {/* مودال تعديل البطاقة */}
            <EditCard
                isOpen={showEditCardModal}
                onClose={() => {
                    setShowEditCardModal(false);
                    setEditFormData({});
                }}
                editingCardId={editingCardId}
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                onSave={handleSaveCardEdit}
            />
        </div>
    );
}