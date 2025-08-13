"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, User, MessageSquare, CheckCircle } from 'lucide-react';

export default function SamparkKarein() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFocus = (field: string) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocused(prev => ({ ...prev, [field]: formData[field as keyof typeof formData] !== '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setFocused({
          name: false,
          email: false,
          phone: false,
          subject: false,
          message: false
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-600 to-orange-600 py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-bg.png')] opacity-10 bg-repeat"></div>
        <div className="absolute top-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-white/5 to-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              className="inline-block p-3 bg-white/20 backdrop-blur-lg rounded-full mb-8"
            >
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-full p-4 shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              संपर्क करें
            </motion.h1>
            <motion.p 
              className="text-white/90 text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              हमसे संपर्क करने के लिए नीचे दिए गए फॉर्म को भरें। हम आपके संदेश का जल्द से जल्द जवाब देंगे।
            </motion.p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-12 md:p-16 text-center max-w-3xl mx-auto border border-white/30"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
              >
                <CheckCircle className="w-14 h-14 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-6">धन्यवाद!</h2>
              <p className="text-white/90 text-xl mb-8">आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।</p>
              <div className="w-32 h-1.5 bg-white/50 mx-auto rounded-full"></div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Contact Info */}
                <div className="bg-gradient-to-br from-orange-600/40 to-red-600/40 backdrop-blur-xl p-8 md:p-12 lg:col-span-2 relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 -translate-y-20"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 translate-y-20"></div>
                  
                  <div className="relative">
                    <h2 className="text-3xl font-bold mb-10 text-white">संपर्क जानकारी</h2>
                    
                    <div className="space-y-8">
                      <motion.div 
                        className="flex items-start group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300 p-4 rounded-2xl mr-5 shadow-lg">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white/80 text-lg mb-1">फोन</h3>
                          <p className="text-white text-xl font-semibold">+91 98765 43210</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-start group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300 p-4 rounded-2xl mr-5 shadow-lg">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white/80 text-lg mb-1">ईमेल</h3>
                          <p className="text-white text-xl font-semibold">contact@manojtiwari.com</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-start group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300 p-4 rounded-2xl mr-5 shadow-lg">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white/80 text-lg mb-1">कार्यालय</h3>
                          <p className="text-white text-xl font-semibold">उत्तर पूर्वी दिल्ली संसदीय कार्यालय,<br />नई दिल्ली - 110001</p>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="mt-16 pt-10 border-t border-white/20">
                      <h3 className="font-medium text-white/90 text-lg mb-6">हमें सोशल मीडिया पर फॉलो करें</h3>
                      <div className="flex space-x-5">
                        <motion.a 
                          href="#" 
                          className="bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                          whileHover={{ y: -5 }}
                        >
                          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                          </svg>
                        </motion.a>
                        <motion.a 
                          href="#" 
                          className="bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                          whileHover={{ y: -5 }}
                        >
                          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                          </svg>
                        </motion.a>
                        <motion.a 
                          href="#" 
                          className="bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                          whileHover={{ y: -5 }}
                        >
                          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                          </svg>
                        </motion.a>
                        <motion.a 
                          href="#" 
                          className="bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                          whileHover={{ y: -5 }}
                        >
                          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                          </svg>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Form */}
                <div className="p-8 md:p-12 lg:col-span-3 relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-20 -translate-y-20"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-20 translate-y-20"></div>
                  
                  <div className="relative">
                    <h2 className="text-3xl font-bold mb-10 text-white">अपना संदेश भेजें</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name Field */}
                        <motion.div 
                          className="relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className={`absolute left-5 ${focused.name ? 'top-3 text-xs' : 'top-1/2 -translate-y-1/2 text-base'} text-white/80 transition-all pointer-events-none`}>
                            <User className="w-5 h-5 inline mr-2" />
                            <span>नाम</span>
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => handleFocus('name')}
                            onBlur={() => handleBlur('name')}
                            className={`w-full bg-white/10 border border-white/30 rounded-2xl px-5 ${focused.name ? 'pt-8 pb-3' : 'py-5'} text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all shadow-md`}
                          />
                        </motion.div>
                        
                        {/* Email Field */}
                        <motion.div 
                          className="relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className={`absolute left-5 ${focused.email ? 'top-3 text-xs' : 'top-1/2 -translate-y-1/2 text-base'} text-white/80 transition-all pointer-events-none`}>
                            <Mail className="w-5 h-5 inline mr-2" />
                            <span>ईमेल</span>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            className={`w-full bg-white/10 border border-white/30 rounded-2xl px-5 ${focused.email ? 'pt-8 pb-3' : 'py-5'} text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all shadow-md`}
                          />
                        </motion.div>
                        
                        {/* Phone Field */}
                        <motion.div 
                          className="relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <div className={`absolute left-5 ${focused.phone ? 'top-3 text-xs' : 'top-1/2 -translate-y-1/2 text-base'} text-white/80 transition-all pointer-events-none`}>
                            <Phone className="w-5 h-5 inline mr-2" />
                            <span>फोन नंबर</span>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => handleFocus('phone')}
                            onBlur={() => handleBlur('phone')}
                            className={`w-full bg-white/10 border border-white/30 rounded-2xl px-5 ${focused.phone ? 'pt-8 pb-3' : 'py-5'} text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all shadow-md`}
                          />
                        </motion.div>
                        
                        {/* Subject Field */}
                        <motion.div 
                          className="relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <div className={`absolute left-5 ${focused.subject ? 'top-3 text-xs' : 'top-1/2 -translate-y-1/2 text-base'} text-white/80 transition-all pointer-events-none`}>
                            <MessageSquare className="w-5 h-5 inline mr-2" />
                            <span>विषय</span>
                          </div>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onFocus={() => handleFocus('subject')}
                            onBlur={() => handleBlur('subject')}
                            className={`w-full bg-white/10 border border-white/30 rounded-2xl px-5 ${focused.subject ? 'pt-8 pb-3' : 'py-5'} text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all shadow-md`}
                          />
                        </motion.div>
                      </div>
                      
                      {/* Message Field */}
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div className={`absolute left-5 ${focused.message ? 'top-3 text-xs' : 'top-7 text-base'} text-white/80 transition-all pointer-events-none`}>
                          <MessageSquare className="w-5 h-5 inline mr-2" />
                          <span>संदेश</span>
                        </div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus('message')}
                          onBlur={() => handleBlur('message')}
                          rows={5}
                          className={`w-full bg-white/10 border border-white/30 rounded-2xl px-5 ${focused.message ? 'pt-8 pb-3' : 'pt-7 pb-3'} text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all shadow-md`}
                        ></textarea>
                      </motion.div>
                      
                      {/* Submit Button */}
                      <motion.div 
                        className="flex justify-center mt-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <button
                          type="submit"
                          disabled={loading}
                          className={`bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-medium text-lg px-12 py-5 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 hover:shadow-xl ${loading ? 'opacity-70 cursor-not-allowed' : ''} shadow-lg`}
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              संदेश भेज रहा है...
                            </>
                          ) : (
                            <>
                              <Send className="w-6 h-6 mr-3" />
                              संदेश भेजें
                            </>
                          )}
                        </button>
                      </motion.div>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}   