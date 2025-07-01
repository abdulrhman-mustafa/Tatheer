
import React from 'react';
import Back from '@/_Components/auth/Back';

export default function PrivacyPolicyPage() {

return (
    <div className="p-4 text-secondary md:bg-gray-50 rounded-sm">
        <div className="w-full max-w-md flex justify-between items-center mb-8 mt-4 md:hidden">
            <Back />
            <h1 className="text-xl font-medium text-center flex-grow">Privacy Policy</h1>
        </div>


        <h1 className="text-xl font-bold text-secondary mb-4 hidden md:block">Privacy Policy</h1>


        <div className="flex-1 md:w-1/2">
            <div className=" text-secondary leading-relaxed">
                <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    </div>
);
}
