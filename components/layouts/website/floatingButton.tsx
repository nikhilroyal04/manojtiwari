"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, MessageCircle, Facebook, Twitter, Youtube, X } from 'lucide-react';

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

export default function FloatingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Show scroll to top button when page is scrolled
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Social Media Chat Buttons */}
      <div className={`transition-all duration-300 ease-in-out ${isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-3 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ 
              backgroundColor: 'var(--primary)',
              animationDelay: `${index * 100}ms`
            }}
            title={link.icon.name}
          >
            <link.icon className="w-6 h-6 text-white" />
          </a>
        ))}
      </div>

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 mb-3 ${
          isChatOpen ? 'rotate-45' : ''
        }`}
        style={{ backgroundColor: 'var(--secondary)' }}
        title="Connect with us"
      >
        {isChatOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: 'var(--accent)' }}
          title="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
}
