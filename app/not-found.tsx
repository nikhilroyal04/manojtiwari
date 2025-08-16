"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            पेज नहीं मिला
          </h2>
          <p className="text-gray-600">
            जिस पेज को आप खोज रहे हैं वह मौजूद नहीं है।
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <button className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              होम पर जाएं
            </button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            वापस जाएं
          </button>
        </motion.div>
      </div>
    </div>
  );
}