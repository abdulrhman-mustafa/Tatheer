// src/_Components/dashboard/SearchBar.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Input from '@/_Components/ui/Input';

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string; 
    notificationsCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = "Search",
    className,
    notificationsCount,
}) => {
return (
    <div className={`p-4 ${className} flex items-center justify-between`}>
        <div className="relative w-full">
        <Input
            id='search'
            className="pl-10"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        <Image 
            src="/search.svg"
            alt="Search Icon"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
        />
        </div>
        <button className="relative hidden md:flex">
            <Image 
                src="/notification.svg" 
                alt="Notification Icon" 
                width={60} height={60} 
                className="object-cover"
            />
            {notificationsCount > 0 && (
                <span className="absolute top-2 right-2 items-center justify-center px-2 py-1 text-xs font-bold leading-none bg-red-600 text-white rounded-full">
                    {notificationsCount}
                </span>
            )}
        </button>
    </div>
);
};

export default SearchBar;
