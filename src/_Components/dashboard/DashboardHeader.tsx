// src/_Components/dashboard/DashboardHeader.tsx

import React from "react";
import Image from "next/image";

interface DashboardHeaderProps {
    userName: string;
    userAvatarUrl: string;
    notificationsCount: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    userName,
    userAvatarUrl,
    notificationsCount,
}) => {
return (
    <>
    <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
        <Image
            src={userAvatarUrl}
            alt="User Avatar"
            width={40}
            height={40}
            className="object-cover"
            onError={(e) => {
            (e.target as HTMLImageElement).src =
                `/avatar.svg`;
            }}
        />
        <div>
            <p className="text-base font-medium text-primary">Hi {userName},</p>
            <p className="text-sm text-place">Tatheer App</p>
        </div>
        </div>
        <button className="relative">
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
    </>
);
};

export default DashboardHeader;
