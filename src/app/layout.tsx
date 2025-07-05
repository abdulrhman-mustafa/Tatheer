import type { Metadata } from "next";
import { Lexend } from 'next/font/google';
import './globals.css';
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/_Components/common/Header/Header";



export const metadata: Metadata = {
  title: "Tatheer",
  description: "Tatheer is a platform that makes influencer marketing incredibly easy and effective. The results were excellent!",
  icons: {
    icon: "/icons/favicon.png",
  }
};
const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  preload: true,
  variable: "--font-lexend",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body  className={`${lexend.variable} font-sans`}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
