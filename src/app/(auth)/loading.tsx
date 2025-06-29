
import React from 'react';
import { BeatLoader } from 'react-spinners';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <BeatLoader 
                color="#5500ff"
                size={20} />
        </div>
    );
}
