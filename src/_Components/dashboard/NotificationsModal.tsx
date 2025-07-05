import React from 'react';
import Modal from '@/_Components/ui/Modal';
import Image from 'next/image';
import { theNotifications } from '@/types/notification'; 

interface NotificationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: theNotifications[];
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
    isOpen,
    onClose,
    notifications,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Notifications"
            describtion={notifications.length > 0 ? "Here are your recent notifications." : "No new notifications at the moment."}
            className="md:w-1/2 w-full text-center"
            iconSrc="/notification.svg"
        >
            <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-start p-3 rounded-sm ${
                                notification.isRead ? 'bg-gray-50 text-gray-600' : 'bg-blue-50 text-blue-800 font-medium'
                            }`}
                        >
                            <Image
                                src={notification.isRead ? "/icons/notification-bell.png" : "/icons/notification-bell-unread.png"}
                                alt="Notification Status"
                                width={20}
                                height={20}
                                className="mr-3 mt-1 flex-shrink-0"
                            />
                            <div>
                                <p className="text-sm">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(notification.timestamp).toLocaleString()}
                                </p>
                                {notification.link && (
                                    <a
                                        href={notification.link}
                                        className="text-primary hover:underline text-xs mt-1 block"
                                        onClick={onClose}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Details
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-place py-4">
                        No notifications at the moment.
                    </p>
                )}
            </div>
            {notifications.length > 0 && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => {
                            // Call API to mark all notifications as read
                            console.log("Mark all as read clicked! (This would trigger an API update)");
                            alert("All notifications marked as read");
                            onClose();
                        }}
                        className="text-primary hover:underline text-sm"
                    >
                        Mark all as read
                    </button>
                </div>
            )}
        </Modal>
    );
};

export default NotificationsModal;