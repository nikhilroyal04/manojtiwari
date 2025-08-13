"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Filter, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import CTA from '@/components/all/cta-section';

export default function ChunaviRailayan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Sample rally posts
  const rallyPosts = [
    {
      id: 1,
      title: "सेयदराजा विधानसभा भाजपा प्रत्याशी श्री सुशील सिंह जी के लिए रोड शो",
      description: "सेयदराजा विधानसभा भाजपा प्रत्याशी श्री सुशील सिंह जी के लिए रोड शो कर भाजपा के पक्ष में मतदान करने का आग्रह करते हैं",
      date: "2022-06-25",
      location: "सेयदराजा विधानसभा",
      state: "उत्तर प्रदेश",
      images: [
        "/images/chunavi-railayan/rally1-1.jpg",
        "/images/chunavi-railayan/rally1-2.jpg",
        "/images/chunavi-railayan/rally1-3.jpg"
      ],
      mainImage: "/images/chunavi-railayan/rally1-main.jpg"
    },
    {
      id: 2,
      title: "आसनसोल लोकसभा उपनिर्वाचन बिजेपि मनोनीत प्रार्थी श्रीमती",
      description: "आसनसोल लोकसभा उपनिर्वाचन बिजेपि मनोनीत प्रार्थी श्रीमती paulagnimitra1 'র প্রচারে উপস্থিত ছিলেন সাংসদ ও বিজেপি নেতা",
      date: "2022-04-04",
      location: "आसनसोल",
      state: "पश्चिम बंगाल",
      images: [
        "/images/chunavi-railayan/rally2-1.jpg",
        "/images/chunavi-railayan/rally2-2.jpg"
      ],
      mainImage: "/images/chunavi-railayan/rally2-main.jpg"
    },
    {
      id: 3,
      title: "श्री मनोज तिवारी जी का सोनभद्र में विशाल जनसभा!",
      description: "सोनभद्र में आयोजित विशाल जनसभा में मनोज तिवारी जी ने भाजपा के विकास कार्यों पर प्रकाश डाला और क्षेत्र के विकास के लिए नई योजनाओं की घोषणा की।",
      date: "2022-03-15",
      location: "सोनभद्र",
      state: "उत्तर प्रदेश",
      images: [
        "/images/chunavi-railayan/rally3-1.jpg",
        "/images/chunavi-railayan/rally3-2.jpg",
        "/images/chunavi-railayan/rally3-3.jpg"
      ],
      mainImage: "/images/chunavi-railayan/rally3-main.jpg"
    },
    {
      id: 4,
      title: "गोरखपुर में भव्य रोड शो",
      description: "गोरखपुर में आयोजित भव्य रोड शो में हजारों लोगों ने भाग लिया। मनोज तिवारी जी ने भाजपा के विकास एजेंडे पर जोर दिया और क्षेत्र के विकास के लिए अपनी प्रतिबद्धता दोहराई।",
      date: "2022-02-20",
      location: "गोरखपुर",
      state: "उत्तर प्रदेश",
      images: [
        "/images/chunavi-railayan/rally4-1.jpg",
        "/images/chunavi-railayan/rally4-2.jpg"
      ],
      mainImage: "/images/chunavi-railayan/rally4-main.jpg"
    },
    {
      id: 5,
      title: "पूर्वांचल के विकास के लिए जनसभा",
      description: "पूर्वांचल के विकास के लिए आयोजित जनसभा में मनोज तिवारी जी ने क्षेत्र के लिए विशेष पैकेज की मांग की और स्थानीय समस्याओं के समाधान के लिए केंद्र सरकार की योजनाओं पर प्रकाश डाला।",
      date: "2022-01-10",
      location: "वाराणसी",
      state: "उत्तर प्रदेश",
      images: [
        "/images/chunavi-railayan/rally5-1.jpg",
        "/images/chunavi-railayan/rally5-2.jpg",
        "/images/chunavi-railayan/rally5-3.jpg"
      ],
      mainImage: "/images/chunavi-railayan/rally5-main.jpg"
    }
  ];

  // Filter posts based on search term and filters
  const filteredPosts = rallyPosts.filter(post => {
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
  const years = ["2019", "2020", "2021", "2022", "2023"];
  
  // States for filter
  const states = [
    "उत्तर प्रदेश",
    "बिहार",
    "दिल्ली",
    "पश्चिम बंगाल",
    "महाराष्ट्र",
    "गुजरात"
  ];

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
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/chunavi-railayan/${post.id}`}>
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
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(post.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{post.location}, {post.state}</span>
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