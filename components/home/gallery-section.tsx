"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Share2,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import {
  fetchGallery,
  selectGallery,
  selectGalleryLoading,
  selectGalleryError,
  GalleryItem,
} from "@/lib/redux/features/gallerySlice";

/**
 * Utility to normalize & filter categories, handles empty/undefined/null
 */
function getGalleryCategories(images: GalleryItem[]) {
  const set = new Set<string>();
  for (const img of images) {
    if (img.category && String(img.category).trim()) {
      // Normalize: trim and convert to string
      set.add(String(img.category).trim());
    }
  }
  return Array.from(set).sort();
}

export default function GallerySection() {
  const dispatch = useDispatch<AppDispatch>();
  const galleryImages = useSelector(selectGallery);
  const isLoading = useSelector(selectGalleryLoading);
  const error = useSelector(selectGalleryError);

  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch gallery on mount
  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  // Get unique categories only once galleryImages change
  const categories = useMemo(() => ([
    { id: "all", name: "सभी" },
    ...getGalleryCategories(galleryImages).map((cat) => ({
      id: String(cat),
      name: String(cat),
    })),
  ]), [galleryImages]);

  // Reset to "all" if current selected category doesn't exist in new categories
  useEffect(() => {
    const categoryExists = categories.some(cat => cat.id === selectedCategory);
    if (!categoryExists && selectedCategory !== "all") {
      setSelectedCategory("all");
    }
  }, [categories, selectedCategory]);

  // Reset current image index/lightbox when filter or images change
  useEffect(() => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  }, [selectedCategory, galleryImages.length]);

  // Strict category filtering
  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") {
      return galleryImages;
    }
    return galleryImages.filter(
      (img) =>
        img.category &&
        String(img.category).trim() === selectedCategory
    );
  }, [selectedCategory, galleryImages]);

  // Category counts with strict comparison
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return galleryImages.length;
    return galleryImages.filter(
      (img) => img.category && String(img.category).trim() === categoryId
    ).length;
  };

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Open image in lightbox with correct index in filteredImages
  const openLightbox = (filteredIndex: number) => {
    setCurrentImageIndex(filteredIndex);
    setSelectedImage(filteredIndex);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Next/Prev logic is now based on filteredImages
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      filteredImages.length === 0
        ? 0
        : (prev + 1) % filteredImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      filteredImages.length === 0
        ? 0
        : (prev - 1 + filteredImages.length) % filteredImages.length
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50 min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-red-50 min-h-[50vh] flex items-center justify-center">
        <div className="text-center text-red-700">
          <h3 className="text-2xl font-bold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
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
          <p className="text-lg text-gray-600 mb-8">
            मनोज तिवारी के जीवन के विभिन्न पहलुओं की झलक
          </p>
        </motion.div>

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
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              <span>{category.name}</span>
              <span className="text-xs opacity-75">
                ({getCategoryCount(category.id)})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {filteredImages.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl font-semibold mb-2">कोई चित्र नहीं मिला</p>
            <p className="text-sm">कृपया अन्य श्रेणी का चयन करें</p>
          </div>
        ) : (
          <motion.div
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            key={selectedCategory}
          >
            {filteredImages.map((image, index) => (
            <motion.div
              key={`${image._id}-${selectedCategory}`}
              className="mb-4 break-inside-avoid"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                onClick={() => openLightbox(index)}
              >
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    unoptimized
                  />
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {image.title}
                    </h3>
                    <p className="text-sm opacity-90">{image.description}</p>
                  </div>
                </div>

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
          </motion.div>
        )}

        <AnimatePresence>
          {selectedImage !== null &&
            filteredImages.length > 0 &&
            filteredImages[currentImageIndex] && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <div className="relative max-w-4xl max-h-full">
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl"
                >
                  <div className="relative w-full" style={{ maxHeight: '80vh', aspectRatio: '4/3' }}>
                    <Image
                      src={filteredImages[currentImageIndex].url}
                      alt={filteredImages[currentImageIndex].title}
                      fill
                      className="object-contain rounded-lg"
                      unoptimized
                    />
                  </div>

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