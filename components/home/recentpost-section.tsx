"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import {
  fetchRecentPosts,
  selectRecentPosts,
  selectRecentPostsLoading,
  selectPostsError,
} from '@/lib/redux/features/postSlice';
import type { Post } from '@/lib/redux/features/postSlice';

export default function RecentPostSection() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectRecentPosts);
  const loading = useSelector(selectRecentPostsLoading);
  const error = useSelector(selectPostsError);

  // Fetch recent posts on mount
  useEffect(() => {
    dispatch(fetchRecentPosts());
  }, [dispatch]);

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

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recent posts...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>Error loading posts: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // No posts state
  if (posts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>No recent posts available.</p>
          </div>
        </div>
      </section>
    );
  }

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

        {/* Posts Grid - Show first 3 posts */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {posts.slice(0, 3).map((post: Post, index: number) => (
            <motion.div
              key={post._id || index}
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
                  src={post.featuredImage || '/images/posts/default-post.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3 leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* View Details Link */}
                <a 
                  href={post.slug && post.slug.trim() !== '' ? `/posts/${post.slug}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  View Details
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/posts"
            className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 text-base font-semibold shadow-md hover:shadow-lg"
          >
            View All Posts
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}