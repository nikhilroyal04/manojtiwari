"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Filter, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import CTA from '@/components/all/cta-section';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { fetchRailayan, selectRailayan, selectRailayanLoading, selectRailayanError } from '@/lib/redux/features/railayanSlice';
import type { ChunaviRailayan } from '@/lib/redux/features/railayanSlice';

export default function ChunaviRailayanPage() {
  const dispatch = useDispatch<AppDispatch>();
  const rallyPosts = useSelector(selectRailayan);
  const loading = useSelector(selectRailayanLoading);
  const error = useSelector(selectRailayanError);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Fetch rallies on component mount
  useEffect(() => {
    dispatch(fetchRailayan());
  }, [dispatch]);

  // Get unique states for filter
  const states = Array.from(new Set(rallyPosts.map((post: ChunaviRailayan) => post.state)));

  // Filter posts based on search term and filters
  const filteredPosts = rallyPosts.filter((post: ChunaviRailayan) => {
    let matchesSearch = true;
    let matchesYear = true;
    let matchesState = true;

    if (searchTerm) {
      matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     post.location.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (selectedYear) {
      const postYear = new Date(post.date).getFullYear().toString();
      matchesYear = postYear === selectedYear;
    }

    if (selectedState) {
      matchesState = post.state === selectedState;
    }

    return matchesSearch && matchesYear && matchesState;
  });

  // Years for filter
  const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CTA 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          title="चुनावी रैलियां अभिलेख"
          description="मनोज तिवारी जी द्वारा आयोजित चुनावी रैलियां और जनसभाओं का संग्रह"
          placeholder="रैलियां खोजें..."
        />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CTA 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          title="चुनावी रैलियां अभिलेख"
          description="मनोज तिवारी जी द्वारा आयोजित चुनावी रैलियां और जनसभाओं का संग्रह"
          placeholder="रैलियां खोजें..."
        />
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold mb-2 text-red-600">त्रुटि</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <CTA 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        title="चुनावी रैलियां अभिलेख"
        description="मनोज तिवारी जी द्वारा आयोजित चुनावी रैलियां और जनसभाओं का संग्रह"
        placeholder="रैलियां खोजें..."
      />

      {/* Filter Section */}
      <section className="py-6 bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">चुनावी रैलियां अभिलेख</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                फ़िल्टर
                <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="flex items-center gap-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <span>&quot;{searchTerm}&quot;</span>
                  <X className="w-4 h-4" />
                </button>
              )}
              
              {selectedYear && (
                <button 
                  onClick={() => setSelectedYear(null)}
                  className="flex items-center gap-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <span>{selectedYear}</span>
                  <X className="w-4 h-4" />
                </button>
              )}
              
              {selectedState && (
                <button 
                  onClick={() => setSelectedState(null)}
                  className="flex items-center gap-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <span>{selectedState}</span>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          {/* Filter Options */}
          {filterOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 border-t pt-4"
            >
              <div className="flex flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">वर्ष</h3>
                  <div className="flex flex-wrap gap-2">
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year === selectedYear ? null : year)}
                        className={`py-1 px-3 rounded-full text-sm ${
                          year === selectedYear 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">राज्य</h3>
                  <div className="flex flex-wrap gap-2">
                    {states.map(state => (
                      <button
                        key={state}
                        onClick={() => setSelectedState(state === selectedState ? null : state)}
                        className={`py-1 px-3 rounded-full text-sm ${
                          state === selectedState 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/chunavi-railayan/${post._id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.mainImage || '/images/chunavi-railayan/default-rally.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(post.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{post.location}, {post.state}</span>
                      </div>
                      
                      {post.images && post.images.length > 0 && (
                        <div className="mt-4 flex gap-2">
                          {post.images.slice(0, 3).map((image, i) => (
                            <div key={i} className="w-12 h-12 relative rounded-md overflow-hidden">
                              <Image
                                src={image}
                                alt={`${post.title} - ${i+1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {post.images.length > 3 && (
                            <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-sm font-medium text-gray-600">
                              +{post.images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">कोई परिणाम नहीं मिला</h3>
              <p className="text-gray-600 mb-6">अपनी खोज या फ़िल्टर को बदलकर पुनः प्रयास करें</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedYear(null);
                  setSelectedState(null);
                }}
                className="py-2 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                सभी रैलियां दिखाएं
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-white/80">चुनावी रैलियां</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-white/80">राज्य</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-white/80">जिले</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">10L+</div>
              <div className="text-white/80">उपस्थिति</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}