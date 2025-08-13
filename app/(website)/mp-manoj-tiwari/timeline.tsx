"use client";

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Timeline() {
    // Language state
    const [language, setLanguage] = useState<'en' | 'hi'>('en');

    const careerMilestones = [
        {
            year: "2004",
            title: "Breakthrough in Cinema",
            description: "Took a role in the film \"Sasura Bada Paise Wala\", which turned US$ 65,000 production costs into US$ 3 million in takings."
        },
        {
            year: "2005",
            title: "Bhojpuri Superstar",
            description: "Became one of the two leading male stars in the Bhojpuri film industry, following up with successful films like Daroga Babu I Love You and Bandhan Tute Na."
        },
        {
            year: "2008",
            title: "International Recognition",
            description: "The Dutch government issued a 44 Euro-cent postal stamp on singer-actor Manoj Tiwari."
        },
        {
            year: "2009",
            title: "Political Entry",
            description: "Contested elections for the 15th Lok Sabha as a candidate for the Samajwadi Party in the Gorakhpur constituency."
        },
        {
            year: "2009",
            title: "Musical Innovation",
            description: "Released album 'Hey Mahadev' that fused traditional music with contemporary genres."
        },
        {
            year: "2011",
            title: "Social Activism",
            description: "Supported Ramdev's hunger strike and Anna Hazare's anti-corruption movement."
        },
        {
            year: "2014",
            title: "Electoral Success",
            description: "Won the North East Delhi (Lok Sabha constituency) in the Indian general elections from BJP."
        },
        {
            year: "2016",
            title: "BJP Delhi President",
            description: "Appointed as Delhi BJP President on November 30, 2016."
        }
    ];

    const hindiCareerMilestones = [
        {
            year: "2003",
            title: "फिल्म में पदार्पण",
            description: "फिल्म 'ससुरा बड़ा पैसा वाला' में अभिनय किया जो मनोरंजन और आर्थिक दृष्टि से बहुत सफल फिल्म साबित हुयी।"
        },
        {
            year: "2005",
            title: "भोजपुरी सुपरस्टार",
            description: "दो और फिल्मों 'दारोगा बाबू आई लव यू' और 'बंधन टूटे ना' में अभिनय किया और भोजपुरी सिनेमा के प्रमुख सितारों में शामिल हो गए।"
        },
        {
            year: "2008",
            title: "टेलीविज़न में प्रवेश",
            description: "टेलीविज़न कार्यक्रम 'चक दे बच्चे' में बतौर मेज़बान कार्य किया।"
        },
        {
            year: "2009",
            title: "राजनीति में पदार्पण",
            description: "गोरखपुर लोक सभा निर्वाचन क्षेत्र से समाजवादी पार्टी के उम्मीदवार के रूप में चुनाव लड़ा।"
        },
        {
            year: "2010",
            title: "रियलिटी शो में प्रवेश",
            description: "प्रतिभागी के तौर पर रियलिटी शो 'बिग बॉस' में हिस्सा लिया।"
        },
        {
            year: "2011",
            title: "सामाजिक आंदोलन",
            description: "बाबा रामदेव और अन्ना हज़ारे के भ्रष्टाचार विरोधी आंदोलन में सक्रिय रहे।"
        },
        {
            year: "2014",
            title: "चुनावी सफलता",
            description: "उत्तर पूर्वी दिल्ली लोक सभा निर्वाचन क्षेत्र से भारतीय जनता पार्टी के उम्मीदवार के रूप में चुनाव जीते।"
        },
        {
            year: "2016",
            title: "भाजपा दिल्ली अध्यक्ष",
            description: "दिल्ली प्रदेश भाजपा अध्यक्ष की जिम्मेदारी सौंपी गई।"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Title Section */}
            <section className="py-10 bg-gray-50 border-b">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Link href="/mp-manoj-tiwari" className="text-primary hover:underline mb-2 inline-block">
                            ← {language === 'en' ? 'Back to Profile' : 'प्रोफाइल पर वापस जाएं'}
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {language === 'en' ? 'Career Timeline' : 'करियर की समय रेखा'}
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {language === 'en' ? 
                                'Key milestones in Manoj Tiwari\'s journey from entertainment to politics' : 
                                'मनोज तिवारी की मनोरंजन से राजनीति तक की यात्रा के प्रमुख पड़ाव'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Career Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="max-w-4xl mx-auto">
                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/20"></div>

                                {/* Timeline Items */}
                                {(language === 'en' ? careerMilestones : hindiCareerMilestones).map((milestone, index) => (
                                    <motion.div
                                        key={index}
                                        className={`relative flex flex-col md:flex-row mb-12 ${
                                            index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                        }`}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-primary border-4 border-white shadow-md z-10"></div>
                                            <div className="text-sm font-bold mt-2 bg-primary text-white px-3 py-1 rounded-full">
                                                {milestone.year}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className={`w-full md:w-1/2 ${
                                            index % 2 === 0 ? 'md:pl-10 md:pr-16' : 'md:pr-10 md:pl-16'
                                        } pl-12 pt-2`}>
                                            <motion.div 
                                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-l-4 border-primary transition-shadow"
                                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                            >
                                                <h3 className="text-xl font-bold mb-2 text-gray-900">{milestone.title}</h3>
                                                <p className="text-gray-600">{milestone.description}</p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Language Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <button 
                    onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span className="font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
                </button>
            </div>
        </div>
    );
}