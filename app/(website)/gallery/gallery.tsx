"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, PlayCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import CTA from "@/components/all/cta-section";

type TabKey = "photos" | "videos";

const photos: { src: string; alt: string }[] = [
  { src: "/images/hero1.jpg", alt: "Event highlight 1" },
  { src: "/images/hero2.avif", alt: "Event highlight 2" },
  { src: "/images/hero2.jpeg", alt: "Event moment 3" },
  { src: "/images/hero3.avif", alt: "Stage performance" },
  { src: "/manoj-tiwari.jpg", alt: "Manoj Tiwari portrait" },
  { src: "/logo.png", alt: "Logo showcase" },
];

const videos: { id: string; title: string }[] = [
  { id: "dQw4w9WgXcQ", title: "Live Performance" },
  { id: "ysz5S6PUM-U", title: "Event Highlights" },
  { id: "hY7m5jjJ9mM", title: "Behind the Scenes" },
  { id: "aqz-KE-bpKQ", title: "Interview Snippet" },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<TabKey>("photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + photos.length) % photos.length);
  };
  const showNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % photos.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <CTA
        title="Gallery"
        description="Explore photos and videos"
       />

      {/* Tabs */}
      <section className="pb-4 pt-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex bg-gray-100 rounded-full p-1 border border-gray-200">
              <button
                onClick={() => setActiveTab("photos")}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full transition-all ${
                  activeTab === "photos"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Camera className="w-5 h-5" />
                <span className="font-medium">Photos</span>
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full transition-all ${
                  activeTab === "videos"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <PlayCircle className="w-5 h-5" />
                <span className="font-medium">Videos</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-6">
        <div className="container mx-auto px-6">
          {activeTab === "photos" ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {photos.map((photo, index) => (
                <motion.button
                  key={photo.src + index}
                  variants={itemVariants}
                  onClick={() => openLightbox(index)}
                  className="group relative w-full overflow-hidden rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5"></div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  variants={itemVariants}
                  className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate">{video.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative w-full max-w-5xl">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute -top-10 right-0 text-white/90 hover:text-white"
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              onClick={showPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white/90 hover:text-white p-2"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative aspect-[16/10] bg-black rounded-xl overflow-hidden">
              <Image
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <button
              onClick={showNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/90 hover:text-white p-2"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
