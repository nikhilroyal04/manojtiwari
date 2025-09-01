"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function RecentPostSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const posts = [
    {
      id: 1,
      image: "/post-1.jpg",
      headline: "दिल्ली में सीलिंग एक उद्योग बन गया है: मनोज तिवारी",
      description: "दिल्ली बीजेपी अध्यक्ष मनोज तिवारी ने कहा है कि दिल्ली में सीलिंग एक उद्योग बन गया है. भ्रष्ट अधिकारियों के साथ मिलकर मॉनिटरिंग कमिटी 2006 से लेकर 2018 तक भय में दिल्ली के लोगों को रखा है.",
      hasButton: false
    },
    {
      id: 2,
      image: "/post-2.jpeg",
      headline: "दिल्ली की जनता को सस्ती बिजली देने के लिए ही केंद्र सरकार ला ...",
      description: "दिल्ली भाजपा अध्यक्ष मनोज तिवारी ने दिल्ली के मुख्यमंत्री अरविंद केजरीवाल सरकार पर एक बार फिर हमला बोला है.",
      hasButton: true
    },
    {
      id: 3,
      image: "/post-3.jpeg",
      headline: "मनोज तिवारी ने गृहमंत्री से की अपील, दिल्ली में घुसपैठियों की जांच ...",
      description: "भाजपा सांसद मनोज तिवारी ने गृहमंत्री राजनाथ सिंह को पत्र लिखकर दिल्ली में मौजूद रोहिंग्या घुसपैठियों को हटाने की मांग की है.",
      hasButton: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            <span className="text-gray-900">Recent</span>
            <span className="text-primary ml-2">Posts</span>
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mt-2"></div>
        </motion.div>

        {/* Posts Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* Post Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.headline}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3 leading-tight">
                  {post.headline}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {post.description}
                </p>
                
                {/* View Details Link/Button */}
                {post.hasButton ? (
                  <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    View Details
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <a href="#" className="inline-flex items-center text-gray-700 hover:text-primary transition-colors text-sm font-medium">
                    View Details
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Controls */}
        <motion.div 
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Green Line */}
          <div className="w-32 h-0.5 bg-secondary"></div>
          
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Slide Indicators */}
        <motion.div 
          className="flex justify-center space-x-2 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}