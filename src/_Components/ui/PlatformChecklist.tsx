'use client';

import React from 'react';
import Image from 'next/image';
import Checkbox from '@/_Components/ui/Checkbox';

interface PlatformChecklistProps {
  sharedPlatforms: Record<string, boolean>;
  onChange: (platform: string) => void;
}

const platforms = [
  { id: 'youtube', name: 'Youtube', icon: '/icons/youtube.svg' },
  { id: 'instagram', name: 'Instagram', icon: '/icons/instagram.svg' },
  { id: 'x', name: 'X', icon: '/icons/x.svg' },
  { id: 'facebook', name: 'Facebook', icon: '/icons/facebook.svg' },
  { id: 'snapchat', name: 'Snapchat', icon: '/icons/snapchat.svg' },
  { id: 'linkedin', name: 'LinkedIn', icon: '/icons/linkedin.svg' },
];

const PlatformChecklist: React.FC<PlatformChecklistProps> = ({ sharedPlatforms, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold mb-4">Where have you shared this ad?</h3>
      <div className="space-y-3">
        {platforms.map((platform) => (
          <div key={platform.id} className="flex items-center justify-between">
            <Checkbox
              id={platform.id}
              label={platform.name}
              name="platform"
              checked={sharedPlatforms[platform.id]}
              onChange={() => onChange(platform.id)}
            />
            <Image
              src={platform.icon}
              alt={platform.name}
              width={24}
              height={24}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/24x24/E2E8F0/A0AEC0?text=?';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformChecklist;
