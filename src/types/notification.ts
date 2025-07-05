// src/types/notification.ts

export interface theNotifications {
    id: string;
    userId: string;
    type: string;
    message: string;
    isRead: boolean; 
    timestamp: string;
    link?: string;
}