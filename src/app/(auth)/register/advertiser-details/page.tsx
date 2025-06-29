// src/app/(auth)/register/advertiser-details/page.tsx

"use client";

import React from "react";

import Back from "@/_Components/auth/Back";
import Input from "@/_Components/ui/Input";
import { Button } from "@/_Components/ui/Button";

import Image from "next/image";

import { useAdvertiserDetailsForm } from "@/hooks/useAdvertiserDetailsForm"; // استيراد الخطاف الجديد

export default function AdvertiserDetailsPage() {
  const {
    brandName,
    brandLogo,
    brandDescription,
    showMoreDetails, // تم استيرادها الآن
    companyLegalName,
    companyCR,
    companyVAT,
    companyBillingAddress,
    errorMessage,
    loading,

    setBrandName,
    handleBrandLogoChange,
    setBrandDescription,
    toggleMoreDetails, // تم استيرادها الآن
    setCompanyLegalName,
    setCompanyCR,
    setCompanyVAT,
    setCompanyBillingAddress,
    handleSubmit,
  } = useAdvertiserDetailsForm();

  return (
    <div className="flex flex-col items-center  p-4 text-secondary">
      <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4">
        <Back />
        <h1 className="text-xl font-medium text-center flex-grow">
          Advertisers
        </h1>
      </div>

      <div className="flex flex-col w-full max-w-md px-5 pb-8">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Brand Name Input */}
          <div>
            <label
              htmlFor="brandName"
              className="text-base font-medium block mb-3"
            >
              Brand Name*
            </label>
            <Input
              id="brandName"
              name="brandName"
              type="text"
              placeholder="Brand Name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>

          {/* Brand Logo Input with Icon */}
          <div>
            <label
              htmlFor="brandLogo"
              className="text-base font-medium block mb-3"
            >
              Brand Logo
            </label>
            <div className="flex items-center relative">
              <input
                id="brandLogo"
                name="brandLogo"
                type="file"
                accept="image/*"
                onChange={handleBrandLogoChange}
                className="hidden"
              />
              <input
                type="text"
                readOnly
                placeholder="Brand Logo"
                value={brandLogo ? brandLogo.name : ""}
                className="w-full
                            px-5 py-3
                            rounded-sm
                            bg-input
                            placeholder-place
                            border-0
                            focus:ring-primary/50
                            focus:ring-1
                            outline-none
                            transition-all duration-200"
                onClick={() => document.getElementById("brandLogo")?.click()}
              />
              <label
                htmlFor="brandLogo"
                className="absolute right-4 cursor-pointer"
              >
                <Image
                  src="/uploadfile.svg"
                  alt="Upload Icon"
                  width={50}
                  height={50}
                />
              </label>
            </div>
            {brandLogo && (
              <p className="text-sm text-place mt-1">
                Selected: {brandLogo.name}
              </p>
            )}
          </div>

          {/* Brand Description Textarea */}
          <div>
            <label
              htmlFor="brandDescription"
              className="text-base font-medium block mb-3"
            >
              Brand description*
            </label>
            <textarea
              id="brandDescription"
              name="brandDescription"
              placeholder="Brand description"
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              rows={4}
              className="w-full
                            px-5 py-3
                            rounded-sm
                            bg-input
                            placeholder-place
                            border-0
                            focus:ring-primary/50
                            focus:ring-1
                            outline-none
                            transition-all duration-200 resize-y "
            ></textarea>
          </div>

          {/* Do you have time to enter more details Section (Collapsible) */}
          {!showMoreDetails && (
            <div className="mt-6">
              <button
                type="button"
                onClick={toggleMoreDetails}
                className="w-full flex justify-center items-center text-place text-sm font-normal py-2"
              >
                Do you have time to enter more details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ml-2 transform transition-transform duration-300 ${
                    showMoreDetails ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}

          {showMoreDetails && (
            <div className="space-y-6 mt-4 transition-all duration-300 ease-in-out">
              {/* Company Legal Name */}
              <div>
                <label
                  htmlFor="companyLegalName"
                  className="text-base font-medium block mb-3"
                >
                  Company Legal Name
                </label>
                <Input
                  id="companyLegalName"
                  name="companyLegalName"
                  type="text"
                  placeholder="Company Legal Name"
                  value={companyLegalName}
                  onChange={(e) => setCompanyLegalName(e.target.value)}
                />
              </div>

              {/* Company CR */}
              <div>
                <label
                  htmlFor="companyCR"
                  className="text-base font-medium block mb-3"
                >
                  Company CR
                </label>
                <Input
                  id="companyCR"
                  name="companyCR"
                  type="text"
                  placeholder="Company CR"
                  value={companyCR}
                  onChange={(e) => setCompanyCR(e.target.value)}
                />
              </div>

              {/* Company VAT */}
              <div>
                <label
                  htmlFor="companyVAT"
                  className="text-base font-medium block mb-3"
                >
                  Company VAT
                </label>
                <Input
                  id="companyVAT"
                  name="companyVAT"
                  type="text"
                  placeholder="Company VAT"
                  value={companyVAT}
                  onChange={(e) => setCompanyVAT(e.target.value)}
                />
              </div>

              {/* Company Billing Address, City and Country */}
              <div>
                <label
                  htmlFor="companyBillingAddress"
                  className="text-base font-medium block mb-3"
                >
                  Company Address, City and Country
                </label>
                <Input
                  id="companyBillingAddress"
                  name="companyBillingAddress"
                  type="text"
                  placeholder="Company Billing Address, City and Country"
                  value={companyBillingAddress}
                  onChange={(e) => setCompanyBillingAddress(e.target.value)}
                />
              </div>
            </div>
          )}

          {errorMessage && (
            <p className="text-red-500 text-xs italic mt-2 text-center">
              {errorMessage}
            </p>
          )}

          {/* Continue Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full rounded-lg py-3 mt-8"
            disabled={loading}
            loading={loading}
          >
            {loading ? "Processing" : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
