// src/components/auth/WelcomeHeader.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WelcomeHeader: React.FC = () => {
  return (
    <div className="welcome flex flex-col items-center justify-center space-y-4">
      <Link href="/">
        <Image 
        src="/icons/logo.svg" alt="Your App Logo" width={80} height={80} 
        />
      </Link>
      <h2 className="text-2xl font-bold text-secondary">Welcome To Tatheer!</h2>
    </div>
  );
};

export default WelcomeHeader;
