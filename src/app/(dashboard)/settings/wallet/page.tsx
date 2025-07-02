"use client";

import React, { useState, FormEvent } from "react";

import Back from "@/_Components/auth/Back";
import Button from "@/_Components/ui/Button";
import Input from "@/_Components/ui/Input";
import TransactionItem from "@/_Components/dashboard/TransactionItem";
import Modal from "@/_Components/ui/Modal";


import { mockTransactions } from "@/data/mockData"; 

export default function WalletPage() {

    const [currentBalance, setCurrentBalance] = useState(12255.0);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [withdrawError, setWithdrawError] = useState("");
    const [loadingWithdraw, setLoadingWithdraw] = useState(false);

const withdrawalRequests = mockTransactions.filter(
    (t) => t.type === "withdrawal" && t.status === "pending"
);

const regularTransactions = mockTransactions.filter(
    (t) => !(t.type === "withdrawal" && t.status === "pending")
);

const handleOpenWithdrawModal = () => {
    setShowWithdrawModal(true);
    setWithdrawAmount("");
    setWithdrawError("");
};

const handleCloseWithdrawModal = () => {
    setShowWithdrawModal(false);
};

const handleConfirmWithdraw = (e: FormEvent) => {
    e.preventDefault();
    setLoadingWithdraw(true);
    setWithdrawError("");

    const amount = parseFloat(withdrawAmount);

    if (isNaN(amount) || amount <= 0) {
        setWithdrawError("Please enter a valid amount.");
        setLoadingWithdraw(false);
        return;
    }

    if (amount > currentBalance) {
        setWithdrawError("Insufficient balance.");
        setLoadingWithdraw(false);
        return;
    }

    console.log(`Withdrawing $${amount} (mock)...`);

    setTimeout(() => {
        setCurrentBalance((prevBalance) => prevBalance - amount); 
        mockTransactions.push({
        
        id: `trans-${mockTransactions.length + 1}`,
        userId: "user-3",
        amount: amount,
        type: "withdrawal",
        date: new Date().toLocaleDateString("en-GB"),
        status: "completed",
        description: "Withdrawal from wallet",
        });
        setLoadingWithdraw(false);
        setShowWithdrawModal(false);
        alert(`Successfully withdrew $${amount} (mock).`);
    }, 1500);
};

return (
    <div className="p-4 text-secondary md:mb-10 md:bg-gray-50 rounded-sm">

        <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4 md:hidden">
            <Back />
            <h1 className="text-xl font-medium text-center flex-grow">Wallet</h1>
        </div>

        <h1 className="text-xl font-bold text-secondary mb-4 hidden md:block">Wallet</h1>

        <div className="lg:w-1/2">
            <div className="bg-primary rounded-sm p-4 flex items-center justify-between text-white">
                <div>
                    <p className="text-sm font-light">Current Balance</p>
                    <p className="text-3xl">
                        ${currentBalance.toLocaleString()}
                    </p>
                </div>
                <Button
                    onClick={handleOpenWithdrawModal}
                    variant="ghost"
                >
                    <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                    </svg>
                    <span>Withdraw</span>
                </Button>
            </div>
        </div>

      {/* Withdrawal Requests Section */}
        <div className="mt-6 lg:w-1/2">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-normal text-secondary">
                    Withdrawal Requests
                </h2>
                <Button variant="link" className=" text-sm">
                    See more
                </Button>
            </div>
            <div className="space-y-3">
            {withdrawalRequests.length > 0 ? (
                withdrawalRequests.map((transaction) => (
                <TransactionItem
                    key={transaction.id}
                    description={
                    transaction.description || "Transaction in Process"
                    }
                    amount={transaction.amount}
                    date={new Date(transaction.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    })}
                    type="debit"
                    iconSrc="/send.svg"
                />
                ))
            ) : (
                <p className="text-place text-sm text-center">
                    No withdrawal requests.
                </p>
            )}
            </div>
        </div>

      {/* Transactions Section */}
        <div className="mt-6 lg:w-1/2">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-normal text-secondary">Transactions</h2>
                <Button variant="link" className=" text-sm">
                    See more
                </Button>
            </div>
            <div className="space-y-3">
            {regularTransactions.length > 0 ? (
                regularTransactions.map((transaction) => (
                <TransactionItem
                    key={transaction.id}
                    description={transaction.description || "For the Campaign"}
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
                No regular transactions.
                </p>
            )}
            </div>
        </div>

      {/* Your Custom Modal/Popup Component */}
    {showWithdrawModal && (
        <Modal
            isOpen={showWithdrawModal}
            onClose={handleCloseWithdrawModal}
            title="Withdraw from Your Wallet"
            describtion="Enter the amount you want to withdraw from your wallet."
            className="md:w-1/2 w-full"
        >
            <form onSubmit={handleConfirmWithdraw} className="space-y-4 ">
                <Input
                    id="withdraw-amount"
                    label="Withdraw amount"
                    type="number"
                    placeholder="Example: $50"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    error={withdrawError}
                    step="0.01" 
                    min="0"
                />
                {withdrawError && (
                    <p className="text-red-500 text-sm">{withdrawError}</p>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    className="w-full"
                    disabled={loadingWithdraw}
                    loading={loadingWithdraw}
                >
                    Confirm
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCloseWithdrawModal}
                    className="w-full"
                >
                    Cancel
                </Button>
            </form>
        </Modal>
        )}
    </div>
);
}
