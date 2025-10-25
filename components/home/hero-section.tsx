"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, Play, Users, Award, MapPin } from 'lucide-react';
import Link from 'next/link';

const heroSlides = [
  {
    id: 1,
    title: "सांसद मनोज तिवारी",
    subtitle: "दिल्ली के जनप्रतिनिधि",
    description: "जनता की सेवा हमारा धर्म है। दिल्ली के लोगों की आवाज को संसद तक पहुंचाने के लिए समर्पित।",
    image: "/images/hero1.jpg",
    stats: [
      { icon: Users, value: "50+", label: "जनता दरबार" },
      { icon: Award, value: "25+", label: "वर्षों का अनुभव" },
      { icon: MapPin, value: "7", label: "लोकसभा क्षेत्र" }
    ],
    cta: "और जानें",
    ctaLink: "/mp-manoj-tiwari"
  },
  {
    id: 2,
    title: "जनता दरबार",
    subtitle: "आपकी समस्याओं का समाधान",
    description: "हर सप्ताह जनता दरबार में आपकी समस्याओं को सुनते हैं और तुरंत कार्यवाही करते हैं।",
    image: "/images/hero2.jpeg",
    stats: [
      { icon: Users, value: "1000+", label: "समस्याएं हल" },
      { icon: Award, value: "52", label: "सप्ताहिक दरबार" },
      { icon: MapPin, value: "100%", label: "जनता की सेवा" }
    ],
    cta: "दरबार में आएं",
    ctaLink: "/janta-darbar"
  },
  {
    id: 3,
    title: "चुनावी रैलियां",
    subtitle: "जनता के बीच",
    description: "दिल्ली के हर कोने में जाकर जनता से मिलते हैं और उनकी आकांक्षाओं को समझते हैं।",
    image: "/images/hero3.avif",
    stats: [
      { icon: Users, value: "10L+", label: "लोगों से संपर्क" },
      { icon: Award, value: "200+", label: "रैलियां" },
      { icon: MapPin, value: "70", label: "विधानसभा क्षेत्र" }
    ],
    cta: "रैली में शामिल हों",
    ctaLink: "/chunavi-railayan"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {heroSlides.map((slide, index) => {
          // Calculate position for each slide
          let position = 'translate-x-full opacity-0';
          
          if (index === currentSlide) {
            position = 'translate-x-0 opacity-100 z-10';
          } else if (index === (currentSlide - 1 + heroSlides.length) % heroSlides.length) {
            position = '-translate-x-full opacity-0';
          }
          
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${position}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10"></div>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>

              {/* Content */}
              <div className="relative z-20 h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 animate-fadeIn">
                      <Play className="w-4 h-4 mr-2" />
                      लाइव अपडेट्स
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight animate-slideUp">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6 animate-slideUp animation-delay-200">
                      {slide.subtitle}
                    </h2>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed animate-slideUp animation-delay-300">
                      {slide.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-8 mb-8">
                      {slide.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="flex items-center text-white animate-fadeIn" style={{ animationDelay: `${400 + statIndex * 100}ms` }}>
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                            <stat.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-sm opacity-80">{stat.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link href={slide.ctaLink} className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fadeIn animation-delay-600">
                      {slide.cta}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
        <div
          className="h-full bg-white transition-all duration-1000 ease-linear"
          style={{
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`
          }}
        />
      </div>
      
      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </section>
  );
}