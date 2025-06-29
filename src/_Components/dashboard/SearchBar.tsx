// src/_Components/dashboard/SearchBar.tsx

import React from "react";
import { ChangeEvent } from "react";
import Input from "@/_Components/ui/Input";
import Image from "next/image";

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Search",
    value,
    onChange,
    className,
}) => {
return (
    // هذا شريط البحث سيظهر فقط في الموبايل بناءً على التصميم
    <div
        className={`mt-4 mx-4 rounded-sm ${
        className || ""
    }`}
    >
        <div className="relative">
            <Image
                src="/search.svg"
                alt="Search Icon"
                width={25}  
                height={25}
                className="absolute left-2 top-3"
            />
            <Input
                id="search-input"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-10"
            />
        </div>
    </div>
);
};

export default SearchBar;
