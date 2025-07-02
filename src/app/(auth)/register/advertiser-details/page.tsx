// src/app/(auth)/advertiser/details/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Back from '@/_Components/auth/Back';
import Input from '@/_Components/ui/Input';
import Button from '@/_Components/ui/Button';
import { useAdvertiserDetailsForm } from '@/hooks/useAdvertiserDetailsForm';
import { twMerge } from 'tailwind-merge';

export default function AdvertiserDetailsPage() {
  const {
    brandName,
    brandLogoFile,
    brandDescription,
    showMoreDetails,
    companyLegalName,
    companyCR,
    companyVAT,
    companyBillingAddress,
    loading,
    errorMessage,
    setBrandName,
    handleBrandLogoChange,
    setBrandDescription,
    toggleMoreDetails,
    setCompanyLegalName,
    setCompanyCR,
    setCompanyVAT,
    setCompanyBillingAddress,
    handleSubmit,
    setErrorMessage,
  } = useAdvertiserDetailsForm();

  return (
    <div className="flex flex-col items-center p-4 text-secondary">
      <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4">
        <Back />
        <h1 className="text-xl font-medium text-center flex-grow md:text-primary">
          Sign in as Advertisers
        </h1>
      </div>

      <div className="flex flex-col w-full max-w-md pb-8">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <Input
            id="brandName"
            label="Brand Name*"
            type="text"
            placeholder="Brand Name"
            value={brandName}
            onChange={(e) => {
              setBrandName(e.target.value);
              setErrorMessage('');
            }}
            error={errorMessage.includes('Brand Name') ? errorMessage : undefined}
          />

          <div>
            <div className="relative w-full">
              <Input
                id="brandLogoText"
                type="text"
                label="Brand Logo"
                placeholder="Brand Logo"
                value={brandLogoFile ? brandLogoFile.name : ''}
                readOnly
                className="pr-12"
              />
              <label
                htmlFor="brandLogoUpload"
                className="absolute right-0 top-9 flex items-center px-3 cursor-pointer bg-input rounded-sm hover:bg-gray-100 transition-colors"
              >
                <Image
                  src="/icons/upload.svg"
                  alt="Upload Icon"
                  width={20}
                  height={20}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/icons/upload.svg';
                  }}
                />
                <input
                  id="brandLogoUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleBrandLogoChange}
                  className="hidden"
                />
              </label>
            </div>
            {errorMessage.includes('Brand Logo') && (
              <p className="text-red-500 text-xs italic mt-2">{errorMessage}</p>
            )}
          </div>

          <Input
            id="brandDescription"
            label="Brand description*"
            type="textarea"
            placeholder="Brand description"
            value={brandDescription}
            onChange={(e) => {
              setBrandDescription(e.target.value);
              setErrorMessage('');
            }}
            error={errorMessage.includes('Brand Description') ? errorMessage : undefined}
          />

          <button
            type="button"
            onClick={toggleMoreDetails}
            className="flex items-center w-full justify-center text-place text-sm cursor-pointer hover:text-secondary transition-colors"
          >
            Do you have time to enter more details
            <svg
              className={twMerge(
                'fill-current h-4 w-4 ml-1 transition-transform duration-200',
                showMoreDetails ? 'rotate-180' : 'rotate-0'
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>

          {showMoreDetails && (
            <div className="space-y-6 mt-4 transition-all duration-300 ease-in-out">
              <Input
                id="companyLegalName"
                label="Company Legal Name"
                type="text"
                placeholder="Company Legal Name"
                value={companyLegalName}
                onChange={(e) => setCompanyLegalName(e.target.value)}
                error={errorMessage.includes('Company Legal Name') ? errorMessage : undefined}
              />

              <Input
                id="companyCR"
                label="Company CR"
                type="text"
                placeholder="Company CR"
                value={companyCR}
                onChange={(e) => setCompanyCR(e.target.value)}
                error={errorMessage.includes('Company CR') ? errorMessage : undefined}
              />

              <Input
                id="companyVAT"
                label="Company VAT"
                type="text"
                placeholder="Company VAT"
                value={companyVAT}
                onChange={(e) => setCompanyVAT(e.target.value)}
                error={errorMessage.includes('Company VAT') ? errorMessage : undefined}
              />

              <Input
                id="companyBillingAddress"
                label="Company Billing Address, City and Country"
                type="text"
                placeholder="Company Billing Address, City and Country"
                value={companyBillingAddress}
                onChange={(e) => setCompanyBillingAddress(e.target.value)}
                error={errorMessage.includes('Company Billing Address') ? errorMessage : undefined}
              />
            </div>
          )}

          {errorMessage && (
            <p className="text-red-500 text-xs italic mt-2 text-center">{errorMessage}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full rounded-sm mt-8"
            disabled={loading}
            loading={loading}
          >
            {loading ? 'Save' : 'Continue'}
          </Button>
        </form>
      </div>
    </div>
  );
}