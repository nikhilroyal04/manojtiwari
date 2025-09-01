"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "राजेश कुमार",
    position: "स्थानीय व्यापारी",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    quote: "मनोज तिवारी जी ने हमारे क्षेत्र की समस्याओं को सुलझाने में बहुत मदद की है। उनके प्रयासों से हमारे इलाके में सड़कों और बिजली की स्थिति में काफी सुधार हुआ है।",
    rating: 5
  },
  {
    id: 2,
    name: "प्रिया शर्मा",
    position: "शिक्षिका",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "मनोज जी ने हमारे स्कूल के विकास में महत्वपूर्ण भूमिका निभाई है। उनके सहयोग से हमारे स्कूल में नई कंप्यूटर लैब और पुस्तकालय का निर्माण हुआ है।",
    rating: 5
  },
  {
    id: 3,
    name: "अमित सिंह",
    position: "किसान",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "मनोज तिवारी जी हमेशा किसानों के हित में काम करते हैं। उन्होंने हमारे गांव में सिंचाई की समस्या को हल करवाया और हमें नई कृषि तकनीकों से अवगत कराया।",
    rating: 4
  },
  {
    id: 4,
    name: "सुनीता देवी",
    position: "गृहिणी",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    quote: "मनोज जी ने महिला सशक्तिकरण के लिए कई कार्यक्रम शुरू किए हैं। उनके प्रयासों से हमारे क्षेत्र की महिलाओं को रोजगार के अवसर मिले हैं।",
    rating: 5
  }
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-100">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-orange-500/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">जनता की आवाज़</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">हमारे क्षेत्र के लोगों के अनुभव और विचार जो मनोज तिवारी जी के काम से प्रभावित हुए हैं</p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main testimonial card */}
          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/5 to-blue-500/5 z-0"></div>
              
              {/* Card content */}
              <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
                {/* Image column */}
                <motion.div 
                  className="flex flex-col justify-center items-center"
                  variants={itemVariants}
                >
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">{testimonials[activeIndex].name}</h3>
                    <p className="text-gray-600">{testimonials[activeIndex].position}</p>
                    <div className="flex items-center justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonials[activeIndex].rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Quote column */}
                <motion.div 
                  className="flex flex-col justify-center"
                  variants={itemVariants}
                >
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 relative">
                    <Quote className="w-12 h-12 text-orange-500/20 absolute top-4 left-4" />
                    <p className="text-xl md:text-2xl text-gray-700 italic relative z-10 leading-relaxed">
                      {testimonials[activeIndex].quote}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-20">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setAutoplay(false);
                  setTimeout(() => setAutoplay(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-orange-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}