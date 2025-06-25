// app/advertiser/settings/notifications/layout.tsx
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        {/* ممكن تضيف هنا Navigation أو Sidebar مثلًا */}
        {children}
    </div>
  );
}
