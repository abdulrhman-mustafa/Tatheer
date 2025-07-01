"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

import Back from "@/_Components/auth/Back";
import Input from "@/_Components/ui/Input";
import Button from "@/_Components/ui/Button";
import ContactInputField from "@/_Components/auth/ContactInputField";
import Image from "next/image";

import { mockUsers, User } from "@/data/mockData";

export default function EditProfilePage() {
  const router = useRouter();

  const currentUserId = "user-3";
  const currentUser = mockUsers.find((user) => user.id === currentUserId) as User | undefined;

  const [name, setName] = useState(currentUser?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | undefined>(true);
  const [isPhoneNumberInput, setIsPhoneNumberInput] = useState<boolean>(true);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setPhoneNumber(currentUser.phoneNumber || "");
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handlePhoneInputValidate = (isValid: boolean | undefined, fullNumber: string) => {
    setIsPhoneValid(isValid);
    setErrorMessage(isValid ? "" : "Please enter a valid phone number.");
    setPhoneNumber(fullNumber);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (isPhoneNumberInput) {
      if (!phoneNumber.trim() || !isPhoneValid) {
        setErrorMessage("Please enter a valid phone number.");
        setLoading(false);
        return;
      }
    } else {
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMessage("Please enter a valid email address.");
        setLoading(false);
        return;
      }
    }

    if (currentUser) {
      const userIndex = mockUsers.findIndex((user) => user.id === currentUserId);
      if (userIndex !== -1) {
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          name,
          phoneNumber,
          email,
        };
        console.log("Profile updated (mock):", mockUsers[userIndex]);
      }
    }

    setTimeout(() => {
      setLoading(false);
      alert("Profile updated successfully (mock)!");
      router.back();
    }, 1500);
  };

  return (
    <div className="p-4 text-secondary md:bg-gray-50 md:rounded-sm">
      <div className="w-full max-w-md flex md:hidden justify-between items-center mb-8 mt-4">
        <Back />
        <h1 className="text-xl font-medium text-center flex-grow">Edit Profile</h1>
      </div>

      <div className="hidden md:flex items-center justify-between pb-5">
        <h1 className="text-xl font-semibold">Personal Information</h1>
        <Button
          type="button"
          variant="outline"
          size="small"
          onClick={() => {
            setIsPhoneNumberInput(!isPhoneNumberInput);
            setErrorMessage("");
            setPhoneNumber("");
          }}
        >
          Edit
          <Image
            src="/edit.svg"
            alt="Edit"
            width={16}
            height={16}
          />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="max-md:space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10">
        <Input
          id="name"
          label="Name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errorMessage && !name.trim() ? "Name is required" : undefined}
        />

        <ContactInputField
          contactInfoValue={phoneNumber}
          setContactInfoValue={setPhoneNumber}
          isPhoneNumberInput={isPhoneNumberInput}
          setIsPhoneNumberInput={setIsPhoneNumberInput}
          setErrorMessage={setErrorMessage}
          handlePhoneInputValidate={handlePhoneInputValidate}
          errorMessage={errorMessage}
          onInputChange={(e) => setEmail(e.target.value)}
        />

        <Input
          id="email"
          placeholder="Email Address"
          label="Emali Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          variant="primary"
          size="medium"
          className="w-full md:hidden"
          disabled={loading}
          loading={loading}
        >
          {loading ? "Saving" : "Continue"}
        </Button>
      </form>
    </div>
  );
}