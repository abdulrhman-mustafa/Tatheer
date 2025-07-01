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
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = "Search...",
    className,
}) => {
return (
    <div className={`p-4 ${className}`}>
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
    </div>
);
};

export default SearchBar;
