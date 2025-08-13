"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Music, Film, Tv, Users, Calendar, MapPin, Globe } from 'lucide-react';
import Achievements from './achievements';
import Filmography from './filmography';
import Timeline from './timeline';

export default function ManojTiwari() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const stats = [
    { icon: Music, value: "4,000+", label: "Songs" },
    { icon: Film, value: "75+", label: "Bhojpuri Films" },
    { icon: Tv, value: "10+", label: "TV Shows" },
    { icon: Users, value: "1,500+", label: "Stage Shows" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span className="font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-primary/90 to-accent/90 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/manoj-tiwari-bg.jpg"
            alt="Manoj Tiwari Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <motion.div 
              className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/manoj-tiwari-profile.jpg"
                alt="Manoj Tiwari"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">मनोज तिवारी</h1>
              <h2 className="text-2xl md:text-3xl text-white/90 font-light">Manoj Tiwari</h2>
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'MP, North East Delhi' : 'सांसद, उत्तर पूर्व दिल्ली'}
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Born: 1 February 1971' : 'जन्म: 1 फ़रवरी 1971'}
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Atarwalia, Bihar' : 'अतरवलिया, बिहार'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-8 text-center"
              variants={itemVariants}
            >
              {language === 'en' ? 'Biography' : 'जीवनी'}
            </motion.h2>
            
            {language === 'en' ? (
              <motion.div 
                className="space-y-4 text-gray-700 leading-relaxed"
                variants={itemVariants}
              >
                <p>
                  Manoj Tiwari (born 1 February 1971) is a singer, actor, television presenter and music director from Bihar, India. He has acted in the Bhojpuri genre of the Indian film industry and in 2005 was reported to be one of the two leading male stars of that genre.
                </p>
                <p>
                  Tiwari is also involved in politics, having contested the 2009 national elections for the Samajwadi Party.
                </p>
                <p className="font-semibold">
                  He won the North East Delhi (Lok Sabha constituency) in the 2014 Indian general elections from BJP.
                </p>
                <p>
                  BJP appoints Manoj Tiwari as Delhi B.J.P President on date (30/11/2016). Delhi BJP leaders and workers accorded a grand welcome to MP Shri Manoj Tiwari on his appointment as the President of BJP Delhi Pradesh.
                </p>
                <p>
                  He is also the captain of &quot;Bhojpuri Dabangs&quot; in CCL.
                </p>
                <p>
                  One of the six children of Chandra Deo Tiwari and Lalita Devi, his birthplace is Atarwalia, a small village in Kaimur district of Bihar.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-4 text-gray-700 leading-relaxed"
                variants={itemVariants}
              >
                <p>
                  मनोज तिवारी (जन्म 1 फ़रवरी 1971) भोजपुरी फिल्मो के सुपरस्टार, राजनेता और संगीत निर्देशक हैं। वे १६वी लोकसभा के सदस्य हैं!
                </p>
                <p className="font-semibold">
                  मनोज तिवारी (30/11/2016) को दिल्ली प्रदेश अध्यक्ष की जिम्मेदारी सौंपी गई।
                </p>
                <p>
                  मनोज तिवारी अन्ना हज़ारे द्वारा शुरू किए गए भ्रष्टाचार विरोधी अभियान में भी सक्रिय रहे।
                </p>
                <p>
                  वे भारतीय जनता पार्टी (भाजपा) से 2014 में उत्तर पूर्व दिल्ली लोकसभा क्षेत्र से सांसद चुने गए।
                </p>
                <p>
                  वे सेलिब्रिटी क्रिकेट लीग (CCL) में &quot;भोजपुरी डबैंग्स&quot; के कप्तान भी हैं।
                </p>
                <p>
                  चंद्र देव तिवारी और ललिता देवी के छह बच्चों में से एक, उनका जन्मस्थान अतरवलिया है, जो बिहार के कैमूर जिले का एक छोटा सा गांव है।
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Timeline />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg text-center"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? stat.label : 
                    stat.label === 'Songs' ? 'गाने' : 
                    stat.label === 'Bhojpuri Films' ? 'भोजपुरी फिल्में' : 
                    stat.label === 'TV Shows' ? 'टीवी शो' : 'स्टेज शो'
                  }
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Achievements />
      <Filmography />
    </div>
  );
}   