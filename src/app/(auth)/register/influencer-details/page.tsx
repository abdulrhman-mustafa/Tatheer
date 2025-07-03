// src/app/(auth)/register/influencer-details/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';

import Back from '@/_Components/auth/Back';
import Input from '@/_Components/ui/Input';
import Button from '@/_Components/ui/Button';
import DropDown from '@/_Components/ui/DropDown';
import Checkbox from '@/_Components/ui/Checkbox';
import { twMerge } from 'tailwind-merge';
import { useInfluencerDetailsForm } from '@/hooks/useInfluencerDetailsForm';
import { GENDER_OPTIONS, AGE_OPTIONS } from '@/constants/influencerData';

export default function InfluencerDetailsPage() {
  const {
    formData,
    showMoreDetails,
    errors,
    loading,
    handleSubmit,
    handleInputChange,
    handleInterestToggle,
    handleGenderChange,
    handleAgeChange,
    toggleMoreDetails,
    handlePlatformToggle,
    availableInterests,
    socialMediaPlatforms,
  } = useInfluencerDetailsForm();

  // دلوقتي بنوصل للبيانات من خلال formData
  const {
    selectedInterests,
    gender,
    age,
    beneficiaryName,
    bankName,
    ibanNumber,
    selectedPlatforms,
  } = formData;

  return (
    <div className="flex flex-col items-center p-4 text-secondary">
      <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4">
        <Back />
        <h1 className="text-xl font-medium text-center flex-grow md:text-primary">
          Sign in as Influencers
        </h1>
      </div>

      <div className="flex flex-col w-full max-w-md pb-8">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label className="text-base font-medium block mb-3">Select interests :</label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => (
                <Button
                  key={interest}
                  type="button"
                  size="small"
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

          <DropDown
            id="gender"
            label="Gender*"
            name="gender"
            value={gender}
            onChange={(e) => handleGenderChange(e.target.value)}
            options={GENDER_OPTIONS}
            placeholder="Male"
            error={errors.gender}
          />

          <DropDown
            id="age"
            label="Age*"
            name="age"
            value={age}
            onChange={(e) => handleAgeChange(e.target.value)}
            options={AGE_OPTIONS}
            placeholder="20 Y"
            error={errors.age}
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
                id="beneficiaryName"
                name="beneficiaryName"
                type="text"
                label="Beneficiary Name"
                placeholder="Beneficiary Name"
                value={beneficiaryName}
                onChange={handleInputChange} // استخدام handleInputChange العامة
                error={errors.beneficiaryName}
              />

              <Input
                id="bankName"
                name="bankName"
                type="text"
                label="Bank Name"
                placeholder="Bank Name"
                value={bankName}
                onChange={handleInputChange} // استخدام handleInputChange العامة
                error={errors.bankName}
              />

              <Input
                id="ibanNumber"
                name="ibanNumber"
                type="text"
                label="IBAN Number"
                placeholder="IBAN Number"
                value={ibanNumber}
                onChange={handleInputChange} // استخدام handleInputChange العامة
                error={errors.ibanNumber}
              />

              {/* منصات النشر */}
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

          <Button
            type="submit"
            variant="primary"
            className="w-full rounded-sm py-3 mt-8"
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