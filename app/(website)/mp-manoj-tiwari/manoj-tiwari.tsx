"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Music, Film, Tv, Users, Calendar, MapPin, Star, Globe, Trophy } from 'lucide-react';

export default function ManojTiwari() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

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

  const films = [
    { year: "2004", title: "Sasura Bada Paisawala" },
    { year: "2005", title: "Bandan Tute na" },
    { year: "2005", title: "Daroga Babu I love you" },
    { year: "2005", title: "Damad ji" },
    { year: "2006", title: "Hamka maphi deido" },
    { year: "2006", title: "Dhartiputra" },
    { year: "2006", title: "Dehatibabu" },
    { year: "2006", title: "Dharti Kahe Pukar Ke" },
    { year: "2007", title: "Naihar ke Maro piya ke chunari" },
    { year: "2008", title: "Deshdrohi (Bollywood)" },
    { year: "2015", title: "Andha Kanun" },
    { year: "2015", title: "Yadav Ji Pan Wale" },
    { title: "Balma 420" },
    { title: "Mard no.-1" },
    { title: "Pyar ke bandhan" },
    { title: "Kab Aiabu aganba hamar" },
    { title: "Bhaiya Hamar" },
    { title: "Ranbhumi" },
    { title: "Bhojpuriya Don" },
    { title: "International Daroga" },
    { title: "Hum hai khalnayak" },
    { title: "Tu Hamae Hau" },
    { title: "Janam Janam ke Sath" },
    { title: "Purab" },
    { title: "Mangalsutra" },
    { title: "Gobar Singh" },
    { title: "Bhaiya Hamar Bara Dayaban" },
    { title: "Insaaf" },
    { title: "Ye Bhauji ke sister" },
    { title: "Pappu ke pyar ho gail" },
    { title: "Chotka Bhaiya Jindabad" },
    { title: "Munna Pandey Berojgar" },
    { title: "Hanuman bhakt Hawaldar" },
    { title: "Bhole Shankar" },
    { title: "Ganga" },
    { title: "Gangotri" },
    { title: "Saugandh" },
    { title: "Ganga Jamuna Sarswati" },
    { title: "Devra Bhail Deewana" },
    { title: "Aurat khilauna nahi" },
    { title: "Daroga ji Chori Hogail" },
    { title: "Ego chuma deda raja ji" },
    { title: "Raja thakur" },
    { title: "Chhotka Bhaiya Jindabad" },
    { title: "Parmveer Parshuram" }
  ];

  const tvShows = [
    { year: "2008", title: "Chak de bachche", role: "Host" },
    { year: "2010", title: "Bigg Boss 4", role: "Himself" },
    { title: "Sur Sangram (season 1 & 2)", role: "Host" },
    { title: "Nehle Pe Dehla", role: "Host" },
    { title: "Bharat Ki Shaan: Singing Star (Season 2)", role: "Host" },
    { year: "2013", title: "Welcome - Baazi Mehmaan-Nawaazi ki", role: "Himself" }
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

      {/* Career Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              {language === 'en' ? 'Career Journey' : 'करियर यात्रा'}
            </h2>
            
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
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white"></div>
                    
                    {/* Content */}
                    <div className={`w-full md:w-1/2 ${
                      index % 2 === 0 ? 'md:pl-8 md:pr-16' : 'md:pr-8 md:pl-16'
                    } pl-8`}>
                      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-3">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
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
      {language === 'hi' && (
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
      )}

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
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filmography Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">
              {language === 'en' ? 'Filmography' : 'फिल्मोग्राफी'}
            </h2>
            
            <div className="max-w-5xl mx-auto">
              {/* Films */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Film className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">
                    {language === 'en' ? 'Films' : 'फिल्में'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {films.map((film, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <h4 className="font-medium text-gray-900">{film.title}</h4>
                      {film.year && <p className="text-sm text-primary">{film.year}</p>}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* TV Shows */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Tv className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">
                    {language === 'en' ? 'Television' : 'टेलीविज़न'}
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left">
                          {language === 'en' ? 'Programme' : 'कार्यक्रम'}
                        </th>
                        <th className="py-3 px-4 text-left">
                          {language === 'en' ? 'Year' : 'वर्ष'}
                        </th>
                        <th className="py-3 px-4 text-left">
                          {language === 'en' ? 'Role' : 'भूमिका'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {tvShows.map((show, index) => (
                        <motion.tr 
                          key={index}
                          className="hover:bg-gray-50"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <td className="py-3 px-4 font-medium">{show.title}</td>
                          <td className="py-3 px-4 text-primary">{show.year || "-"}</td>
                          <td className="py-3 px-4">
                            {language === 'en' ? show.role : 
                              show.role === 'Host' ? 'होस्ट' : 
                              show.role === 'Himself' ? 'स्वयं' : show.role
                            }
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}   