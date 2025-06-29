'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';

import Back from '@/_Components/auth/Back';
import ChatMessage from '@/_Components/dashboard/ChatMessage';
import Input from '@/_Components/ui/Input';
import Image from 'next/image';

export default function TechnicalSupportPage() {
    const messagesEndRef = useRef<HTMLDivElement>(null);

const [messages, setMessages] = useState([
    { id: '1', text: 'Hello..👋', isUser: false, avatarSrc: null, timestamp: 'Today at 5:00 AM' },
    { id: '2', text: 'Do you have a question? Our team is here to help!', isUser: false, avatarSrc: null, timestamp: '' },
    { id: '3', text: 'Do you have a question?', isUser: false, avatarSrc: null, timestamp: '' },
    { id: '4', text: 'Please leave your inquiry and we\'ll get back to you within a few minutes.', isUser: false, avatarSrc: '/chat.svg', timestamp: '' },
]);

const [currentMessage, setCurrentMessage] = useState('');

useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
if (currentMessage.trim()) {
    const newMessage = {
    id: Date.now().toString(),
    text: currentMessage.trim(),
    isUser: true,
    avatarSrc: '/chat.svg',
    timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }),
        };
        setMessages(prev => [...prev, newMessage]);
        setCurrentMessage('');
    }
};

return (
    <div className="p-4 text-secondary flex flex-col h-screen bg-white">
        <div className="w-full max-w-md flex justify-between items-center mb-4 mt-2">
            <Back />
            <h1 className="text-lg font-medium text-center flex-grow md:hidden">Technical Support</h1>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4">
            {messages.map((msg, index) => {
            const isLastFromSameSender =
                index === messages.length - 1 ||
                messages[index + 1]?.isUser !== msg.isUser;

            return (
                <React.Fragment key={msg.id}>
                {msg.timestamp &&
                    (index === 0 || msg.timestamp !== messages[index - 1].timestamp) && (
                    <p className="text-center text-xs text-place mb-4">{msg.timestamp}</p>
                    )}

                <ChatMessage
                    message={msg.text}
                    isUser={msg.isUser}
                    avatarSrc={msg.avatarSrc || undefined}
                    showAvatar={isLastFromSameSender}
                />
                </React.Fragment>
            );
            })}
            <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="flex items-center rounded-3xl px-3 py-2 mt-2 border border-place">
            <button
                type="submit"
                className="p-2 bg-primary text-white rounded-full mr-2 hover:bg-primary transition-colors"
            >
            <Image src="/sendmessage.svg" alt="Send" width={24} height={24} />
            </button>

            <Input
                type="text"
                id="message"
                placeholder="Type your message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="flex-grow focus:ring-transparent border-0 outline-none bg-white"
            />

            <button type="button" className="ml-2 text-place hover:text-gray-600">
            <Image src="/gellary.svg" alt="Send" width={24} height={24} />
            </button>
        </form>
    </div>
  );
}
