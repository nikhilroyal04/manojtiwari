"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Filter, Download, Share2 } from 'lucide-react';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: 'all', name: 'सभी', count: 12 },
    { id: 'parliament', name: 'संसद', count: 4 },
    { id: 'rallies', name: 'रैलियां', count: 3 },
    { id: 'meetings', name: 'बैठकें', count: 3 },
    { id: 'media', name: 'मीडिया', count: 2 }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "/gal1.jpeg",
      alt: "Manoj Tiwari in Parliament",
      category: "parliament",
      title: "संसद में भाषण",
      description: "लोकसभा में महत्वपूर्ण मुद्दों पर बोलते हुए"
    },
    {
      id: 2,
      src: "/gal2.jpeg",
      alt: "Political Rally",
      category: "rallies",
      title: "जनता रैली",
      description: "दिल्ली में जनता के बीच"
    },
    {
      id: 3,
      src: "/gal3.jpeg",
      alt: "Party Meeting",
      category: "meetings",
      title: "पार्टी बैठक",
      description: "BJP नेताओं के साथ बैठक"
    },
    {
      id: 4,
      src: "/gal4.jpeg",
      alt: "Media Interview",
      category: "media",
      title: "मीडिया साक्षात्कार",
      description: "टेलीविजन पर लाइव इंटरव्यू"
    },
    {
      id: 5,
      src: "/gal5.jpeg",
      alt: "Parliament Session",
      category: "parliament",
      title: "संसद सत्र",
      description: "विधेयक पर चर्चा"
    },
    {
      id: 6,
      src: "/gal6.jpeg",
      alt: "Election Rally",
      category: "rallies",
      title: "चुनावी रैली",
      description: "चुनाव प्रचार अभियान"
    },
    {
      id: 7,
      src: "/gal7.jpeg",
      alt: "Cabinet Meeting",
      category: "meetings",
      title: "मंत्रिमंडल बैठक",
      description: "सरकारी नीतियों पर चर्चा"
    },
    {
      id: 8,
      src: "/gal8.jpeg",
      alt: "Parliament Debate",
      category: "parliament",
      title: "संसदीय बहस",
      description: "राष्ट्रीय मुद्दों पर बहस"
    },
    {
      id: 9,
      src: "/gal9.jpeg",
      alt: "Press Conference",
      category: "media",
      title: "प्रेस कॉन्फ्रेंस",
      description: "मीडिया को जानकारी"
    },
    {
      id: 10,
      src: "/gal10.jpeg",
      alt: "Public Meeting",
      category: "rallies",
      title: "जनसभा",
      description: "आम जनता से संवाद"
    },
    {
      id: 11,
      src: "/gal11.jpeg",
      alt: "Party Conference",
      category: "meetings",
      title: "पार्टी सम्मेलन",
      description: "राष्ट्रीय सम्मेलन में भागीदारी"
    },
    {
      id: 12,
      src: "/gal12.jpeg",
      alt: "Parliament Address",
      category: "parliament",
      title: "संसद में संबोधन",
      description: "राष्ट्रपति के संबोधन के बाद"
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
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
            <span className="text-gray-900">Photo</span>
            <span className="text-primary ml-2">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">मनोज तिवारी के जीवन के विभिन्न पहलुओं की झलक</p>
        </motion.div>

        {/* Filter Categories */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              <span>{category.name}</span>
              <span className="text-xs opacity-75">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="mb-4 break-inside-avoid"
                variants={itemVariants}
                layout
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.description}</p>
                    </div>
                  </div>

                  {/* Hover Icons */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Download className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <div className="relative max-w-4xl max-h-full">
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Image */}
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={filteredImages[currentImageIndex].src}
                    alt={filteredImages[currentImageIndex].alt}
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                  
                  {/* Image Info */}
                  <div className="mt-4 text-center text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      {filteredImages[currentImageIndex].title}
                    </h3>
                    <p className="text-gray-300">
                      {filteredImages[currentImageIndex].description}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {currentImageIndex + 1} / {filteredImages.length}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}