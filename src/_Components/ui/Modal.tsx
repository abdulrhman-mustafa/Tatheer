
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
    describtion?: string
    iconSrc?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    className,
    describtion,
    iconSrc
}) => {

    const modalContentRef = useRef<HTMLDivElement>(null);


useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    return () => {
        document.body.style.overflow = '';
    };
}, [isOpen]);

  // if modal open return null = no display anything
    if (!isOpen) {
        return null;
    }

const contentClasses = `
    relative flex flex-col bg-white p-6 rounded-sm gap-5 shadow-xl
    w-full mx-8
    transform transition-all duration-300 ease-out
    ${className || ''}
`;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // check if the click is outside the modal in overlay and not in modal
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
        onClose();
    }
};

return (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleOverlayClick}
    >
        {/* Box Modal */}
        <div
            ref={modalContentRef}
            className={contentClasses}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Icon */}
            <Image
                    src={iconSrc || "/IconWrapper.svg"}
                    alt="Modal Icon"
                    className='mx-auto'
                    width={64}
                    height={64}
                    onClick={onClose}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/64x64/E2E8F0/A0AEC0?text=?`; // Fallback for missing icon
                    }}
            />
            {/* Title*/}
            {title && (
                <h2 className="text-xl font-bold text-secondary">
                    {title}
                </h2>
            )}

            {/* Describtion */}
            {describtion && (
                <p className="text-base text-center text-place">
                    {describtion}
                </p>
            )}

            {/* Children*/}
            <div>
                {children}
            </div>
        </div>
    </div>
);
};

export default Modal;