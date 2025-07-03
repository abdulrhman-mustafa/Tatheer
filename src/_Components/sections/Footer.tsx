import React from "react";
import Link from "next/link";
import Image from "next/image";

export const FooterSection: React.FC = () => {
const socialLinks = [
    { name: "Facebook", href: "#", icon: "/linked.svg" },
    { name: "Twitter", href: "#", icon: "/insta.svg" },
    { name: "Instagram", href: "#", icon: "/behance.svg" },
    { name: "LinkedIn", href: "#", icon: "/dribble.svg" },
];

const currentYear = new Date().getFullYear();
const baseClasses = `text-place hover:text-white transition-colors duration-200 text-sm md:text-base ?? ""`;

return (
<footer className="bg-gray-800 text-place py-8 px-6">
    <div className="container mx-auto flex flex-col items-center space-y-8">
    <div className="logo">
        <Link href="/">
        <Image src="/icons/logo.svg" alt="Your App Logo" width={40} height={40} />
        </Link>
    </div>

    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6">
        <Link href="/" className={`${baseClasses} text-white`}>
        Home
        </Link>
        <Link href="/#about-us" className={baseClasses}>
        About Us
        </Link>
        <Link href="/#influencers-section" className={baseClasses}>
        Influencers
        </Link>
        <Link href="/#opinions" className={baseClasses}>
        Opinions
        </Link>
    </nav>

    <div className="flex flex-col sm:flex-row sm:space-x-8 items-center space-y-2 sm:space-y-0 text-place mb-6">
        <div className="flex items-center gap-2">
        <Image src="/mail.svg" alt="Your App Logo" width={20} height={20} />
        <span>ibrahimelhanafi07@gmail.com</span>
        </div>
        <div className="flex items-center gap-2">
        <Image
            src="/phone.svg"
            alt="Your App Logo"
            width={20}
            height={20}
        />
        <span>+970 81242523</span>
        </div>
    </div>

    <div className="flex space-x-4 mb-6">
        {socialLinks.map((link) => (
        <Link key={link.name} href={link.href} className={baseClasses}>
            <Image
            src={link.icon}
            alt={link.name}
            width={35}
            height={35}
            className="rounded-full"
            />
        </Link>
        ))}
    </div>

    <div className="text-center text-sm text-place">
        <p>Copyright © {currentYear} Tatheer. All Rights Reserved.</p>
    </div>
    </div>
</footer>
);
};
