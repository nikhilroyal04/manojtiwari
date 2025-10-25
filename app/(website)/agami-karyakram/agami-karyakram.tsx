"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Note: This import is not used now, but we'll leave it.
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Filter, ChevronDown, X, ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';
import CTA from '@/components/all/cta-section';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { fetchKaryakram, selectKaryakram, selectLoading, selectError } from '@/lib/redux/features/karyakramSlice';
import type { Karyakram } from '@/lib/redux/features/karyakramSlice';

export default function AgamiKaryakram() {
  const dispatch = useDispatch<AppDispatch>();
  const karyakrams = useSelector(selectKaryakram);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentDate] = useState(new Date());

  // Fetch events on component mount
  useEffect(() => {
    dispatch(fetchKaryakram());
  }, [dispatch]);

  // Get unique event types for filter
  const eventTypes = Array.from(new Set(karyakrams.map((event: Karyakram) => event.type)));

  // Get unique months for filter
  const months = [
    { value: "01", label: "जनवरी" }, { value: "02", label: "फरवरी" }, { value: "03", label: "मार्च" },
    { value: "04", label: "अप्रैल" }, { value: "05", label: "मई" }, { value: "06", label: "जून" },
    { value: "07", label: "जुलाई" }, { value: "08", label: "अगस्त" }, { value: "09", label: "सितंबर" },
    { value: "10", label: "अक्टूबर" }, { value: "11", label: "नवंबर" }, { value: "12", label: "दिसंबर" },
  ];

  // Filter events based on search term and filters
  const filteredEvents = karyakrams.filter((event: Karyakram) => {
    let matchesSearch = true;
    let matchesMonth = true;
    let matchesType = true;

    if (searchTerm) {
      matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (selectedMonth) {
      const eventDate = new Date(event.date);
      const eventMonth = String(eventDate.getMonth() + 1).padStart(2, "0");
      matchesMonth = eventMonth === selectedMonth;
    }

    if (selectedType) {
      matchesType = event.type === selectedType;
    }

    return matchesSearch && matchesMonth && matchesType;
  });

  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Animation variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } }, };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, };

  // Format date to display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("hi-IN", { year: "numeric", month: "long", day: "numeric", weekday: "long", });
  };

  // Check if event is upcoming or past
  const isUpcoming = (dateString: string) => new Date(dateString) >= currentDate;

  // Reusable Hero Section with Background Image
  const HeroSection = () => (
    <div className="relative">
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3138-moD_4Sjfs7rB6gqd4vEkzRtLw_A3Jw&s"
          alt="आगामी कार्यक्रम बैकग्राउंड"
          className="w-full h-full object-cover" // <-- YAHAN BADLAV KIYA GAYA HAI
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10">
        <CTA
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          title="आगामी कार्यक्रम"
          description="मनोज तिवारी जी के आगामी कार्यक्रमों की जानकारी"
          placeholder="कार्यक्रम खोजें..."
        />
      </div>
    </div>
  );

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeroSection />
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
        <HeroSection />
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
      <HeroSection />

      {/* Filter Section */}
      <section className="py-6 bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">कार्यक्रम कैलेंडर</h2>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                फ़िल्टर
                <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
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

              {selectedMonth && (
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

              {selectedType && (
                <button
                  onClick={() => setSelectedType(null)}
                  className="flex items-center gap-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <span>{selectedType}</span>
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
                  <h3 className="text-sm font-medium text-gray-500 mb-2">महीना</h3>
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
                  <h3 className="text-sm font-medium text-gray-500 mb-2">कार्यक्रम प्रकार</h3>
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setSelectedType(type === selectedType ? null : type)
                        }
                        className={`py-1 px-3 rounded-full text-sm ${
                          type === selectedType
                            ? "bg-primary text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {sortedEvents.length > 0 ? (
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedEvents.map((event: Karyakram) => (
                <motion.div
                  key={event._id}
                  variants={itemVariants}
                  className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all ${
                    isUpcoming(event.date)
                      ? "border-l-4 border-primary"
                      : "border-l-4 border-gray-300"
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative h-64 md:h-auto">
                      <Image
                        src={event.image || "/images/events/default-event.jpg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                          isUpcoming(event.date)
                            ? "bg-primary text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {isUpcoming(event.date) ? "आगामी" : "संपन्न"}
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                        {event.type}
                      </div>
                    </div>

                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl md:text-2xl font-bold mb-3">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <div className="text-sm text-gray-500">दिनांक:</div>
                            <div>{formatDate(event.date)}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <div className="text-sm text-gray-500">समय:</div>
                            <div>{event.time}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 md:col-span-2">
                          <MapPin className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <div className="text-sm text-gray-500">स्थान:</div>
                            <div>{event.location}</div>
                          </div>
                        </div>
                        {event.expectedAttendees && event.expectedAttendees > 0 && (
                          <div className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-primary mt-1" />
                            <div>
                              <div className="text-sm text-gray-500">अपेक्षित उपस्थिति:</div>
                              <div>{event.expectedAttendees} लोग</div>
                            </div>
                          </div>
                        )}
                      </div>
                      {isUpcoming(event.date) && event.status !== "cancelled" && (
                          <div className="flex justify-end">
                            <Link href={`/agami-karyakram/${event._id}`} className="inline-flex items-center gap-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                              विस्तृत जानकारी
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">कोई परिणाम नहीं मिला</h3>
              <p className="text-gray-600 mb-6">अपनी खोज या फ़िल्टर को बदलकर पुनः प्रयास करें</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedMonth(null);
                  setSelectedType(null);
                }}
                className="py-2 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                सभी कार्यक्रम दिखाएं
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">कार्यक्रम कैलेंडर</h2>
              <p className="text-white/80">मनोज तिवारी जी के आगामी कार्यक्रमों का कैलेंडर देखें और अपडेट रहें</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">आगामी महत्वपूर्ण कार्यक्रम</h3>
                <Link href="/calendar" className="inline-flex items-center gap-1 py-2 px-4 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors">
                  पूरा कैलेंडर देखें
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {sortedEvents
                  .filter((event: Karyakram) => isUpcoming(event.date))
                  .slice(0, 3)
                  .map((event: Karyakram) => (
                    <div key={event._id} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg">
                      <div className="bg-white text-primary rounded-lg p-3 text-center min-w-[70px]">
                        <div className="text-sm font-bold">
                          {new Date(event.date).toLocaleDateString("hi-IN", { month: "short", })}
                        </div>
                        <div className="text-2xl font-bold">
                          {new Date(event.date).getDate()}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold">{event.title}</h4>
                        <div className="text-sm text-white/80 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {event.time} | <MapPin className="w-3 h-3" /> {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Users className="w-5 h-5" />
                  <span className="font-bold">सभी कार्यक्रम जनता के लिए खुले हैं</span>
                </div>
                <p className="text-sm text-white/80">अधिक जानकारी के लिए कार्यालय से संपर्क करें: (011) 23094122</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}