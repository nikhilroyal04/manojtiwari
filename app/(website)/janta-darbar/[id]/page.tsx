"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Share2, ChevronLeft, ChevronRight, X, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { fetchDarbars, selectDarbars, selectDarbarLoading, selectDarbarError } from '@/lib/redux/features/darbarSlice';
import type { JantaDarbar } from '@/lib/redux/features/darbarSlice';

export default function JantaDarbarPostPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const jantaDarbarPosts = useSelector(selectDarbars);
  const loading = useSelector(selectDarbarLoading);
  const error = useSelector(selectDarbarError);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch darbar posts on component mount
  useEffect(() => {
    dispatch(fetchDarbars());
  }, [dispatch]);

  // Find the specific post by ID
  const post = jantaDarbarPosts.find((p: JantaDarbar) => p._id === params.id);

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
          <Link href="/janta-darbar" className="text-primary hover:underline">
            जनता दरबार पर वापस जाएं
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
          <Link href="/janta-darbar" className="text-primary hover:underline">
            जनता दरबार पर वापस जाएं
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
          <Image 
            src={post.mainImage || '/images/janta-darbar/default-darbar.jpg'} 
            alt={post.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/janta-darbar" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 bg-black/20 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            जनता दरबार पर वापस जाएं
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white flex-1">{post.title}</h1>
              <span className={`px-4 py-2 text-sm font-bold rounded-full ${
                post.status === 'open' ? 'bg-green-500 text-white' :
                post.status === 'ongoing' ? 'bg-blue-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {post.status === 'open' ? '✓ खुला' : post.status === 'ongoing' ? '⟳ चल रहा है' : '✕ बंद'}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{post.location}</span>
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
              <h2 className="text-2xl font-bold mb-4">जनता दरबार एजेंडा:</h2>
              <p className="text-gray-700 mb-8 text-lg">{post.agenda}</p>
              
              {/* Stats Section */}
              {(post.attendees || post.issues || post.resolved) && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {post.attendees && post.attendees > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-blue-900">उपस्थिति</h3>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{post.attendees.toLocaleString('hi-IN')}</p>
                    </div>
                  )}
                  {post.issues && post.issues > 0 && (
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        <h3 className="font-bold text-orange-900">समस्याएं</h3>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">{post.issues.toLocaleString('hi-IN')}</p>
                    </div>
                  )}
                  {post.resolved && post.resolved > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="font-bold text-green-900">हल किए गए</h3>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{post.resolved.toLocaleString('hi-IN')}</p>
                    </div>
                  )}
                </div>
              )}
              
              {post.images && post.images.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold mb-4">फोटो गैलरी:</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                    {post.images.map((image: string, index: number) => (
                      <div 
                        key={index}
                        className="aspect-square relative rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setLightboxOpen(true);
                        }}
                      >
                        <Image
                          src={image}
                          alt={`${post.title} - ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <div className="flex justify-between items-center border-t pt-6">
                <div className="text-gray-500">
                  स्थिति: <span className={`font-medium ${
                    post.status === 'open' ? 'text-green-600' :
                    post.status === 'ongoing' ? 'text-blue-600' :
                    'text-gray-600'
                  }`}>
                    {post.status === 'open' ? 'खुला' : post.status === 'ongoing' ? 'चल रहा है' : 'बंद'}
                  </span>
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
          <h2 className="text-2xl font-bold mb-8 text-center">अन्य जनता दरबार</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jantaDarbarPosts
              .filter((p: JantaDarbar) => p._id !== post?._id)
              .slice(0, 3)
              .map((relatedPost: JantaDarbar) => (
                <Link 
                  href={`/janta-darbar/${relatedPost._id}`} 
                  key={relatedPost._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.mainImage || '/images/janta-darbar/default-darbar.jpg'}
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
