// src/components/auth/WelcomeHeader.tsx

import React from 'react';
import Image from 'next/image';

const WelcomeHeader: React.FC = () => {
  return (
    <div className="welcome flex flex-col items-center justify-center space-y-4">
      <Image src="/logo.svg" alt="Your App Logo" width={80} height={80} />
      <h2 className="text-2xl font-bold text-secondary">Welcome To Tatheer!</h2>
    </div>
  );
};

export default WelcomeHeader;
