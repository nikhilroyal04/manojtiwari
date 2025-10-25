import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube } from 'lucide-react';

const socialLinks = [
  {
    icon: Facebook,
    href: 'https://www.facebook.com/manojtiwariofficial/',
  },
  {
    icon: Twitter,
    href: 'https://x.com/ManojTiwariMP',
  },
  {
    icon: Youtube,
    href: 'https://www.youtube.com/channel/UC_-IuOPhiusA_gknYjMI1ig',
  },
];  

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-60 h-12">
                <Image src="/logo.png" alt="Lotus" width={320} height={12} />
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              जनता के सेवक, दिल्ली के सांसद मनोज तिवारी जी की आधिकारिक वेबसाइट। 
              जनता की सेवा हमारा धर्म है।
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>
              त्वरित लिंक्स
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mp-manoj-tiwari" className="text-gray-600 hover:text-gray-900 transition-colors">
                  मनोज तिवारी
                </Link>
              </li>
              <li>
                <Link href="/janta-darbar" className="text-gray-600 hover:text-gray-900 transition-colors">
                  जनता दरबार
                </Link>
              </li>
              <li>
                <Link href="/chunavi-railayan" className="text-gray-600 hover:text-gray-900 transition-colors">
                  चुनावी रैलियां
                </Link>
              </li>
              <li>
                <Link href="/agami-karyakram" className="text-gray-600 hover:text-gray-900 transition-colors">
                  आगामी कार्यक्रम
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--secondary)' }}>
              संपर्क जानकारी
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">दिल्ली, भारत</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-600">info@manojtiwari.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-600">+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--accent)' }}>
              सोशल मीडिया
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.href} target="_blank" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <link.icon className="w-5 h-5 text-gray-600" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
            © 2018 Manoj Tiwari. All Rights Reserved | Design by CMT AI
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-700 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700 transition-colors">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
