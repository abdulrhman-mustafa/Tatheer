// src/app/(dashboard)/terms-of-use/page.tsx

'use client';

import React from 'react';
import Back from '@/_Components/auth/Back';

export default function TermsOfUsePage() {
return (
    <div className="p-4 text-secondary"> 

        <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4">
            <Back />
            <h1 className="text-xl font-medium text-center flex-grow md:hidden">Terms of Use</h1>
        </div>

        <div className="flex-1">
            <div className="text-secondary leading-relaxed">
                <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>

    </div>
);
}
