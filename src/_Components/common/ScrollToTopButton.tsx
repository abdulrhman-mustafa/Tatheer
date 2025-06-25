"use client";

import React, { useState, useEffect } from "react";

export const ScrollToTopButton: React.FC = () => {

const [isVisible, setIsVisible] = useState(false);

const toggleVisibility = () => {

if (window.pageYOffset > 300) {
    setIsVisible(true);
} else {
    setIsVisible(false);
}
};


const scrollToTop = () => {
window.scrollTo({
    top: 0,
    behavior: "smooth", 
});
};


useEffect(() => {
window.addEventListener("scroll", toggleVisibility);

return () => {
    window.removeEventListener("scroll", toggleVisibility);
};
}, []);

return (
<div className="fixed bottom-6 right-6 z-50">

    {isVisible && (
    <button
        onClick={scrollToTop}
        className="bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-lg transition-all duration-300  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 animate-bounce"
        aria-label="Scroll to top"
    >
        <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
        ></path>
        </svg>
    </button>
    )}
</div>
);
};
