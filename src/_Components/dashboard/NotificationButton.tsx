// src/_Components/dashboard/NotificationButton.tsx

'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import NotificationsModal from './NotificationsModal';
import { mockNotifications } from '@/data/mockData';

interface NotificationButtonProps {
    className?: string; 
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ className }) => {
    const [showNotificationsModal, setShowNotificationsModal] = useState(false);

    const unreadNotifications = useMemo(() => {

        return mockNotifications.filter(notif => !notif.isRead).length;
    }, [mockNotifications]);

    const handleOpenNotificationsModal = () => {
        setShowNotificationsModal(true);
    };

    const handleCloseNotificationsModal = () => {
        setShowNotificationsModal(false);
    };

    return (
        <>
            <button
                className={`relative flex flex-shrink-0 ${className || ''}`}
                onClick={handleOpenNotificationsModal}
            >
                <Image
                    src="/notification.svg"
                    alt="Notification Icon"
                    width={60} height={60}
                    className="object-cover"
                />
                {unreadNotifications > 0 && (
                    <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 text-xs font-bold leading-none bg-red-600 text-white rounded-full">
                        {unreadNotifications}
                    </span>
                )}
            </button>

            <NotificationsModal
                isOpen={showNotificationsModal}
                onClose={handleCloseNotificationsModal}
                notifications={mockNotifications}
            />
        </>
    );
};

export default NotificationButton;