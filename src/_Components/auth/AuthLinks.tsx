// src/components/auth/AuthLinks.tsx

import React from 'react';
import Link from 'next/link';

const AuthLinks: React.FC = () => {
return (
    <div className="text-center mt-4">
        <Link href="/auth/forgot-password" className="text-primary hover:underline text-sm block mb-2">
            Forgot Password?
        </Link>
        <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
            <Link href="/auth/register/select-type" className="text-primary hover:underline">
                Sign Up
            </Link>
        </p>
    </div>
);
};

export default AuthLinks;
