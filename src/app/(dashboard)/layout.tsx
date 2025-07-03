// src/app/(dashboard)/layout.tsx

"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import SettingsSidebar from '@/_Components/dashboard/SettingsSidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const isSettingsPath = pathname.startsWith('/settings');

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Content Area */}
            <div className="flex flex-1 h-full">
                {isSettingsPath && (
                    <div className="hidden px-2 mr-5 md:block w-64">
                        <SettingsSidebar />
                    </div>
                )}
                <main className="flex-1 rounded-sm md:px-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
