// src/app/(dashboard)/influencer/opportunities/[campaignId]/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Back from '@/_Components/auth/Back';
import { BeatLoader } from 'react-spinners';
import PlatformChecklist from '@/_Components/ui/PlatformChecklist';
import Button from '@/_Components/ui/Button';
import Modal from '@/_Components/ui/Modal';
import CampaignInfo from '@/_Components/ui/CampaignInfo';
import { mockCampaigns, mockUsers } from '@/data/mockData';
import { Campaign } from '@/types/campaign';
import { AdvertiserProfile } from '@/types/user';

export default function CampaignDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.campaignId as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [advertiser, setAdvertiser] = useState<AdvertiserProfile | null>(null); 
  const [sharedPlatforms, setSharedPlatforms] = useState<Record<string, boolean>>({
    youtube: false,
    instagram: false,
    x: false,
    facebook: false,
    snapchat: false,
    linkedin: false,
  });
  const [uploadedProofs, setUploadedProofs] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 

  useEffect(() => {
    const foundCampaign = mockCampaigns.find(c => c.id === campaignId);
    setCampaign(foundCampaign || null);

    if (foundCampaign) {
      const foundAdvertiser = mockUsers.find(
        u => u.id === foundCampaign.advertiserId && u.role === 'advertiser'
      ) as AdvertiserProfile | undefined;
      setAdvertiser(foundAdvertiser || null); 
    }
  }, [campaignId]);

  useEffect(() => {
    return () => {
      uploadedProofs.forEach(url => URL.revokeObjectURL(url));
    };
  }, [uploadedProofs]);


  const showToastMessage = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  const handleCopyLink = useCallback(() => {
    const linkElement = document.getElementById('unique-share-link') as HTMLInputElement;
    if (linkElement && campaign?.shareLink) {

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(campaign.shareLink)
          .then(() => showToastMessage('Link copied to clipboard!'))
          .catch(() => {
            linkElement.select();
            document.execCommand('copy');
            showToastMessage('Link copied to clipboard!');
          });
      } else {
        linkElement.select();
        document.execCommand('copy');
        showToastMessage('Link copied to clipboard!');
      }
    }
  }, [campaign?.shareLink, showToastMessage]);

  const handlePlatformChange = useCallback((platform: string) => {
    setSharedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  }, []);

  const handleProofUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files).map(file => URL.createObjectURL(file));
      setUploadedProofs(prev => [...prev, ...newFiles]);
    }
  }, []);

  const removeProofImage = useCallback((index: number) => {
    setUploadedProofs(prev => {
      const newProofs = prev.filter((_, i) => i !== index);
      // Revoke the URL of the removed image
      if (prev[index]) {
        URL.revokeObjectURL(prev[index]);
      }
      return newProofs;
    });
  }, []);

  const handleSubmitParticipation = useCallback(() => {
    console.log('Participation submitted:', {
      campaignId: campaign?.id,
      sharedPlatforms,
      uploadedProofs,
    });
    // في المسنقبل البيانات اللي هنا هتتبعت backend
    setShowSuccessModal(true);
  }, [campaign?.id, sharedPlatforms, uploadedProofs]);

  const handleGoToPerformance = useCallback(() => {
    setShowSuccessModal(false);
    router.push('/influencer/opportunities');
  }, [router]);

  const handleModalBack = useCallback(() => {
    setShowSuccessModal(false);
    router.back();
  }, [router]);

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <BeatLoader color="#5500ff" size={20} />
      </div>
    );
  }

  return (
    <div className="flex flex-col text-secondary pb-5 md:pb-0">
      <div className="flex p-8 md:hidden">
        <Back />
        <h1 className="text-lg font-medium text-center flex-grow">{campaign.title}</h1>
        <button
          onClick={() => showToastMessage('Share button clicked (mock)')} 
        >
          <Image
            src="/icons/share.svg"
            alt="Share Icon"
            width={24}
            height={24}
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = `/icons/share.svg`; }}
          />
        </button>
      </div>

      <main className="flex-1 md:p-4 md:flex md:justify-between">
        <div className="p-4 md:bg-input rounded-sm md:w-1/2">
          <div className="rounded-sm mb-4 ">
            <Image
              src={campaign.imageUrl || 'makeup.svg'}
              alt={campaign.title}
              width={800}
              height={300}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = `/icons/makeup.svg`; }}
            />
          </div>

          {/* Campaign Info */}
          <CampaignInfo campaign={campaign} advertiser={advertiser} /> 

          <div className="mb-6">
            <h3 className="text-base font-medium mb-3">
              Shere the ad with your unique link to earn from
              aech quality click
            </h3>
            <div className="flex items-center bg-gray-200 rounded-sm p-2">
              <span className="text-secondary mr-2">
                <Image
                  src="/icons/globel.svg"
                  alt="Globe Icon"
                  width={24}
                  height={24}
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = `/icons/globel.svg`; }}
                />
              </span>
              <input
                type="text"
                id="unique-share-link"
                value={campaign.shareLink || 'https://bit.ly/fake-link'}
                readOnly
                className="flex-grow bg-transparent border-none focus:outline-none text-secondary font-medium truncate"
              />
              <button
                onClick={handleCopyLink}
                className="ml-2 p-2"
              >
                <Image
                  src="/icons/copy.svg"
                  alt="Copy Icon"
                  width={24}
                  height={24}
                  className="object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = `/icons/copy.svg`; }}
                />
              </button>
            </div>
          </div>

          <PlatformChecklist
            sharedPlatforms={sharedPlatforms}
            onChange={handlePlatformChange}
          />
        </div>

        {/* Upload Proof Section */}
        <div className="md:bg-input space-y-4 h-full rounded-sm p-4">
          <h3 className="text-base font-semibold mb-4">Please upload proof of sharing the add</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Upload Button */}
            <label htmlFor="proof-upload" className="flex flex-col items-center justify-center w-full h-24 rounded-sm cursor-pointer bg-gray-200">
              <input
                id="proof-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleProofUpload}
                className="hidden"
              />
              <Image
                src="/icons/upload.svg"
                alt="Upload Icon"
                width={24}
                height={24}
                className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = `/icons/upload.svg`; }}
              />
              <span className="text-sm text-secondary">Upload</span>
            </label>
            {uploadedProofs.map((src, index) => (
              <div key={index} className="relative w-full h-24 rounded-sm overflow-hidden">
                <Image src={src} alt={`Proof ${index + 1}`} layout="fill" objectFit="cover" />
                <button
                  onClick={() => removeProofImage(index)}
                  className="absolute top-1 right-1 text-red-500 text-base font-bold"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <Button
            onClick={handleSubmitParticipation}
            className="md:flex hidden w-full"
          >
            Upload Proof of Sharing
          </Button>
          <Button
            onClick={handleSubmitParticipation}
            className="md:hidden w-full"
            size='medium'
          >
            Submit Your Participation
          </Button>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <Modal
          iconSrc="/icons/success.svg"
          isOpen={showSuccessModal}
          onClose={handleModalBack}
          title="Thank You for Your Contribution"
          describtion="Check your earnings on the Performance page"
          className="text-center md:w-1/2"
        >
          <div className="flex flex-col space-y-4 px-4 py-2">
            <Button
              onClick={handleGoToPerformance}
            >
              Go to the Performance page
            </Button>
            <Button
              onClick={handleModalBack}
              variant='ghost'
              className='text-secondary'
            >
              Back
            </Button>
          </div>
        </Modal>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
