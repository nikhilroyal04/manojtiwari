"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="relative h-12 w-60 cursor-pointer" onClick={() => router.push("/")} style={{ cursor: 'pointer' }}>
              {/* Lotus flower outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/logo.png" alt="Lotus" width={300} height={12} />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1">
            <Link 
              href="/mp-manoj-tiwari"
              className="px-4 py-2 text-md font-medium transform skew-x-12 transition-colors hover:bg-gray-100"
              style={{ color: 'var(--primary)' }}
            >
              <span className="transform -skew-x-12 block">मनोज तिवारी</span>
            </Link>
            
            <Link 
              href="/janta-darbar"
              className="px-4 py-2 text-md font-medium transform skew-x-12 transition-colors hover:bg-gray-100"
              style={{ color: 'var(--accent)' }}
            >
              <span className="transform -skew-x-12 block">जनता दरबार</span>
            </Link>
            
            <Link 
              href="/chunavi-railayan"
              className="px-4 py-2 text-md font-medium transform skew-x-12 transition-colors hover:bg-gray-100"
              style={{ color: 'var(--secondary)' }}
            >
              <span className="transform -skew-x-12 block">चुनावी रैलियां</span>
            </Link>
            
            <Link 
              href="/sampark-adhikari"
              className="px-4 py-2 text-md font-medium transform skew-x-12 transition-colors hover:bg-gray-100"
              style={{ color: 'var(--dark)' }}
            >
              <span className="transform -skew-x-12 block">संपर्क अधिकारी</span>
            </Link>
            
            <Link 
              href="/agami-karyakram"
              className="px-4 py-2 text-md font-medium transform skew-x-12 transition-colors hover:bg-gray-100"
              style={{ color: 'var(--accent)' }}
            >
              <span className="transform -skew-x-12 block">आगामी कार्यक्रम</span>
            </Link>
            
            <Link 
              href="/bhojpuri-duniya"
              className="px-4 py-2 text-md font-medium transform skew-x-12 transition-colors hover:bg-gray-100"
              style={{ color: 'var(--primary)' }}
            >
              <span className="transform -skew-x-12 block">भोजपुरी दुनिया</span>
            </Link>
            
            <Link 
              href="/sampark-karein"
              className="px-4 py-2 text-md font-medium transform skew-x-12 transition-colors hover:bg-gray-100"
              style={{ color: 'var(--secondary)' }}
            >
              <span className="transform -skew-x-12 block">संपर्क करें</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
