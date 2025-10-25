"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Share2, ChevronLeft, ChevronRight, X, Users } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { fetchRailayan, selectRailayan, selectRailayanLoading, selectRailayanError } from '@/lib/redux/features/railayanSlice';
import type { ChunaviRailayan } from '@/lib/redux/features/railayanSlice';

export default function ChunaviRailayanPostPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const rallyPosts = useSelector(selectRailayan);
  const loading = useSelector(selectRailayanLoading);
  const error = useSelector(selectRailayanError);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch rallies on component mount
  useEffect(() => {
    dispatch(fetchRailayan());
  }, [dispatch]);

  // Find the specific post by ID
  const post = rallyPosts.find((p: ChunaviRailayan) => p._id === params.id);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4 text-red-600">त्रुटि</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/chunavi-railayan" className="text-primary hover:underline">
            चुनावी रैलियां पर वापस जाएं
          </Link>
        </div>
      </div>
    );
  }


  // Show not found state
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-4">पोस्ट नहीं मिला</h1>
          <Link href="/chunavi-railayan" className="text-primary hover:underline">
            चुनावी रैलियां पर वापस जाएं
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    if (post.images && post.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === (post.images?.length || 0) - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (post.images && post.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? (post.images?.length || 0) - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={post.mainImage || '/images/chunavi-railayan/default-rally.jpg'} 
            alt={post.title} 
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/chunavi-railayan" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 bg-black/20 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            चुनावी रैलियां पर वापस जाएं
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{post.location}, {post.state}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">विवरण:</h2>
              <p className="text-gray-700 mb-8 text-lg">{post.description}</p>
              
              {post.feedback && (
                <>
                  <h2 className="text-2xl font-bold mb-4">फीडबैक:</h2>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                    <p className="text-gray-700 text-lg">{post.feedback}</p>
                  </div>
                </>
              )}

              {(post.expectedCrowd || post.actualCrowd) && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {post.expectedCrowd && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-primary" />
                        <h3 className="font-bold">अपेक्षित भीड़</h3>
                      </div>
                      <p className="text-2xl font-bold text-primary">{post.expectedCrowd.toLocaleString('hi-IN')}</p>
                    </div>
                  )}
                  {post.actualCrowd && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-green-600" />
                        <h3 className="font-bold">वास्तविक भीड़</h3>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{post.actualCrowd.toLocaleString('hi-IN')}</p>
                    </div>
                  )}
                </div>
              )}
              
              {post.images && post.images.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">फोटो गैलरी:</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                    {post.images.map((image, index) => (
                      <div 
                        key={index}
                        className="aspect-square relative rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setLightboxOpen(true);
                        }}
                      >
                        <img
                          src={image}
                          alt={`${post.title} - ${index + 1}`}
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <div className="flex justify-between items-center border-t pt-6">
                <div className="text-gray-500">
                  स्थान: <span className="font-medium text-primary">{post.location}, {post.state}</span>
                </div>
                <button className="flex items-center gap-2 text-primary hover:text-primary/80">
                  <Share2 className="w-5 h-5" />
                  शेयर करें
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">अन्य चुनावी रैलियां</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rallyPosts
              .filter((p: ChunaviRailayan) => p._id !== post?._id)
              .slice(0, 3)
              .map((relatedPost: ChunaviRailayan) => (
                <Link 
                  href={`/chunavi-railayan/${relatedPost._id}`} 
                  key={relatedPost._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.mainImage || '/images/chunavi-railayan/default-rally.jpg'}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <div className="text-sm text-gray-500">
                      {new Date(relatedPost.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && post.images && post.images.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl max-h-[80vh]">
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative h-full w-full flex items-center justify-center">
              <Image
                src={post.images[currentImageIndex]}
                alt={`${post.title} - ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>
            
            {post.images.length > 1 && (
              <>
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <button 
                    className="bg-black/50 p-3 rounded-full hover:bg-black/70 text-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <button 
                    className="bg-black/50 p-3 rounded-full hover:bg-black/70 text-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                  {currentImageIndex + 1} / {post.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 