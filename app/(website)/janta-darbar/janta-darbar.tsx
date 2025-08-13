"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Filter, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import CTA from '@/components/all/cta-section';

export default function JantaDarbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // Sample janta darbar posts
  const jantaDarbarPosts = [
    {
      id: 1,
      title: "बच्चों के चेहरे पर मुस्कान देख कर मन प्रफुल्लित हो गया",
      agenda: "अपने आवासीय कार्यालय में बच्चों से मिला, बच्चों के चेहरे पर मुस्कान थी, बच्चों की अपने शहर प्रति, अपने देश के प्रति कर्तव्य, अपने देश के प्रधानमंत्री में विश्वास, स्वछता को लेकर Positive Attitude ये सब भाव देख कर मन प्रफुल्लित हो",
      date: "Saturday, July 20, 2019 - 11:45",
      status: "CLOSE",
      location: "North East Delhi",
      images: [
        "/images/janta-darbar/jd1-1.jpg",
        "/images/janta-darbar/jd1-2.jpg",
        "/images/janta-darbar/jd1-3.jpg"
      ],
      mainImage: "/images/janta-darbar/jd1-main.jpg"
    },
    {
      id: 2,
      title: "जनता दरबार में लोगों की समस्याओं का समाधान",
      agenda: "आज के जनता दरबार में क्षेत्र के नागरिकों की समस्याओं को सुना और संबंधित अधिकारियों को तुरंत समाधान के निर्देश दिए। जल आपूर्ति, सड़क मरम्मत और स्वच्छता से जुड़े मुद्दों पर विशेष ध्यान दिया गया।",
      date: "Monday, August 12, 2019 - 10:30",
      status: "CLOSE",
      location: "North East Delhi",
      images: [
        "/images/janta-darbar/jd2-1.jpg",
        "/images/janta-darbar/jd2-2.jpg"
      ],
      mainImage: "/images/janta-darbar/jd2-main.jpg"
    },
    {
      id: 3,
      title: "युवाओं के साथ संवाद कार्यक्रम",
      agenda: "आज के जनता दरबार में युवाओं के साथ विशेष संवाद कार्यक्रम आयोजित किया गया। युवाओं ने शिक्षा, रोजगार और कौशल विकास से जुड़े अपने विचार साझा किए। सभी युवाओं को सरकार की विभिन्न योजनाओं के बारे में जानकारी दी गई।",
      date: "Wednesday, September 18, 2019 - 12:00",
      status: "CLOSE",
      location: "North East Delhi",
      images: [
        "/images/janta-darbar/jd3-1.jpg",
        "/images/janta-darbar/jd3-2.jpg",
        "/images/janta-darbar/jd3-3.jpg"
      ],
      mainImage: "/images/janta-darbar/jd3-main.jpg"
    },
    {
      id: 4,
      title: "महिला सशक्तिकरण पर विशेष चर्चा",
      agenda: "आज के जनता दरबार में महिला सशक्तिकरण पर विशेष चर्चा की गई। महिलाओं ने अपनी समस्याएं और सुझाव साझा किए। महिला स्वयं सहायता समूहों को प्रोत्साहन देने और महिलाओं के लिए रोजगार के अवसर बढ़ाने पर जोर दिया गया।",
      date: "Friday, October 25, 2019 - 11:00",
      status: "CLOSE",
      location: "North East Delhi",
      images: [
        "/images/janta-darbar/jd4-1.jpg",
        "/images/janta-darbar/jd4-2.jpg"
      ],
      mainImage: "/images/janta-darbar/jd4-main.jpg"
    },
    {
      id: 5,
      title: "स्वच्छता अभियान के साथ जनता दरबार",
      agenda: "आज के जनता दरबार के साथ क्षेत्र में स्वच्छता अभियान भी चलाया गया। स्थानीय निवासियों और स्वयंसेवकों ने बढ़-चढ़कर हिस्सा लिया। स्वच्छ भारत मिशन के तहत लोगों को जागरूक किया गया और सफाई के महत्व पर प्रकाश डाला गया।",
      date: "Sunday, November 10, 2019 - 09:30",
      status: "CLOSE",
      location: "North East Delhi",
      images: [
        "/images/janta-darbar/jd5-1.jpg",
        "/images/janta-darbar/jd5-2.jpg",
        "/images/janta-darbar/jd5-3.jpg"
      ],
      mainImage: "/images/janta-darbar/jd5-main.jpg"
    }
  ];

  // Filter posts based on search term and filters
  const filteredPosts = jantaDarbarPosts.filter(post => {
    let matchesSearch = true;
    let matchesYear = true;
    let matchesMonth = true;

    if (searchTerm) {
      matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     post.agenda.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (selectedYear) {
      const postYear = new Date(post.date.split(" - ")[0]).getFullYear().toString();
      matchesYear = postYear === selectedYear;
    }

    if (selectedMonth) {
      const postMonth = new Date(post.date.split(" - ")[0]).getMonth().toString();
      matchesMonth = postMonth === selectedMonth;
    }

    return matchesSearch && matchesYear && matchesMonth;
  });

  // Years for filter
  const years = ["2019", "2020", "2021", "2022", "2023"];
  
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
    { value: "11", label: "दिसंबर" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <CTA 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        title="जनता दरबार"
        description="मनोज तिवारी जी द्वारा आयोजित जनता दरबार में लोगों की समस्याओं का समाधान और विकास कार्यों की समीक्षा"
        placeholder="जनता दरबार खोजें..."
      />

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
              
              {selectedMonth !== null && (
                <button 
                  onClick={() => setSelectedMonth(null)}
                  className="flex items-center gap-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <span>{months.find(m => m.value === selectedMonth)?.label}</span>
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
                  <h3 className="text-sm font-medium text-gray-500 mb-2">महीना</h3>
                  <div className="flex flex-wrap gap-2">
                    {months.map(month => (
                      <button
                        key={month.value}
                        onClick={() => setSelectedMonth(month.value === selectedMonth ? null : month.value)}
                        className={`py-1 px-3 rounded-full text-sm ${
                          month.value === selectedMonth 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {month.label}
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
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/janta-darbar/${post.id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.mainImage}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.agenda}</p>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{post.date.split(" - ")[0]}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{post.location}</span>
                      </div>
                      
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
                  setSelectedMonth(null);
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
    