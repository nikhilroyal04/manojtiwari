"use client";

import React from 'react';
import Image from 'next/image';
import { Award, Heart, Star, Shield, ArrowRight} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutSection() {

  const highlights = [
    {
      icon: Star,
      title: "बहुमुखी प्रतिभा",
      description: "गायक, अभिनेता, टेलीविजन प्रस्तोता और संगीत निर्देशक के रूप में पहचान।"
    },
    {
      icon: Shield,
      title: "राजनीतिक नेतृत्व",
      description: "2014 में उत्तर पूर्व दिल्ली से BJP से लोकसभा सांसद चुने गए।"
    },
    {
      icon: Heart,
      title: "जनता का नेता",
      description: "2016 में दिल्ली BJP के अध्यक्ष नियुक्त किए गए और जनता की सेवा में समर्पित।"
    }
  ];

  const cards = [
    {
      title: "प्रधानमंत्री ने की 'स्वच्छ भारत अभियान'",
      description: "Clean India Mission launched by Prime Minister",
      icon: "🧹"
    },
    {
      title: "Saaf Niyat - Sahi Vikas",
      description: "Clean Intention - Right Development",
      icon: "🎯"
    },
    {
      title: "बेटी बचाओ, बेटी पढ़ाओ",
      description: "Save Girl Child, Educate Girl Child",
      icon: "👧"
    }
  ];

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          
          {/* Left Side - Image */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                variants={imageVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/manoj-tiwari.jpg"
                  alt="सांसद मनोज तिवारी"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg"
                variants={badgeVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="space-y-2"
            variants={itemVariants}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium mb-4 bg-primary text-white"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Star className="w-3 h-3 mr-2" />
              सांसद दिल्ली
            </motion.div>

            {/* Main Heading */}
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
              variants={itemVariants}
            >
              <span className="text-primary">Manoj Tiwari</span>
            </motion.h2>

            {/* Description */}
            <motion.div 
              className="space-y-2"
              variants={itemVariants}
            >
              <motion.p 
                className="text-base text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                Manoj Tiwari (born 1 February 1971) is a singer, actor, television presenter and music director from Bihar, India. 
                He has acted in the Bhojpuri genre of the Indian film industry and in 2005 was reported to be one of the two leading male stars of that genre.
              </motion.p>

              <motion.p 
                className="text-base text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                Tiwari is also involved in politics, having contested the 2009 national elections for the Samajwadi Party.
              </motion.p>

              <motion.p 
                className="text-base text-gray-600 leading-relaxed font-semibold"
                variants={itemVariants}
              >
                He won the North East Delhi (Lok Sabha constituency) in the 2014 Indian general elections from BJP.
              </motion.p>

              <motion.p 
                className="text-base text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                BJP appoints Manoj Tiwari as Delhi B.J.P President on date (30/11/2016)
              </motion.p>

              <motion.p 
                className="text-base text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                Delhi BJP leaders and workers accorded a grand welcome to MP Shri Manoj Tiwari on his appointment as the President of BJP Delhi Pradesh. 
                He is also the captain of &quot;Bhojpuri Dabangs&quot; in CCL.
              </motion.p>
            </motion.div>

            {/* Highlights */}
            <motion.div 
              className="space-y-3 pt-2"
              variants={itemVariants}
            >
              {highlights.map((highlight, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start space-x-3"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-accent"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <highlight.icon className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-0.5">{highlight.title}</h3>
                    <p className="text-sm text-gray-600">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="pt-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/about" className="inline-flex items-center px-4 text-primary hover:text-primary/80 transition-all duration-300">
                  Read More
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Cards Section */}
        <motion.div 
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100"
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}