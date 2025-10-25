"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Filter, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import CTA from '@/components/all/cta-section';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { fetchDarbars, selectDarbars, selectDarbarLoading, selectDarbarError } from '@/lib/redux/features/darbarSlice';
import type { JantaDarbar as JantaDarbarType } from '@/lib/redux/features/darbarSlice';

export default function JantaDarbar() {
  const dispatch = useDispatch<AppDispatch>();
  const jantaDarbarPosts = useSelector(selectDarbars);
  const loading = useSelector(selectDarbarLoading);
  const error = useSelector(selectDarbarError);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Fetch darbar posts on component mount
  useEffect(() => {
    dispatch(fetchDarbars());
  }, [dispatch]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative min-h-[500px]">
          <div className="absolute inset-0 z-0 h-full">
            <img
              src="https://manojtiwari.in/sites/default/files/WhatsApp%20Image%202019-07-27%20at%207.13.48%20PM.jpeg"
              alt="Background"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="relative z-10">
            <CTA
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              title="जनता दरबार"
              description="मनोज तिवारी जी द्वारा आयोजित जनता दरबार में लोगों की समस्याओं का समाधान और विकास कार्यों की समीक्षा"
              placeholder="जनता दरबार खोजें..."
            />
          </div>
        </div>
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
        <div className="relative min-h-[500px]">
          <div className="absolute inset-0 z-0 h-full">
            <img
              src="https://manojtiwari.in/sites/default/files/WhatsApp%20Image%202019-07-27%20at%207.13.48%20PM.jpeg"
              alt="Background"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="relative z-10">
            <CTA
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              title="जनता दरबार"
              description="मनोज तिवारी जी द्वारा आयोजित जनता दरबार में लोगों की समस्याओं का समाधान और विकास कार्यों की समीक्षा"
              placeholder="जनता दरबार खोजें..."
            />
          </div>
        </div>
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-4 text-red-600">त्रुटि</h1>
            <p className="text-gray-600 mb-4">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Get unique years and statuses for filters
  const years = Array.from(
    new Set(
      jantaDarbarPosts.map((post: JantaDarbarType) =>
        new Date(post.date).getFullYear().toString()
      )
    )
  ).sort((a, b) => parseInt(b) - parseInt(a));

  const statuses = [
    { value: "open", label: "खुला" },
    { value: "ongoing", label: "चल रहा है" },
    { value: "close", label: "बंद" },
  ];

  // Filter posts based on search term and filters
  const filteredPosts = jantaDarbarPosts.filter((post: JantaDarbarType) => {
    let matchesSearch = true;
    let matchesYear = true;
    let matchesMonth = true;

    let matchesStatus = true;

    if (searchTerm) {
      matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.agenda.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (selectedYear) {
      const postYear = new Date(post.date).getFullYear().toString();
      matchesYear = postYear === selectedYear;
    }

    if (selectedMonth) {
      const postMonth = new Date(post.date).getMonth().toString();
      matchesMonth = postMonth === selectedMonth;
    }

    if (selectedStatus) {
      matchesStatus = post.status === selectedStatus;
    }

    return matchesSearch && matchesYear && matchesMonth && matchesStatus;
  });

  // Months for filter
  const months = [
    { value: "0", label: "जनवरी" },
    { value: "1", label: "फरवरी" },
    { value: "2", label: "मार्च" },
    { value: "3", label: "अप्रैल" },
    { value: "4", label: "मई" },
    { value: "5", label: "जून" },
    { value: "6", label: "जुलाई" },
    { value: "7", label: "अगस्त" },
    { value: "8", label: "सितंबर" },
    { value: "9", label: "अक्टूबर" },
    { value: "10", label: "नवंबर" },
    { value: "11", label: "दिसंबर" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[500px]">
        <div className="absolute inset-0 z-0 h-full">
          <img
            src="https://manojtiwari.in/sites/default/files/WhatsApp%20Image%202019-07-27%20at%207.13.48%20PM.jpeg"
            alt="Background"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="relative z-10">
          <CTA
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            title="जनता दरबार"
            description="मनोज तिवारी जी द्वारा आयोजित जनता दरबार में लोगों की समस्याओं का समाधान और विकास कार्यों की समीक्षा"
            placeholder="जनता दरबार खोजें..."
          />
        </div>
      </div>

      {/* Filter Section */}
      <section className="py-6 bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">जनता दरबार अभिलेख</h2>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                फ़िल्टर
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${filterOpen ? "rotate-180" : ""}`}
                />
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

              {selectedMonth !== null && (
                <button
                  onClick={() => setSelectedMonth(null)}
                  className="flex items-center gap-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <span>
                    {months.find((m) => m.value === selectedMonth)?.label}
                  </span>
                  <X className="w-4 h-4" />
                </button>
              )}

              {selectedStatus && (
                <button
                  onClick={() => setSelectedStatus(null)}
                  className="flex items-center gap-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <span>
                    {statuses.find((s) => s.value === selectedStatus)?.label}
                  </span>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Options */}
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 border-t pt-4"
            >
              <div className="flex flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    वर्ष
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() =>
                          setSelectedYear(year === selectedYear ? null : year)
                        }
                        className={`py-1 px-3 rounded-full text-sm ${
                          year === selectedYear
                            ? "bg-primary text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    महीना
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {months.map((month) => (
                      <button
                        key={month.value}
                        onClick={() =>
                          setSelectedMonth(
                            month.value === selectedMonth ? null : month.value
                          )
                        }
                        className={`py-1 px-3 rounded-full text-sm ${
                          month.value === selectedMonth
                            ? "bg-primary text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {month.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    स्थिति
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status.value}
                        onClick={() =>
                          setSelectedStatus(
                            status.value === selectedStatus
                              ? null
                              : status.value
                          )
                        }
                        className={`py-1 px-3 rounded-full text-sm ${
                          status.value === selectedStatus
                            ? "bg-primary text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {status.label}
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
              {filteredPosts.map((post: JantaDarbarType, index: number) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/janta-darbar/${post._id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={
                          post.mainImage ||
                          "/images/janta-darbar/default-darbar.jpg"
                        }
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold line-clamp-2 flex-1">
                          {post.title}
                        </h3>
                        <span
                          className={`ml-2 px-2 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                            post.status === "open"
                              ? "bg-green-100 text-green-600"
                              : post.status === "ongoing"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {post.status === "open"
                            ? "खुला"
                            : post.status === "ongoing"
                              ? "चल रहा है"
                              : "बंद"}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.agenda}
                      </p>

                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(post.date).toLocaleDateString("hi-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{post.location}</span>
                      </div>

                      {post.images && post.images.length > 0 && (
                        <div className="mt-4 flex gap-2">
                          {post.images.slice(0, 3).map((image, i) => (
                            <div
                              key={i}
                              className="w-12 h-12 relative rounded-md overflow-hidden"
                            >
                              <Image
                                src={image}
                                alt={`${post.title} - ${i + 1}`}
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
              <p className="text-gray-600 mb-6">
                अपनी खोज या फ़िल्टर को बदलकर पुनः प्रयास करें
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedYear(null);
                  setSelectedMonth(null);
                  setSelectedStatus(null);
                }}
                className="py-2 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                सभी जनता दरबार दिखाएं
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
              <div className="text-4xl md:text-5xl font-bold mb-2">125+</div>
              <div className="text-white/80">जनता दरबार</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">5000+</div>
              <div className="text-white/80">लोगों से मुलाकात</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">85%</div>
              <div className="text-white/80">समस्या समाधान</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">300+</div>
              <div className="text-white/80">विकास कार्य</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}