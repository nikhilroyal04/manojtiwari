"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, User, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import CTA from '@/components/all/cta-section';
import { useDispatch } from 'react-redux';
import { addLead } from '@/lib/redux/features/leadSlice';
import { AppDispatch } from '@/lib/redux/store';

export default function SamparkKarein() {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    status: "new" as "new" | "contacted" | "qualified" | "converted" | "lost",
    priority: "medium" as "low" | "medium" | "high",
    notes: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const handleFocus = (field: keyof typeof focused) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof typeof focused) => {
    setFocused((prev) => ({
      ...prev,
      [field]: formData[field as keyof typeof formData] !== "",
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLeadError(null);
    setLeadSuccess(false);

    try {
      dispatch(addLead(formData));
      setLeadSuccess(true);
      setSubmitted(true);
      setLoading(false);

      setTimeout(() => {
        setSubmitted(false);
        setLeadSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          status: "new",
          priority: "medium",
          notes: "",
        });
        setFocused({
          name: false,
          email: false,
          phone: false,
          subject: false,
          message: false,
        });
      }, 3000);
    } catch (err: unknown) {
      setLoading(false);
      console.error(err);
      setLeadError("लीड जोड़ने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
      setTimeout(() => setLeadError(null), 4000);
    }
  };

  // Reusable Hero Section with Background Image
  const HeroSection = () => (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.shutterstock.com/image-vector/indian-political-party-bjp-flag-600nw-2470096729.jpg"
          alt="संपर्क करें बैकग्राउंड"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10">
        <CTA
          title="संपर्क करें"
          description="हमसे संपर्क करने के लिए नीचे दिए गए फॉर्म को भरें। हम आपके संदेश का जल्द से जल्द जवाब देंगे।"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      <div className="mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Decorative elements */}
          <div className="absolute top-40 left-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-40 right-10 w-80 h-80 bg-red-500/10 rounded-full blur-3xl -z-10"></div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 text-center max-w-3xl mx-auto border border-orange-100"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
              >
                <CheckCircle className="w-14 h-14 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                धन्यवाद!
              </h2>
              <p className="text-gray-600 text-xl mb-8">
                आपका संदेश सफलतापूर्वक भेज दिया गया है।
                <br />
                {leadSuccess && (
                  <span className="block text-green-600 font-semibold mt-2">
                    लीड सफलतापूर्वक जोड़ी गई!
                  </span>
                )}
              </p>
              <div className="w-32 h-1.5 bg-gradient-to-r from-orange-300 to-red-400 mx-auto rounded-full"></div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative"
            >
              {/* Contact Info Card */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100 h-full">
                  <div className="h-32 bg-gradient-to-r from-orange-500 to-red-500 relative">
                    <div className="absolute -bottom-12 left-8">
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 w-24 h-24 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12">
                        <MessageSquare className="w-12 h-12 text-white transform -rotate-12" />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-16">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">
                      संपर्क जानकारी
                    </h2>
                    <div className="space-y-8">
                      <motion.div
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300 p-4 rounded-2xl mr-5 shadow-lg">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-500 text-lg mb-1">
                            फोन
                          </h3>
                          <p className="text-gray-800 text-xl font-semibold">
                            +91 98765 43210
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300 p-4 rounded-2xl mr-5 shadow-lg">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-500 text-lg mb-1">
                            ईमेल
                          </h3>
                          <p className="text-gray-800 text-xl font-semibold">
                            contact@manojtiwari.com
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300 p-4 rounded-2xl mr-5 shadow-lg">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-500 text-lg mb-1">
                            कार्यालय
                          </h3>
                          <p className="text-gray-800 text-xl font-semibold">
                            उत्तर पूर्वी दिल्ली संसदीय कार्यालय,
                            <br />
                            नई दिल्ली - 110001
                          </p>
                        </div>
                      </motion.div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-gray-100">
                      <h3 className="font-medium text-gray-700 text-lg mb-6">
                        हमें सोशल मीडिया पर फॉलो करें
                      </h3>
                      <div className="flex space-x-4">
                        <motion.a
                          target="_blank"
                          href="https://www.facebook.com/manojtiwariofficial/"
                          className="bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                          whileHover={{ y: -5 }}
                        >
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                          </svg>
                        </motion.a>
                        <motion.a
                          target="_blank"
                          href="https://x.com/ManojTiwariMP"
                          className="bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                          whileHover={{ y: -5 }}
                        >
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                          </svg>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100 p-8 md:p-10">
                  <div className="flex items-center mb-8">
                    <div className="h-12 w-1.5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-4"></div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      अपना संदेश भेजें
                    </h2>
                  </div>
                  {leadError && (
                    <div className="mb-6 flex items-center p-4 bg-red-100 rounded-lg">
                      <XCircle className="w-6 h-6 text-red-500 mr-2" />
                      <span className="text-red-600 font-semibold">
                        {leadError}
                      </span>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Name, Email, Phone, Subject Fields */}
                      {Object.keys(focused)
                        .slice(0, 4)
                        .map((key) => (
                          <div key={key} className="relative">
                            <div
                              className={`absolute left-5 ${focused[key as keyof typeof focused] ? "top-3 text-xs" : "top-1/2 -translate-y-1/2 text-base"} text-gray-500 transition-all pointer-events-none flex items-center`}
                            >
                              {key === "name" && (
                                <User className="w-5 h-5 mr-2" />
                              )}
                              {key === "email" && (
                                <Mail className="w-5 h-5 mr-2" />
                              )}
                              {key === "phone" && (
                                <Phone className="w-5 h-5 mr-2" />
                              )}
                              {key === "subject" && (
                                <MessageSquare className="w-5 h-5 mr-2" />
                              )}
                              <span>
                                {key === "name"
                                  ? "नाम"
                                  : key === "email"
                                    ? "ईमेल"
                                    : key === "phone"
                                      ? "फोन नंबर"
                                      : "विषय"}
                              </span>
                            </div>
                            <input
                              type={
                                key === "email"
                                  ? "email"
                                  : key === "phone"
                                    ? "tel"
                                    : "text"
                              }
                              name={key}
                              value={
                                formData[key as keyof typeof formData] as string
                              }
                              onChange={handleChange}
                              onFocus={() =>
                                handleFocus(key as keyof typeof focused)
                              }
                              onBlur={() =>
                                handleBlur(key as keyof typeof focused)
                              }
                              required
                              className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-5 ${focused[key as keyof typeof focused] ? "pt-8 pb-3" : "py-5"} text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-sm`}
                            />
                          </div>
                        ))}
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <div
                        className={`absolute left-5 ${focused.message ? "top-3 text-xs" : "top-7 text-base"} text-gray-500 transition-all pointer-events-none flex items-center`}
                      >
                        <MessageSquare className="w-5 h-5 mr-2" />
                        <span>संदेश</span>
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus("message")}
                        onBlur={() => handleBlur("message")}
                        rows={5}
                        required
                        className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-5 ${focused.message ? "pt-8 pb-3" : "pt-7 pb-3"} text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-sm`}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-10">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-medium text-lg px-12 py-4 rounded-xl flex items-center justify-center transition-all transform hover:scale-105 hover:shadow-xl ${loading ? "opacity-70 cursor-not-allowed" : ""} shadow-lg`}
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span>भेजा जा रहा है...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-6 h-6 mr-3" />
                            संदेश भेजें
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16"
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-orange-500" />
                  हमारा स्थान
                </h2>
                <div className="h-[500px] w-full rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6635726252367!2d77.22750081508564!3d28.63746488241679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f5!2sParliament%20of%20India!5e0!3m2!1sen!2sin!4v1625812574375!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    allowFullScreen={true}
                    loading="lazy"
                    className="rounded-xl"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}