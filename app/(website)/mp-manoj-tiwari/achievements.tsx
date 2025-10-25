"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Star, ChevronRight, Trophy, Globe, Music, Film, Mic, Heart, Zap, Target } from 'lucide-react';
import Link from 'next/link';

const highlights = [
    "He won the North East Delhi (Lok Sabha constituency) in the 2014 Indian general elections from BJP",
    "He has sung more than 4,000 songs (Devotional, Patriotic, Social & Romantic) in Bhojpuri & Hindi languages",
    "He is a famous actor who has done 75 Bhojpuri films as a lead Actor and 2 Hindi films in last decade",
    "He has sung the famous song \"Jiya ho Bihar Ke Lala\" in a Bollywood Movie named Gangs of Wasseypur which was directed by Anurag Kashyap and was picturised on Manoj Vajpayee",
    "He has recieved numerous awards including \"Biggest Superstar of the Decade 2000-10\" in Bhojpuri world",
    "He was one of the member in 42 persons from Indian Film Industry who got awarded by our Honorable President of India on the occasion of 100 years of Indian Cinema",
    "He has featured in India Today Magazine list of 100 Powerful and influential personalities along with the likes of Amitabh Bachchan, A R Rehman and others from the film & music industry",
    "He has successfully shared screen with Superstars of Bollywood like Amitabh Bachchan, Salman Khan, Aamir Khan, Ajay Devgan, Mithun Chakrowarty, Jacky Shroff etc",
    "He has done Big TV Shows like BIG BOSS Season 4, Welcome - Baaji Mehman Nawazi ki, Savdhan India - UP Fights back",
    "He has done Singing Reality Shows like Chak De Bachche, Bharat Ki Shaan Season 2 & 3, Sur Sangram Season 1 & 2, Suron Ka Maha Sangram, Nehle Pe Dehla, Folk Jalwa etc",
    "He has sung \"SHRI HANUMAN CHALISA\" with Amitabh Bachchan and other 20 renowned playback singers & artists from the Indian Film Industry which was composed by Aadesh Shrivastava",
    "He has done more than 1,500 stage shows in India",
    "From last 10 years he is performing in Abroad in Surenaam, Mauritius, Thailand, Oman, Neitherland & Holland",
    "He is the only Bhojpuri Artist whose Stamp Ticket got published in Neitherland with his Photograph to shower the respect to the Indians",
    "He performs around the world in concert singing in a style that mixes Traditional Bhojpuri Folk Songs and modern era songs with a more contemporary sound & style",
    "He use to share that to enlarge our Tradition worldwide and to gain the respect for the public of Purvanchal was his one of the reason to join Politics and to support our Honourable Prime Minister of India Narendra Modi Ji",
    "He wants to spread the sweetness of Bhojpuri Music worldwide which needs your support and blessings"
];

const hindiHighlights = [
    "भोजपुरी और हिंदी भाषाओं में 4,000 से अधिक गीत (भक्ति, देशभक्ति, सामाजिक और रोमांटिक) गाया है।",
    "एक मुख्य अभिनेता के रूप में 75 भोजपुरी फिल्मों और पिछले एक दशक में दो हिंदी फिल्मों में काम किया है, जो एक प्रसिद्ध अभिनेता है।",
    "अनुराग कश्यप द्वारा निर्देशित किया गया था और मनोज वाजपेयी पर फिल्माया गया था, जो गैंग्स ऑफ बॉलीवुड की एक फिल्म का नाम दिया वासेपुर में प्रसिद्ध गीत 'जिया हो बिहार Ke लाला' गाया है।",
    "भोजपुरी दुनिया में 'द डिकेड 2000-10' के सबसे बड़े सुपरस्टार' सहित कई पुरस्कार प्राप्त हुआ है।",
    "भारतीय सिनेमा के 100 साल के अवसर पर भारत के हमारे माननीय राष्ट्रपति द्वारा सम्मानित किया गया है जो भारतीय फिल्म उद्योग से 42 व्यक्तियों में सदस्य में से एक था।",
    "फिल्म और संगीत उद्योग से अमिताभ बच्चन, एआर रहमान की पसंद और अन्य लोगों के साथ 100 शक्तिशाली और प्रभावशाली व्यक्तित्व के इंडिया टुडे पत्रिका की सूची में चित्रित किया गया है।",
    "अमिताभ बच्चन, सलमान खान, आमिर खान, अजय देवगन, मिथुन चक्रवाती, जैकी श्रॉफ जैसे बॉलीवुड के सुपरस्टार के साथ स्क्रीन साझा किया है।",
    "बिग बॉस सीजन 4, वेलकम, बाजी मेहमान नवाज़ी की, सावधान इंडिया -यू पी फाइट्स बैक जैसे बड़े टी वि शोस कर चुके है।",
    "चक दे ​​बच्चे, भारत की शान सीजन 2 और 3, सुर संग्राम सीजन 1 और 2, सुरों का महा संग्राम, नहले पे दहला, फ़ोल्क जलवा आदि रिएलिटी शोस में गायन कर चुके है।",
    "आदेश श्रीवास्तव द्वारा रचा गया था, जिसमें अमिताभ बच्चन और भारतीय फिल्म उद्योग से अन्य 20 प्रसिद्ध पार्श्व गायक व कलाकारों के साथ 'श्री हनुमान चालीसा' गाया है।",
    "मनोज तिवारी जी ने भारत में 1,500 से अधिक स्टेज शो किया है।",
    "पिछले 10 वर्षों से वह सुरेनाम, मॉरीशस, थाईलैंड, ओमान, नीदरलैंड और हॉलैंड विदेशों में प्रदर्शन कर रहे है।",
    "नीदरलैंड ने मनोज तिवारी जी की तस्वीर स्टाम्प टिकट पर प्रकाशित किया गया है केवल भोजपुरी कलाकार है जो भारतीयों का सम्मान को दिखाता है।",
    "एक और समकालीन ध्वनि और शैली के साथ पारंपरिक भोजपुरी लोक गीत और आधुनिक युग गीत घोल रहे है एक शैली में संगीत कार्यक्रम के गायन में दुनिया भर में प्रदर्शन करती है।",
    "दुनिया भर में और हमारी परंपरा विस्तार और साझा करना है।",
    "पूर्वांचल की जनता के सम्मान और लाभ के लिए उन्होंने राजनीती (पॉलिटिक्स) ज्वाइन किया है। हमारे माननीय प्रधानमंत्री नरेन्द्र मोदी जी के समर्थन करने के लिए।",
    "दुनिया भर में भोजपुरी संगीत की मिठास का प्रसार करना चाहते है उनके दौरे को आशीर्वाद और समर्थन की जरूरत है।"
];



export default function Achievements() {
    // Language state
    const [language, setLanguage] = useState<'en' | 'hi'>('en');
    
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">


            {/* Highlights Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {language === 'en' ? 'Highlights & Achievements' : 'मुख्य आकर्षण और उपलब्धियां'}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {language === 'en' ? 
                                'A journey of excellence across entertainment, politics, and cultural preservation' : 
                                'मनोरंजन, राजनीति और सांस्कृतिक संरक्षण में उत्कृष्टता की यात्रा'}
                        </p>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {(language === 'en' ? highlights : hindiHighlights).map((highlight, index) => {
                            // Different card styles based on index
                            const cardStyle = index % 4;
                            const icons = [Star, Award, Trophy, Heart, Zap, Target, Music, Film, Mic, Globe];
                            const IconComponent = icons[index % icons.length];
                            
                            if (cardStyle === 0) {
                                // Style 1: Horizontal card with left icon
                                return (
                                    <motion.div
                                        key={index}
                                        className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4 border-orange-500"
                                        variants={itemVariants}
                                        whileHover={{ 
                                            y: -6, 
                                            scale: 1.02,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-700 leading-relaxed">{highlight}</p>
                                            </div>
                                        </div>
                                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </motion.div>
                                );
                            } else if (cardStyle === 1) {
                                // Style 2: Vertical card with top icon
                                return (
                                    <motion.div
                                        key={index}
                                        className="group relative bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-200"
                                        variants={itemVariants}
                                        whileHover={{ 
                                            y: -6, 
                                            rotateY: 2,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className="text-center mb-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg mx-auto">
                                                <IconComponent className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed text-center">{highlight}</p>
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    </motion.div>
                                );
                            } else if (cardStyle === 2) {
                                // Style 3: Diagonal card with corner icon
                                return (
                                    <motion.div
                                        key={index}
                                        className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                                        variants={itemVariants}
                                        whileHover={{ 
                                            y: -6, 
                                            scale: 1.02,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 transform rotate-45 translate-x-8 -translate-y-8 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                                        <div className="absolute top-2 right-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                                                <IconComponent className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed relative z-10">{highlight}</p>
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                    </motion.div>
                                );
                            } else {
                                // Style 4: Hexagonal inspired card
                                return (
                                    <motion.div
                                        key={index}
                                        className="group relative bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100"
                                        variants={itemVariants}
                                        whileHover={{ 
                                            y: -6, 
                                            rotateZ: 1,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                                                    <IconComponent className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">{highlight}</p>
                                        </div>
                                    </motion.div>
                                );
                            }
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Political Career Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {language === 'en' ? 'Political Journey' : 'राजनीतिक यात्रा'}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {language === 'en' ? 
                                'From entertainment to politics - a transformative journey of leadership and service' : 
                                'मनोरंजन से राजनीति तक - नेतृत्व और सेवा की परिवर्तनकारी यात्रा'}
                        </p>
                    </motion.div>

                    <motion.div
                        className="max-w-5xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {language === 'en' ? (
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    {
                                        year: "2009",
                                        title: "First Political Venture",
                                        description: "Contested elections for the 15th Lok Sabha as a Samajwadi Party candidate in Gorakhpur constituency.",
                                        icon: Target,
                                        status: "attempt",
                                        color: "from-yellow-500 to-orange-500"
                                    },
                                    {
                                        year: "2011",
                                        title: "Anti-Corruption Movement",
                                        description: "Actively participated in Ramdev's hunger strike and Anna Hazare's anti-corruption movement.",
                                        icon: Heart,
                                        status: "movement",
                                        color: "from-blue-500 to-purple-500"
                                    },
                                    {
                                        year: "2014",
                                        title: "Historic Victory",
                                        description: "Won the North East Delhi Lok Sabha constituency from BJP, marking successful transition to politics.",
                                        icon: Trophy,
                                        status: "victory",
                                        color: "from-green-500 to-emerald-500"
                                    }
                                ].map((milestone, index) => (
                                    <motion.div
                                        key={index}
                                        className="group relative"
                                        variants={itemVariants}
                                        whileHover={{ 
                                            y: -8,
                                            scale: 1.02,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                                            {/* Header with gradient */}
                                            <div className={`bg-gradient-to-r ${milestone.color} p-6 relative overflow-hidden`}>
                                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-2 translate-x-2"></div>
                                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-2 -translate-x-2"></div>
                                                
                                                <div className="relative z-10 flex items-center justify-between">
                                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                                        <milestone.icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <span className="text-2xl font-bold text-white">{milestone.year}</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-800 mb-3">{milestone.title}</h3>
                                                <p className="text-gray-600 leading-relaxed mb-4">{milestone.description}</p>
                                                
                                                {/* Status badge */}
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${
                                                        milestone.status === 'victory' ? 'bg-green-500' : 
                                                        milestone.status === 'movement' ? 'bg-blue-500' : 'bg-yellow-500'
                                                    }`}></div>
                                                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                                        milestone.status === 'victory' ? 'bg-green-100 text-green-700' : 
                                                        milestone.status === 'movement' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {milestone.status === 'victory' ? 'Success' : 
                                                         milestone.status === 'movement' ? 'Movement' : 'Attempt'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Hover effect overlay */}
                                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    {
                                        year: "२००९",
                                        title: "पहला राजनीतिक प्रयास",
                                        description: "गोरखपुर लोक सभा निर्वाचन क्षेत्र से समाजवादी पार्टी के उम्मीदवार के रूप में १५वीं लोकसभा चुनाव में हिस्सा लिया।",
                                        icon: Target,
                                        status: "attempt",
                                        color: "from-yellow-500 to-orange-500"
                                    },
                                    {
                                        year: "२०११",
                                        title: "भ्रष्टाचार विरोधी आंदोलन",
                                        description: "रामलीला मैदान में रामदेव के अनशन और अन्ना हज़ारे के भ्रष्टाचार विरोधी आंदोलन में सक्रिय भागीदारी।",
                                        icon: Heart,
                                        status: "movement",
                                        color: "from-blue-500 to-purple-500"
                                    },
                                    {
                                        year: "२०१४",
                                        title: "ऐतिहासिक जीत",
                                        description: "भारतीय आम चुनावों में बीजेपी से उत्तर पूर्वी दिल्ली लोक सभा निर्वाचन क्षेत्र जीता।",
                                        icon: Trophy,
                                        status: "victory",
                                        color: "from-green-500 to-emerald-500"
                                    }
                                ].map((milestone, index) => (
                                    <motion.div
                                        key={index}
                                        className="group relative"
                                        variants={itemVariants}
                                        whileHover={{ 
                                            y: -8,
                                            scale: 1.02,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                                            {/* Header with gradient */}
                                            <div className={`bg-gradient-to-r ${milestone.color} p-6 relative overflow-hidden`}>
                                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-2 translate-x-2"></div>
                                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-2 -translate-x-2"></div>
                                                
                                                <div className="relative z-10 flex items-center justify-between">
                                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                                        <milestone.icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <span className="text-2xl font-bold text-white">{milestone.year}</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-800 mb-3">{milestone.title}</h3>
                                                <p className="text-gray-600 leading-relaxed mb-4">{milestone.description}</p>
                                                
                                                {/* Status badge */}
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${
                                                        milestone.status === 'victory' ? 'bg-green-500' : 
                                                        milestone.status === 'movement' ? 'bg-blue-500' : 'bg-yellow-500'
                                                    }`}></div>
                                                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                                        milestone.status === 'victory' ? 'bg-green-100 text-green-700' : 
                                                        milestone.status === 'movement' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {milestone.status === 'victory' ? 'सफलता' : 
                                                         milestone.status === 'movement' ? 'आंदोलन' : 'प्रयास'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Hover effect overlay */}
                                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Cricket Support Section - Only visible in Hindi */}
            <section className="py-16 bg-gray-50">
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
                            क्रिकेट का समर्थन
                        </motion.h2>

                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-md"
                            variants={itemVariants}
                        >
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                    <Trophy className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">क्रिकेट के प्रति जुनून</h3>
                            </div>

                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    मनोज तिवारी क्रिकेट के समर्थक हैं और इन्होंने बनारस हिन्दू विश्वविद्यालय की ओर से खेला भी है। अपने गृह-क्षेत्र में क्रिकेट को बढ़ावा देने के लिए तिवारी ने इंडियन प्रीमियर लीग में अपनी टोली बनाने की भी कोशिश की।
                                </p>
                                <p>
                                    वो बिहार क्रिकेट की कीर्ति आजाद एसोसिएशन से भी सम्बद्ध रहे हैं। उन्होने ये घोषणा की थी कि वो विश्व कप २०११ की विजेता टीम इंडिया को समर्पित एक मंदिर का निर्माण करवाएँगे।
                                </p>
                                <p>
                                    उन्होंने यह भी कहा है कि वो अपने गृह नगर के कैमूर जिले में एक विश्व स्तर के क्रिकेट स्टेडियम का निर्माण कराने की योजना बना रहे हैं।
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Entertainment Career Section */}
            <section className="py-16 bg-gray-50">
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
                            {language === 'en' ? 'Entertainment Career' : 'मनोरंजन करियर'}
                        </motion.h2>

                        {language === 'en' ? (
                            <motion.div
                                className="space-y-6 text-gray-700 leading-relaxed"
                                variants={itemVariants}
                            >
                                <p>
                                    Prior to Tiwari&apos;s involvement in cinema, he had spent ten years working as a singer.
                                </p>

                                <p>
                                    In 2004, he took a role in the film &quot;Sasura Bada Paise Wala&quot;. The BBC reported that the production costs of US$ 65,000 were turned into takings of US$ 3 million, while The Hindu reported a ₹ 3.5–4 billion cost resulting in takings of ₹45 million (US$670,000). Indian Express reported a figure of ₹65 million (US$970,000) as the takings. The Bihar Jharkhand Motion Picture Association saw this production as being a turning point for Bhojpuri cinema. He followed this with the successful films Daroga Babu I Love You and Bandhan Tute Na. Tiwari is reported to have said in 2005 that although the Bhojpuri genre had generally kept to its traditional storylines, &quot;Gone are the double entendres, thin story lines and poor technical quality. Films have been slick and producers are willing to put in close to Rs 8 million in a film because the returns are not bad.&quot;
                                </p>

                                <p>
                                    The BBC reported in 2005 that Tiwari was one of the biggest male stars in the flourishing Bhojpuri cinema market.
                                </p>

                                <p>
                                    Tiwari continues to record music and release new albums. He performs around the world in concert. He released an album, &quot;Hey Mahadev&quot;, in 2009 that fused traditional music with contemporary genres. He is listed as being music director for numerous releases. Manoj Tiwari also sang the hit song &quot;Jiya Ho Bihar Ke Lala Jiya Tu Haazar Sala&quot; in Anurag Kashyap&apos;s film &quot;Gangs of Wasseypur&quot;.
                                </p>

                                <p>
                                    In 2008, the Dutch government issued a 44 Euro-cent postal stamp on singer-actor Manoj Tiwari.
                                </p>

                            </motion.div>
                        ) : (
                            <motion.div
                                className="space-y-6 text-gray-700 leading-relaxed"
                                variants={itemVariants}
                            >
                                <p>
                                    फिल्मों में कार्य करने से पूर्व मनोज तिवारी ने तकरीबन दस साल भोजपुरी गायक के रूप में कार्य किया। सन २००३ में उन्होने फिल्म &aspos;ससुरा बड़ा पैसा वाला&aspos; में अभिनय किया जो मनोरंजन और आर्थिक दृष्टि से बहुत सफल फिल्म साबित हुयी और माना जाने लगा की भोजपुरी फिल्मों का नया मोड़ शुरू हो चुका है।
                                </p>

                                <p>
                                    इसके बाद उन्होने दो और फिल्मों &aspos;दारोगा बाबू आई लव यू&aspos; और &aspos;बंधन टूटे ना&aspos; नामक फिल्मों में अभिनय किया। मनोज तिवारी ने एक टेलीविज़न कार्यक्रम &quot;चक दे बच्चे&quot; में बतौर मेज़बान कार्य किया।
                                </p>

                                <p>
                                    सन २०१० में मनोज तिवारी ने प्रतिभागी के तौर पर रियलिटी शो &aspos;बीग बॉस&aspos; में हिस्सा लिया। उन्होने अनुराग कश्यप द्वारा निर्देशित फिल्म &aspos;गैंग्स ऑफ वासेपुर&aspos; के लिए एक लोकप्रिय गीत &aspos;जिय हो बिहार के लाला&aspos; भी गाया।
                                </p>

                                <p>
                                    मनोज तिवारी सन २०११ में बाबा रामदेव द्वारा रामलीला मैदान पर शुरू किए गए भ्रष्टाचार विरोधी आंदोलन और अन्ना आंदोलन में सक्रिय रहे। २००९ में मनोज तिवारी ने समाजवादी पार्टी की ओर से राजनीति में अपना भविष्य आज़माया था किन्तु असफल रहे थे। फिलहाल तिवारी बीजेपी की तरफ से राजनीति में सक्रिय हैं।
                                </p>

                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-4">फिल्मों में योगदान</h3>
                                    <p className="mb-2">अभिनेता से नेता बने मनोज तिवारी की कुछ चुनिन्दा भोजपुरी फिल्में निम्नवत हैं:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>ससुरा बड़ा पैसा वाला</li>
                                        <li>दारोगा बाबू आई लव यू</li>
                                        <li>बंधन टूटे ना</li>
                                        <li>कब अइबू अंगनवा हमार</li>
                                        <li>ऐ भऊजी के सिस्टर</li>
                                        <li>औरत खिलौना नहीं</li>
                                    </ul>
                                    <p className="mt-4">नोट-तिवारी ने २०१० में हिन्दी फिल्म &aspos;हैलो डार्लिंग&aspos; में बतौर निर्देशक कार्य किया है। इसके अलावा तिवारी नें भोजपुरी फिल्मों के गानो में संगीतकर और गीतकार की भूमिका भी निभाई है।</p>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-4">टेलीविज़न के क्षेत्र में योगदान</h3>
                                    <p className="mb-2">मनोज तिवारी ने छोटे पर्दे पर निम्नवत कार्य किया गया है:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>बिग बॉस सीजन-4, सन 2010 में (प्रतिभागी)</li>
                                        <li>सुर संगम सीजन-1 और सीजन-2 (होस्ट)</li>
                                        <li>नहले पे दहला (होस्ट)</li>
                                        <li>भारत की शान -संगीत प्रतियोगिता (होस्ट)</li>
                                        <li>चक दे बच्चे (होस्ट)</li>
                                        <li>वैलकम-बाज़ी मेहमान नवाजी की, सन 2013 में (प्रतिभागी)</li>
                                    </ul>
                                </div>

                                <div className="mt-8 text-center">
                                    <Link href="/mp-manoj-tiwari/filmography" className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        संपूर्ण फिल्मोग्राफी देखें
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 text-white relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {language === 'en' ? 'Career Milestones' : 'करियर के पड़ाव'}
                        </h2>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto">
                            {language === 'en' ? 
                                'Numbers that tell the story of dedication and success' : 
                                'संख्याएं जो समर्पण और सफलता की कहानी बताती हैं'}
                        </p>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            { number: "75+", label: language === 'en' ? 'Bhojpuri Films' : 'भोजपुरी फिल्में', icon: Film },
                            { number: "10+", label: language === 'en' ? 'TV Shows' : 'टेलीविज़न शो', icon: Mic },
                            { number: "20+", label: language === 'en' ? 'Music Albums' : 'संगीत एल्बम', icon: Music },
                            { number: "1500+", label: language === 'en' ? 'Stage Shows' : 'स्टेज शो', icon: Star }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center group"
                                variants={itemVariants}
                                whileHover={{ 
                                    scale: 1.05,
                                    rotateY: 5,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-300 overflow-hidden">
                                    {/* Animated background elements */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000" style={{transitionDelay: '0.2s'}}></div>
                                    
                                    {/* Icon */}
                                    <div className="mb-4">
                                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto group-hover:bg-white/30 transition-all duration-300">
                                            <stat.icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    
                                    {/* Number */}
                                    <div className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                                        {stat.number}
                                    </div>
                                    
                                    {/* Label */}
                                    <div className="text-white/90 text-lg font-medium group-hover:text-white transition-colors duration-300">
                                        {stat.label}
                                    </div>
                                    
                                    {/* Corner decoration */}
                                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Main Achievements Section */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {language === 'en' ? 'Major Achievements' : 'प्रमुख उपलब्धियां'}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {language === 'en' ? 
                                'Landmark accomplishments that define a legacy of excellence' : 
                                'उत्कृष्टता की विरासत को परिभाषित करने वाली महत्वपूर्ण उपलब्धियां'}
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                title: language === 'en' ? 'Bhojpuri Cinema Superstar' : 'भोजपुरी सिनेमा का सुपरस्टार',
                                description: language === 'en' ? 
                                    'Received numerous awards including "Biggest Superstar of the Decade 2000-10" in the Bhojpuri world.' : 
                                    'भोजपुरी दुनिया में "द डिकेड 2000-10" के सबसे बड़े सुपरस्टार सहित कई पुरस्कार प्राप्त किए हैं।',
                                icon: Award,
                                style: 'left'
                            },
                            {
                                title: language === 'en' ? '100 Years of Indian Cinema' : 'भारतीय सिनेमा के 100 साल',
                                description: language === 'en' ? 
                                    'Honored by the Honorable President of India on the occasion of 100 years of Indian Cinema.' : 
                                    'भारतीय सिनेमा के 100 साल के अवसर पर भारत के माननीय राष्ट्रपति द्वारा सम्मानित किया गया।',
                                icon: Trophy,
                                style: 'center'
                            },
                            {
                                title: language === 'en' ? 'India Today Influential List' : 'इंडिया टुडे की प्रभावशाली सूची',
                                description: language === 'en' ? 
                                    'Featured in India Today Magazine\'s list of 100 powerful and influential personalities alongside Amitabh Bachchan, A R Rahman and others.' : 
                                    'फिल्म और संगीत उद्योग से अमिताभ बच्चन, एआर रहमान की पसंद और अन्य लोगों के साथ 100 शक्तिशाली और प्रभावशाली व्यक्तित्व के इंडिया टुडे पत्रिका की सूची में शामिल।',
                                icon: Star,
                                style: 'right'
                            },
                            {
                                title: language === 'en' ? 'Netherlands Postal Stamp' : 'नीदरलैंड में डाक टिकट',
                                description: language === 'en' ? 
                                    'The Netherlands government issued a postal stamp featuring Manoj Tiwari - the only Bhojpuri artist to receive this honor.' : 
                                    'नीदरलैंड ने मनोज तिवारी जी की तस्वीर स्टाम्प टिकट पर प्रकाशित किया - वे एकमात्र भोजपुरी कलाकार हैं जिन्हें यह सम्मान मिला है।',
                                icon: Globe,
                                style: 'diagonal'
                            }
                        ].map((achievement, index) => (
                            <motion.div
                                key={index}
                                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100"
                                variants={itemVariants}
                                whileHover={{ 
                                    y: -8, 
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {/* Background pattern based on style */}
                                {achievement.style === 'left' && (
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
                                )}
                                {achievement.style === 'center' && (
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full"></div>
                                )}
                                {achievement.style === 'right' && (
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full translate-x-16 -translate-y-16"></div>
                                )}
                                {achievement.style === 'diagonal' && (
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-red-500/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
                                )}

                                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                            <achievement.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">
                                            {achievement.title}
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-8 relative z-10">
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {achievement.description}
                                    </p>
                                </div>
                                
                                {/* Hover effects */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Animated border */}
                                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-orange-500/20 transition-all duration-300"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* International Recognition */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="p-8">
                            <h2 className="text-3xl font-bold mb-6 text-center">अंतरराष्ट्रीय मान्यता</h2>

                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-orange-50 rounded-lg">
                                    <div className="w-24 h-24 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Award className="w-12 h-12 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">नीदरलैंड डाक टिकट</h3>
                                        <p className="text-gray-700">2008 में, नीदरलैंड सरकार ने गायक-अभिनेता मनोज तिवारी पर 44 यूरो-सेंट का डाक टिकट जारी किया, जो एक भोजपुरी कलाकार के लिए अभूतपूर्व सम्मान था।</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-orange-50 rounded-lg">
                                    <div className="w-24 h-24 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-12 h-12 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">अंतरराष्ट्रीय प्रदर्शन</h3>
                                        <p className="text-gray-700">पिछले 10 वर्षों से सुरेनाम, मॉरीशस, थाईलैंड, ओमान, नीदरलैंड और हॉलैंड जैसे देशों में प्रदर्शन कर रहे हैं, जिससे भोजपुरी संस्कृति का वैश्विक प्रसार हुआ है।</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}