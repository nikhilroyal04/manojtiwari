"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import {
  fetchPosts,
  selectPosts,
  selectPostsLoading,
  selectPostsError,
} from '@/lib/redux/features/postSlice';
import type { Post } from '@/lib/redux/features/postSlice';
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import CTA from '@/components/all/cta-section';

export default function PostsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const allPosts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Filter only published posts
  const publishedPosts = allPosts.filter((post) => post.status === "PUBLISHED");

  // Get unique categories
  const categories = Array.from(
    new Set(publishedPosts.map((post) => post.category))
  );

  // Filter posts based on search and category
  const filteredPosts = publishedPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>Error loading posts: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with CTA */}
      <CTA 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        title="ब्लॉग पोस्ट"
        description="ताज़ा खबरें, विचार और अपडेट"
        placeholder="पोस्ट खोजें..."
      />

      {/* Category Filter Section */}
      <section className="py-6 bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">श्रेणी</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                सभी ({publishedPosts.length})
              </button>
              {categories.map((category) => {
                const count = publishedPosts.filter(p => p.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      category === selectedCategory
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">कोई पोस्ट नहीं मिली</h3>
              <p className="text-gray-600 mb-6">अपनी खोज या फ़िल्टर को बदलकर पुनः प्रयास करें</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="py-2 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                सभी पोस्ट दिखाएं
              </button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {filteredPosts.map((post: Post, index: number) => (
                <motion.div
                  key={post._id || index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5
                      }
                    }
                  }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Featured Image */}
                  <Link href={post.slug && post.slug.trim() !== '' ? post.slug : `#`} target={post.slug && post.slug.trim() !== '' ? "_blank" : "_self"} rel="noopener noreferrer">
                    <div className="relative h-56 overflow-hidden group">
                      <Image
                        src={post.featuredImage || "/images/posts/default-post.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Post Content */}
                  <div className="p-6">
                    {/* Title */}
                    <Link href={post.slug && post.slug.trim() !== '' ? post.slug : `#`} target={post.slug && post.slug.trim() !== '' ? "_blank" : "_self"} rel="noopener noreferrer">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime} मिनट</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>

                      <Link
                        href={post.slug && post.slug.trim() !== '' ? post.slug : `#`}
                        target={post.slug && post.slug.trim() !== '' ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
                      >
                        पढ़ें
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}