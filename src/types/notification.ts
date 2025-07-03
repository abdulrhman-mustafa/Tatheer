// src/types/notification.ts

export type NotificationType = 'new_campaign' | 'application_status' | 'payment_received' | 'message';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    message: string;
    isRead: boolean;
    timestamp: string;
    link?: string;
}