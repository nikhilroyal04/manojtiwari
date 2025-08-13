"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Star, ChevronRight, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
            {/* Language Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <button 
                    onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span className="font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
                </button>
            </div>

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-orange-600 to-red-600 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <Image 
                        src="/images/achievements-bg.jpg" 
                        alt="Manoj Tiwari Achievements" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link href="/mp-manoj-tiwari" className="inline-flex items-center text-white/80 hover:text-white mb-4">
                                <span className="mr-2">मनोज तिवारी</span>
                                <span className="mx-2">›</span>
                                <span>उपलब्धियां</span>
                            </Link>
                            
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                {language === 'en' ? 'Achievements & Honors' : 'उपलब्धियां और सम्मान'}
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto">
                                {language === 'en' ? 
                                    'Notable achievements and honors in Manoj Tiwari\'s remarkable career' : 
                                    'मनोज तिवारी जी के शानदार करियर की प्रमुख उपलब्धियां और सम्मान'}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            {language === 'en' ? 'Highlights & Achievements' : 'मुख्य आकर्षण और उपलब्धियां'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(language === 'en' ? highlights : hindiHighlights).map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow-md"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                >
                                    <div className="flex">
                                        <div className="mr-4 flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Star className="w-4 h-4 text-primary" />
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{highlight}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Political Career Section */}
            <section className="py-16 bg-white">
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
                            {language === 'en' ? 'Political Career' : 'राजनीतिक करियर'}
                        </motion.h2>

                        {language === 'en' ? (
                            <motion.div
                                className="space-y-6 text-gray-700 leading-relaxed"
                                variants={itemVariants}
                            >
                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                                    <p>
                                        In 2009, Tiwari contested elections for the 15th Lok Sabha as a candidate for the Samajwadi Party in the Gorakhpur constituency. He had been offered a choice of three constituencies and Zeenews reported him as saying that he was not &quot;a political person but was concerned for the development of Poorvanchal region of Uttar Pradesh.&quot; His interest was in developing that region and he had &quot;submitted my development proposals to industrialist Anil Ambani.&quot; He lost to Adityanath Yogi.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                                    <p>
                                        His house in Mumbai was allegedly attacked in November 2009 by a group of people angry with remarks that they claimed he had made about Shiv Sena. Tiwari denied having made any comment on the matter, which revolved around a dispute between the Shiv Sena leader, Bal Thackeray, and the Indian cricketer Sachin Tendulkar.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                                    <p>
                                        In January 2011 Mid-Day reported that the BJP might invite him to join their party and that the association with him would assist their electoral efforts among North Indians. Tiwari dismissed the story as being hypothetical, although he would consider his options should an invitation emerge. He had been seen with BJP leaders at an event and had expressed admiration for Shatrughan Sinha, the BJP MP for Patna.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                                    <p>
                                        Tiwari was among the first celebrities to make an appearance in support of Ramdev&apos;s hunger strike at the Ramlila Ground protests on 4 June 2011. He sang various patriotic songs to the gathered protestors and claimed that he had ceased filming for a month in order to join the protest. In August of that year he was involved in protests surrounding the arrest of Anna Hazare, of whose popular anti-corruption movement he approved.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-secondary">
                                    <p className="font-semibold">
                                        He won the North East Delhi (Lok Sabha constituency) in the 2014 Indian general elections from BJP.
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="space-y-6 text-gray-700 leading-relaxed"
                                variants={itemVariants}
                            >
                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                                    <p>
                                        सन २००९ में मनोज तिवारी ने गोरखपुर लोक सभा निर्वाचन क्षेत्र से १५वीं लोकसभा चुनाव में बतौर समाजवादी पार्टी उम्मीदवार हिस्सा लिया किन्तु भारतीय जनता पार्टी के उम्मीदवार योगी आदित्यनाथ से चुनाव हार गए।
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                                    <p>
                                        मनोज तिवारी अगस्त महीने में अन्ना हज़ारे द्वारा शुरू किए गए भ्रष्टाचार विरोधी अभियान में भी सक्रिय रहे।
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-secondary">
                                    <p className="font-semibold">
                                        सन २०१४ के आम चुनावों में मनोज तिवारी उत्तर पूर्वी दिल्ली लोक सभा निर्वाचन क्षेत्र से भारतीय जनता पार्टी के उम्मीदवार घोषित किए गए और चुनाव जीत गए।
                                    </p>
                                </div>
                            </motion.div>
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

                                <div className="mt-8 text-center">
                                    <Link href="/mp-manoj-tiwari/filmography" className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        View Complete Filmography
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Link>
                                </div>
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
            <section className="py-10 bg-gradient-to-r from-orange-500 to-red-600 text-white relative">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <motion.div
                            className="p-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="text-4xl md:text-5xl font-bold mb-2">75+</div>
                            <div className="text-white/80">भोजपुरी फिल्में</div>
                        </motion.div>
                        <motion.div
                            className="p-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
                            <div className="text-white/80">टेलीविज़न शो</div>
                        </motion.div>
                        <motion.div
                            className="p-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
                            <div className="text-white/80">संगीत एल्बम</div>
                        </motion.div>
                        <motion.div
                            className="p-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="text-4xl md:text-5xl font-bold mb-2">1500+</div>
                            <div className="text-white/80">स्टेज शो</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Achievements Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-bold mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        प्रमुख उपलब्धियां
                    </motion.h2>

                    <motion.div
                        className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                            variants={itemVariants}
                        >
                            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3">भोजपुरी सिनेमा का सुपरस्टार</h3>
                                <p className="text-gray-700">भोजपुरी दुनिया में &quot;द डिकेड 2000-10&quot; के सबसे बड़े सुपरस्टार सहित कई पुरस्कार प्राप्त किए हैं।</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                            variants={itemVariants}
                        >
                            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3">भारतीय सिनेमा के 100 साल</h3>
                                <p className="text-gray-700">भारतीय सिनेमा के 100 साल के अवसर पर भारत के माननीय राष्ट्रपति द्वारा सम्मानित किया गया।</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                            variants={itemVariants}
                        >
                            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3">इंडिया टुडे की प्रभावशाली व्यक्तित्व सूची</h3>
                                <p className="text-gray-700">फिल्म और संगीत उद्योग से अमिताभ बच्चन, एआर रहमान की पसंद और अन्य लोगों के साथ 100 शक्तिशाली और प्रभावशाली व्यक्तित्व के इंडिया टुडे पत्रिका की सूची में शामिल।</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                            variants={itemVariants}
                        >
                            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3">नीदरलैंड में डाक टिकट</h3>
                                <p className="text-gray-700">नीदरलैंड ने मनोज तिवारी जी की तस्वीर स्टाम्प टिकट पर प्रकाशित किया - वे एकमात्र भोजपुरी कलाकार हैं जिन्हें यह सम्मान मिला है।</p>
                            </div>
                        </motion.div>
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