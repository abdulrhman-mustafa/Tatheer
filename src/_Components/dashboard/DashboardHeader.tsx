import React from "react";
import Image from "next/image";
import NotificationButton from "./NotificationButton";

interface DashboardHeaderProps {
    userName: string;
    userAvatarUrl: string;
    // notificationsCount: number; // <<-- لم نعد نحتاج هذه الـ prop هنا
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    userName,
    userAvatarUrl,
    // notificationsCount, // <<-- وحذفها من الـ destructuring
}) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 ">
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
                    <div className="w-48">
                        <p className="text-base font-medium text-primary">Hi {userName},</p>
                        <p className="text-sm text-place">Tatheer App</p>
                    </div>
                </div>
                <NotificationButton className="md:hidden flex" />
            </div>
        </>
    );
};

export default DashboardHeader;