// src/app/(auth)/register/influencer-details/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';

import Back from '@/_Components/auth/Back';
import Input from '@/_Components/ui/Input';
import Button from '@/_Components/ui/Button';
import DropDown from '@/_Components/ui/DropDown';
import Checkbox from '@/_Components/ui/Checkbox';

import { useInfluencerDetailsForm } from '@/hooks/useInfluencerDetailsForm'; // استيراد الخطاف الجديد

export default function InfluencerDetailsPage() {
  const {
    selectedInterests,
    gender,
    age,
    beneficiaryName,
    bankName,
    ibanNumber,
    selectedPlatforms,
    showMoreDetails,
    errors, // استخدام كائن الأخطاء
    loading,
    availableInterests,
    socialMediaPlatforms,

    handleInterestToggle,
    handleGenderChange,
    handleAgeChange,
    handleBeneficiaryNameChange,
    handleBankNameChange,
    handleIbanNumberChange,
    handlePlatformToggle,
    toggleMoreDetails,
    handleSubmit,
  } = useInfluencerDetailsForm();

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  // إنشاء خيارات العمر هنا أو جلبها من الخطاف مباشرة
  const ageOptions = Array.from({ length: 70 }, (_, i) => i + 18).map(year => ({
    value: `${year} Y`,
    label: `${year} Y`
  }));

  return (
    <div className="flex flex-col items-center p-4 text-secondary">
      {/* Back Button and Title */}
      <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4">
        <Back />
        <h1 className="text-xl font-medium text-center flex-grow md:text-primary">Sign in as Influencers</h1>
      </div>

      <div className="flex flex-col w-full max-w-md pb-8">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Select Interests Section */}
          <div>
            <label className="text-base font-medium block mb-3">Select interests :</label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => (
                <Button
                  key={interest}
                  type="button"
                  size='small'
                  variant={selectedInterests.includes(interest) ? 'primary' : 'outline'}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </Button>
              ))}
            </div>
            {errors.selectedInterests && (
              <p className="text-red-500 text-xs italic mt-2">{errors.selectedInterests}</p>
            )}
          </div>

          {/* Gender Dropdown*/}
          <DropDown
            id="gender"
            label="Gender*"
            name="gender"
            value={gender}
            onChange={handleGenderChange}
            options={genderOptions}
            placeholder="Male"
            error={errors.gender}
          />

          {/* Age Dropdown */}
          <DropDown
            id="age"
            label="Age*"
            name="age"
            value={age}
            onChange={handleAgeChange}
            options={ageOptions}
            placeholder="20 Y"
            error={errors.age} 
          />

          {/* Do you have time to enter more details Section (Collapsible) */}
          {!showMoreDetails && (
            <div className="mt-6">
              <button
                type="button"
                onClick={toggleMoreDetails}
                className="w-full flex justify-between items-center text-place font-normal py-2"
              >
                Do you have time to enter more details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform duration-300 ${showMoreDetails ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          {showMoreDetails && (
            <div className="space-y-6 mt-4 transition-all duration-300 ease-in-out">
              {/* Beneficiary Name Input */}
              <div>
                <label htmlFor="beneficiaryName" className="text-base font-normal block mb-3">Beneficiary Name</label>
                <Input
                  id="beneficiaryName"
                  name="beneficiaryName"
                  type="text"
                  placeholder="Beneficiary Name"
                  value={beneficiaryName}
                  onChange={handleBeneficiaryNameChange}
                  error={errors.beneficiaryName}
                />
              </div>

              {/* Bank Name Input */}
              <div>
                <label htmlFor="bankName" className="text-base font-normal block mb-3">Bank Name</label>
                <Input
                  id="bankName"
                  name="bankName"
                  type="text"
                  placeholder="Bank Name"
                  value={bankName}
                  onChange={handleBankNameChange}
                  error={errors.bankName}
                />
              </div>

              {/* IBAN Number Input */}
              <div>
                <label htmlFor="ibanNumber" className="text-base font-normal block mb-3">IBAN Number</label>
                <Input
                  id="ibanNumber"
                  name="ibanNumber"
                  type="text"
                  placeholder="IBAN Number"
                  value={ibanNumber}
                  onChange={handleIbanNumberChange}
                  error={errors.ibanNumber}
                />
              </div>

              {/* Which Of These Do You Use To Post Ads ? Section */}
              <div>
                <label className="text-base font-medium block mb-3">
                  Which Of These Do You Use To Post Ads?
                </label>
                <div className="space-y-3">
                  {socialMediaPlatforms.map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between">
                      <Checkbox
                        id={platform.name}
                        label={platform.name}
                        name="platform"
                        checked={selectedPlatforms.includes(platform.name)}
                        onChange={() => handlePlatformToggle(platform.name)}
                      />
                      {platform.icon && (
                        <Image
                          src={platform.icon}
                          alt={`${platform.name} Icon`}
                          width={24}
                          height={24}
                          className="ml-2"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://placehold.co/24x24/E2E8F0/A0AEC0?text=${platform.name.charAt(0)}`;
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                {errors.selectedPlatforms && (
                  <p className="text-red-500 text-xs italic mt-2">{errors.selectedPlatforms}</p>
                )}
              </div>
            </div>
          )}

          {errors.general && (
            <p className="text-red-500 text-xs italic mt-2 text-center">
              {errors.general}
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
            {loading ? 'Processing' : 'Continue'}
          </Button>
        </form>
      </div>
    </div>
  );
}
