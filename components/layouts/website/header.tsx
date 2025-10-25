"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { href: "/mp-manoj-tiwari", label: "मनोज तिवारी", color: "var(--primary)" },
    { href: "/janta-darbar", label: "जनता दरबार", color: "var(--accent)" },
    { href: "/chunavi-railayan", label: "चुनावी रैलियां", color: "var(--secondary)" },
    { href: "/sampark-adhikari", label: "संपर्क अधिकारी", color: "var(--dark)" },
    { href: "/agami-karyakram", label: "आगामी कार्यक्रम", color: "var(--accent)" },
    { href: "/posts", label: "पोस्ट्स", color: "var(--primary)" },
    { href: "/sampark-karein", label: "संपर्क करें", color: "var(--secondary)" },
  ];

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="relative h-12 w-60 cursor-pointer" onClick={() => router.push("/")} style={{ cursor: 'pointer' }}>
              <Image src="/logo.png" alt="Lotus" width={300} height={12} />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="px-4 py-2 text-md font-medium transform skew-x-12 transition-colors hover:bg-gray-100"
                style={{ color: item.color }}
              >
                <span className="transform -skew-x-12 block">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden fixed top-[72px] left-0 right-0 w-full bg-white shadow-lg border-t transition-all duration-300 ease-in-out transform z-50 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <nav className="w-full px-4 py-4">
          <div className="flex flex-col space-y-2">
            {navigationItems.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="px-4 py-3 text-lg font-medium rounded-md transition-colors hover:bg-gray-100 border-l-4"
                style={{ 
                  color: item.color,
                  borderLeftColor: item.color 
                }}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
