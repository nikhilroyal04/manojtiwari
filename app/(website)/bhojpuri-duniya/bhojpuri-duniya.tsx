"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, X, Play, Music, Film, Star, Calendar, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';
import CTA from '@/components/all/cta-section'; 

export default function BhojpuriDuniya() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Bhojpuri content data
  const bhojpuriContent = [
    {
      id: 1,
      title: "ससुरा बड़ा पैसावाला",
      type: "फिल्म",
      year: "2005",
      image: "/images/bhojpuri/sasura-bada-paisawala.jpg",
      description: "मनोज तिवारी की सुपरहिट भोजपुरी फिल्म जिसने उन्हें भोजपुरी सिनेमा का सुपरस्टार बना दिया। यह फिल्म भोजपुरी सिनेमा के इतिहास में मील का पत्थर साबित हुई।",
      rating: 4.8,
      director: "अजय सिन्हा",
      coStars: ["राजपाल यादव", "अमरनाथ वर्मा", "प्रकाश जैस"],
      songs: ["लॉलीपॉप लागेलू", "डाल देहलू कुछ ऐसन", "जब केहू दिल में समा जाता है"],
      videoUrl: "https://www.youtube.com/watch?v=_EKqxmWCXUY"
    },
    {
      id: 2,
      title: "लॉलीपॉप लागेलू",
      type: "गाना",
      year: "2008",
      image: "/images/bhojpuri/lollipop-lagelu.jpg",
      description: "मनोज तिवारी का सुपरहिट भोजपुरी गाना जिसने पूरे देश में धूम मचा दी थी। यह गाना आज भी भोजपुरी संगीत का सबसे लोकप्रिय गानों में से एक है।",
      rating: 4.9,
      album: "लॉलीपॉप लागेलू",
      lyrics: "प्यारे लाल यादव",
      music: "दामोदर राव",
      videoUrl: "https://www.youtube.com/watch?v=_EKqxmWCXUY"
    },
    {
      id: 3,
      title: "गंगा",
      type: "फिल्म",
      year: "2006",
      image: "/images/bhojpuri/ganga.jpg",
      description: "मनोज तिवारी की एक और सुपरहिट भोजपुरी फिल्म जिसने बॉक्स ऑफिस पर धमाल मचा दिया था। इस फिल्म में उनके अभिनय की काफी सराहना की गई थी।",
      rating: 4.6,
      director: "राजकुमार आर पांडेय",
      coStars: ["अमरपाली दुबे", "रवि किशन", "आवधेश मिश्रा"],
      songs: ["गंगा मईया तोहार", "जान हमार हौ गईल", "दिलवा में उठल बा हलचल"],
      videoUrl: "https://www.youtube.com/watch?v=_EKqxmWCXUY"
    },
    {
      id: 4,
      title: "बटैया",
      type: "एल्बम",
      year: "2010",
      image: "/images/bhojpuri/bataiya.jpg",
      description: "मनोज तिवारी का सुपरहिट भोजपुरी म्यूजिक एल्बम जिसमें कई हिट गाने शामिल हैं। इस एल्बम ने भोजपुरी संगीत को नई ऊंचाइयों पर पहुंचाया।",
      rating: 4.7,
      songs: ["बटैया", "ए हो सखी", "जवानी के रस"],
      music: "चंदन सिंह",
      videoUrl: "https://www.youtube.com/watch?v=_EKqxmWCXUY"
    },
    {
      id: 5,
      title: "जिला टॉप लागेलू",
      type: "गाना",
      year: "2012",
      image: "/images/bhojpuri/jila-top-lagelu.jpg",
      description: "मनोज तिवारी का एक और सुपरहिट भोजपुरी गाना जो युवाओं के बीच काफी लोकप्रिय हुआ। इस गाने के वीडियो में उनके डांस मूव्स की खूब तारीफ हुई।",
      rating: 4.5,
      album: "जिला टॉप",
      lyrics: "प्यारे मोहन साहनी",
      music: "चंदन सिंह",
      videoUrl: "https://www.youtube.com/watch?v=_EKqxmWCXUY"
    },
    {
      id: 6,
      title: "बाप जी",
      type: "फिल्म",
      year: "2014",
      image: "/images/bhojpuri/baap-ji.jpg",
      description: "मनोज तिवारी की एक्शन से भरपूर भोजपुरी फिल्म जिसमें उन्होंने एक मजबूत किरदार निभाया। फिल्म की कहानी और संवाद दर्शकों को खूब पसंद आए।",
      rating: 4.4,
      director: "विजय यादव",
      coStars: ["अंजना सिंह", "सुधीर पांडेय", "अवधेश मिश्रा"],
      songs: ["बाप जी जिंदाबाद", "दिल के चोर", "प्यार के रोग"],
      videoUrl: "https://www.youtube.com/watch?v=_EKqxmWCXUY"
    },
    {
      id: 7,
      title: "रंग डाली",
      type: "एल्बम",
      year: "2015",
      image: "/images/bhojpuri/rang-dali.jpg",
      description: "होली के मौके पर मनोज तिवारी का रिलीज हुआ म्यूजिक एल्बम जिसमें होली के कई शानदार गाने शामिल हैं। इस एल्बम ने होली के मौसम में धूम मचा दी थी।",
      rating: 4.6,
      songs: ["रंग डाली", "होली में चोली", "फागुन में फगुआ"],
      music: "अरविंद झा",
      videoUrl: "https://www.youtube.com/watch?v=_EKqxmWCXUY"
    },
    {
      id: 8,
      title: "जय हो गंगा मईया",
      type: "गाना",
      year: "2016",
      image: "/images/bhojpuri/jai-ho-ganga-maiya.jpg",
      description: "मनोज तिवारी का भक्ति गीत जो काफी लोकप्रिय हुआ। इस गाने में उन्होंने अपनी सुरीली आवाज से श्रोताओं का दिल जीत लिया।",
      rating: 4.8,
      album: "भक्ति संगम",
      lyrics: "शैलेश सागर",
      music: "चंदन सिंह",
      videoUrl: "https://www.youtube.com/watch?v=_EKqxmWCXUY"
    },
    {
      id: 9,
      title: "दबंग आशिक",
      type: "फिल्म",
      year: "2016",
      image: "/images/bhojpuri/dabang-aashiq.jpg",
      description: "मनोज तिवारी की रोमांटिक एक्शन फिल्म जिसमें उन्होंने एक दबंग आशिक का किरदार निभाया। फिल्म के गाने और एक्शन सीन्स दर्शकों को खूब पसंद आए।",
      rating: 4.3,
      director: "अजय शर्मा",
      coStars: ["आकांक्षा अवस्थी", "यश कुमार", "संजय पांडेय"],
      songs: ["प्यार के रोग", "दिल के चोर", "आशिकी में"],
      videoUrl: "https://www.youtube.com/watch?v=_EKqxmWCXUY"
    }
  ];

  // Get unique categories for filter
  const categories = Array.from(new Set(bhojpuriContent.map(item => item.type)));

  // Get unique years for filter
  const years = Array.from(new Set(bhojpuriContent.map(item => item.year))).sort((a, b) => parseInt(b) - parseInt(a));

  // Filter content based on search term and filters
  const filteredContent = bhojpuriContent.filter(item => {
    let matchesSearch = true;
    let matchesCategory = true;
    let matchesYear = true;

    if (searchTerm) {
      matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (selectedCategory) {
      matchesCategory = item.type === selectedCategory;
    }

    if (selectedYear) {
      matchesYear = item.year === selectedYear;
    }

    return matchesSearch && matchesCategory && matchesYear;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'फिल्म':
        return <Film className="w-5 h-5 text-primary" />;
      case 'गाना':
        return <Music className="w-5 h-5 text-primary" />;
      case 'एल्बम':
        return <Play className="w-5 h-5 text-primary" />;
      default:
        return <Film className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <CTA 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        title="भोजपुरी दुनिया"
        description="मनोज तिवारी जी की भोजपुरी फिल्में, गाने और एल्बम"
        placeholder="फिल्म, गाना या एल्बम खोजें..."
      />

      {/* Filter Section */}
      <section className="py-6 bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">भोजपुरी कंटेंट</h2>
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
              
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <span>{selectedCategory}</span>
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
                  <h3 className="text-sm font-medium text-gray-500 mb-2">श्रेणी</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                        className={`py-1 px-3 rounded-full text-sm flex items-center gap-1 ${
                          category === selectedCategory 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {getIcon(category)}
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
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
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredContent.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredContent.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1">
                      {getIcon(item.type)}
                      {item.type}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                      {item.rating}
                    </div>
                    <Link 
                      href={item.videoUrl} 
                      target="_blank"
                      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
                        <Play className="w-8 h-8 text-primary" fill="currentColor" />
                      </div>
                    </Link>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{item.year}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {item.type === 'फिल्म' && (
                        <>
                          <div className="text-sm">
                            <span className="text-gray-500">निर्देशक:</span> {item.director}
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">कलाकार:</span> मनोज तिवारी, {item.coStars?.join(', ')}
                          </div>
                        </>
                      )}
                      
                      {item.type === 'गाना' && (
                        <>
                          <div className="text-sm">
                            <span className="text-gray-500">एल्बम:</span> {item.album}
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">गीतकार:</span> {item.lyrics}
                          </div>
                        </>
                      )}
                      
                      {item.type === 'एल्बम' && (
                        <div className="text-sm">
                          <span className="text-gray-500">संगीत:</span> {item.music}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link 
                        href={`/bhojpuri-duniya/${item.id}`}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary/80"
                      >
                        विस्तृत जानकारी
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      
                      <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                        <Heart className="w-5 h-5" />
                      </button>
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
                  setSelectedCategory(null);
                  setSelectedYear(null);
                }}
                className="py-2 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                सभी कंटेंट दिखाएं
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">भोजपुरी दुनिया में मनोज तिवारी</h2>
              <p className="text-white/80">भोजपुरी सिनेमा और संगीत जगत के सुपरस्टार</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">75+</div>
                <div className="text-white/80">फिल्में</div>
              </div>
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">4000+</div>
                <div className="text-white/80">गाने</div>
              </div>
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                <div className="text-white/80">एल्बम</div>
              </div>
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
                <div className="text-white/80">पुरस्कार</div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-lg mb-6">
                मनोज तिवारी जी भोजपुरी फिल्म और संगीत जगत के सुपरस्टार हैं। उन्होंने अपनी मधुर आवाज और अभिनय से लाखों लोगों के दिलों में जगह बनाई है। उनके गाने और फिल्में आज भी लोगों के बीच काफी लोकप्रिय हैं।
              </p>
              <Link 
                href="/mp-manoj-tiwari/filmography"
                className="inline-flex items-center gap-1 py-2 px-6 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors"
              >
                फिल्मोग्राफी देखें
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}