import React from "react";
import Image from "next/image";


interface AnalysisProps {
    spending: string;
    clickCount: number;
    fixedPrice: number;
    title: string
}
const Analysis: React.FC<AnalysisProps> = ({
    spending,
    clickCount,
    fixedPrice,
    title
}) => {
return (
    <div className="flex flex-col items-start p-4">
        <h1 className="text-2xl font-bold text-secondary mb-5">{title}</h1>
        <div className="flex flex-col items-center">
            <Image 
                src="/analysis.svg" 
                alt="Your App Logo" 
                width={400} height={400}
                className="w-auto h-auto"
            />
      {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 py-5 w-full">
                <div className="flex flex-col items-center justify-center text-center border border-place rounded-sm px-2 py-3">
                    <span className="text-base font-bold text-secondary">
                        {spending}
                    </span>
                    <span className="text-xs text-place">Spending</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center border border-place rounded-sm px-2 py-3">
                    <span className="text-base font-bold text-secondary">
                        {clickCount}
                    </span>
                    <span className="text-xs text-place">Click Count</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center border border-place rounded-sm px-2 py-3">
                    <span className="text-base font-bold text-secondary">
                        ${fixedPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-place">Fixed-Price</span>
                </div>
            </div>
        </div>
    </div>
);
};

export default Analysis;
