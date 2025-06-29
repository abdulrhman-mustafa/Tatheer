import React from 'react';
import Image from 'next/image';

interface ChatMessageProps {
    message: string;
    isUser: boolean;
    avatarSrc?: string;
    showAvatar?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
    message,
    isUser,
    avatarSrc,
    showAvatar = true,
}) => {
return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
        {!isUser && (
            <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[80%]`}>
            {showAvatar ? (
                <Image
                src={avatarSrc || '/chat.svg'}
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full object-cover mr-2 mt-1"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = '';
                }}
                />
            ) : (
                <div className="w-[32px] mr-2" />
            )}

            <div className="flex flex-col">
                <div className="bg-[#F5F5F5] text-gray-900 rounded-2xl px-4 py-2 text-sm">
                {message}
                </div>
            </div>
            </div>
        )}

        {isUser && (
            <div className="flex items-start">
            <div className="flex flex-col">
                <div className="bg-primary text-white rounded-2xl px-4 py-2 text-sm">
                {message}
                </div>
            </div>

            {showAvatar ? (
                <Image
                src={avatarSrc || '/chat.svg'}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full object-cover ml-2 mt-1"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = '';
                }}
                />
            ) : (
                <div className="w-[32px] ml-2" />
            )}
            </div>
        )}
    </div>
);
};

export default ChatMessage;
