"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Share2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'next/navigation';

// Sample rally posts data (same as in chunavi-railayan.tsx)
const rallyPosts = [
  {
    id: 1,
    title: "सेयदराजा विधानसभा भाजपा प्रत्याशी श्री सुशील सिंह जी के लिए रोड शो",
    description: "सेयदराजा विधानसभा भाजपा प्रत्याशी श्री सुशील सिंह जी के लिए रोड शो कर भाजपा के पक्ष में मतदान करने का आग्रह करते हैं",
    date: "2022-06-25",
    location: "सेयदराजा विधानसभा",
    state: "उत्तर प्रदेश",
    images: [
      "/images/chunavi-railayan/rally1-1.jpg",
      "/images/chunavi-railayan/rally1-2.jpg",
      "/images/chunavi-railayan/rally1-3.jpg"
    ],
    mainImage: "/images/chunavi-railayan/rally1-main.jpg",
    fullDescription: "सेयदराजा विधानसभा में भाजपा प्रत्याशी श्री सुशील सिंह जी के लिए आज एक भव्य रोड शो का आयोजन किया गया। इस रोड शो में हजारों की संख्या में स्थानीय नागरिक और भाजपा कार्यकर्ता शामिल हुए। मनोज तिवारी जी ने अपने संबोधन में कहा कि भाजपा सरकार ने पिछले 5 वर्षों में क्षेत्र के विकास के लिए अनेक महत्वपूर्ण कदम उठाए हैं। उन्होंने लोगों से भाजपा के पक्ष में मतदान करने का आग्रह किया ताकि विकास की यह गति निरंतर जारी रहे। रोड शो के दौरान मनोज तिवारी जी ने स्थानीय लोगों से मुलाकात की और उनकी समस्याओं को सुना। उन्होंने आश्वासन दिया कि भाजपा सरकार बनने पर इन समस्याओं का समाधान प्राथमिकता से किया जाएगा।"
  },
  {
    id: 2,
    title: "आसनसोल लोकसभा उपनिर्वाचन बिजेपि मनोनीत प्रार्थी श्रीमती",
    description: "आसनसोल लोकसभा उपनिर्वाचन बिजेपि मनोनीत प्रार्थी श्रीमती paulagnimitra1 'র প্রচারে উপস্থিত ছিলেন সাংসদ ও বিজেপি নেতা",
    date: "2022-04-04",
    location: "आसनसोल",
    state: "पश्चिम बंगाल",
    images: [
      "/images/chunavi-railayan/rally2-1.jpg",
      "/images/chunavi-railayan/rally2-2.jpg"
    ],
    mainImage: "/images/chunavi-railayan/rally2-main.jpg",
    fullDescription: "आसनसोल लोकसभा उपनिर्वाचन में बिजेपि मनोनीत प्रार्थी श्रीमती पौला घोष के समर्थन में आज एक विशाल जनसभा का आयोजन किया गया। इस जनसभा में मनोज तिवारी जी के साथ-साथ कई वरिष्ठ भाजपा नेता और सांसद उपस्थित थे। मनोज तिवारी जी ने अपने संबोधन में कहा कि पश्चिम बंगाल में भाजपा की सरकार बनना अत्यंत आवश्यक है ताकि राज्य में विकास की नई गति प्रारंभ हो सके। उन्होंने आसनसोल की जनता से श्रीमती पौला घोष के पक्ष में मतदान करने की अपील की और कहा कि उनके नेतृत्व में आसनसोल का समग्र विकास संभव होगा। जनसभा में बड़ी संख्या में स्थानीय नागरिकों ने भाग लिया और भाजपा के समर्थन में नारे लगाए।"
  },
  {
    id: 3,
    title: "श्री मनोज तिवारी जी का सोनभद्र में विशाल जनसभा!",
    description: "सोनभद्र में आयोजित विशाल जनसभा में मनोज तिवारी जी ने भाजपा के विकास कार्यों पर प्रकाश डाला और क्षेत्र के विकास के लिए नई योजनाओं की घोषणा की।",
    date: "2022-03-15",
    location: "सोनभद्र",
    state: "उत्तर प्रदेश",
    images: [
      "/images/chunavi-railayan/rally3-1.jpg",
      "/images/chunavi-railayan/rally3-2.jpg",
      "/images/chunavi-railayan/rally3-3.jpg"
    ],
    mainImage: "/images/chunavi-railayan/rally3-main.jpg",
    fullDescription: "सोनभद्र में आयोजित विशाल जनसभा में मनोज तिवारी जी ने भाजपा के विकास कार्यों पर प्रकाश डाला और क्षेत्र के विकास के लिए नई योजनाओं की घोषणा की। उन्होंने कहा कि सोनभद्र उत्तर प्रदेश का एक महत्वपूर्ण औद्योगिक केंद्र है और यहां के विकास से पूरे प्रदेश का विकास जुड़ा हुआ है। मनोज तिवारी जी ने सोनभद्र में नए उद्योग स्थापित करने और स्थानीय युवाओं को रोजगार देने की योजनाओं का उल्लेख किया। उन्होंने क्षेत्र की जनता से भाजपा को समर्थन देने की अपील की ताकि विकास कार्य निरंतर जारी रह सकें। जनसभा में बड़ी संख्या में स्थानीय नागरिक और भाजपा कार्यकर्ता उपस्थित थे। मनोज तिवारी जी ने अपने भाषण के बाद स्थानीय नेताओं और कार्यकर्ताओं से मुलाकात की और उनके सुझावों को सुना।"
  },
  {
    id: 4,
    title: "गोरखपुर में भव्य रोड शो",
    description: "गोरखपुर में आयोजित भव्य रोड शो में हजारों लोगों ने भाग लिया। मनोज तिवारी जी ने भाजपा के विकास एजेंडे पर जोर दिया और क्षेत्र के विकास के लिए अपनी प्रतिबद्धता दोहराई।",
    date: "2022-02-20",
    location: "गोरखपुर",
    state: "उत्तर प्रदेश",
    images: [
      "/images/chunavi-railayan/rally4-1.jpg",
      "/images/chunavi-railayan/rally4-2.jpg"
    ],
    mainImage: "/images/chunavi-railayan/rally4-main.jpg",
    fullDescription: "गोरखपुर में आयोजित भव्य रोड शो में हजारों लोगों ने भाग लिया। मनोज तिवारी जी ने भाजपा के विकास एजेंडे पर जोर दिया और क्षेत्र के विकास के लिए अपनी प्रतिबद्धता दोहराई। उन्होंने कहा कि गोरखपुर उत्तर प्रदेश का एक महत्वपूर्ण शहर है और यहां के विकास से पूरे पूर्वांचल का विकास जुड़ा हुआ है। मनोज तिवारी जी ने गोरखपुर में नए मेडिकल कॉलेज, एम्स और अन्य विकास परियोजनाओं का उल्लेख किया जो भाजपा सरकार के कार्यकाल में शुरू हुए हैं। उन्होंने क्षेत्र की जनता से भाजपा को समर्थन देने की अपील की ताकि विकास कार्य निरंतर जारी रह सकें। रोड शो के दौरान मनोज तिवारी जी ने स्थानीय लोगों से मुलाकात की और उनकी समस्याओं को सुना। उन्होंने आश्वासन दिया कि भाजपा सरकार बनने पर इन समस्याओं का समाधान प्राथमिकता से किया जाएगा।"
  },
  {
    id: 5,
    title: "पूर्वांचल के विकास के लिए जनसभा",
    description: "पूर्वांचल के विकास के लिए आयोजित जनसभा में मनोज तिवारी जी ने क्षेत्र के लिए विशेष पैकेज की मांग की और स्थानीय समस्याओं के समाधान के लिए केंद्र सरकार की योजनाओं पर प्रकाश डाला।",
    date: "2022-01-10",
    location: "वाराणसी",
    state: "उत्तर प्रदेश",
    images: [
      "/images/chunavi-railayan/rally5-1.jpg",
      "/images/chunavi-railayan/rally5-2.jpg",
      "/images/chunavi-railayan/rally5-3.jpg"
    ],
    mainImage: "/images/chunavi-railayan/rally5-main.jpg",
    fullDescription: "पूर्वांचल के विकास के लिए वाराणसी में आयोजित जनसभा में मनोज तिवारी जी ने क्षेत्र के लिए विशेष पैकेज की मांग की और स्थानीय समस्याओं के समाधान के लिए केंद्र सरकार की योजनाओं पर प्रकाश डाला। उन्होंने कहा कि वाराणसी प्रधानमंत्री नरेंद्र मोदी जी का संसदीय क्षेत्र है और यहां के विकास से पूरे पूर्वांचल का विकास जुड़ा हुआ है। मनोज तिवारी जी ने वाराणसी में काशी विश्वनाथ कॉरिडोर, गंगा घाटों का पुनरुद्धार और अन्य विकास परियोजनाओं का उल्लेख किया जो भाजपा सरकार के कार्यकाल में पूरे हुए हैं। उन्होंने क्षेत्र की जनता से भाजपा को समर्थन देने की अपील की ताकि विकास कार्य निरंतर जारी रह सकें। जनसभा में बड़ी संख्या में स्थानीय नागरिक और भाजपा कार्यकर्ता उपस्थित थे। मनोज तिवारी जी ने अपने भाषण के बाद स्थानीय नेताओं और कार्यकर्ताओं से मुलाकात की और उनके सुझावों को सुना।"
  }
];

export default function ChunaviRailayanPostPage() {
  const params = useParams();
  const post = rallyPosts.find(p => p.id == parseInt(params.id as string));
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">पोस्ट नहीं मिला</h1>
          <Link href="/chunavi-railayan" className="text-primary hover:underline">
            चुनावी रैलियां पर वापस जाएं
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src={post.mainImage} 
            alt={post.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/chunavi-railayan" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 bg-black/20 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            चुनावी रैलियां पर वापस जाएं
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{post.location}, {post.state}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">विवरण:</h2>
              <p className="text-gray-700 mb-8 text-lg">{post.description}</p>
              
              <h2 className="text-2xl font-bold mb-4">विस्तृत जानकारी:</h2>
              <div className="text-gray-700 mb-8 space-y-4 text-lg">
                {post.fullDescription.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <h2 className="text-2xl font-bold mb-4">फोटो गैलरी:</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {post.images.map((image, index) => (
                  <div 
                    key={index}
                    className="aspect-square relative rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setLightboxOpen(true);
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${post.title} - ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center border-t pt-6">
                <div className="text-gray-500">
                  स्थान: <span className="font-medium text-primary">{post.location}, {post.state}</span>
                </div>
                <button className="flex items-center gap-2 text-primary hover:text-primary/80">
                  <Share2 className="w-5 h-5" />
                  शेयर करें
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">अन्य चुनावी रैलियां</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rallyPosts
              .filter(p => p.id !== post?.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link 
                  href={`/chunavi-railayan/${relatedPost.id}`} 
                  key={relatedPost.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.mainImage}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <div className="text-sm text-gray-500">
                      {new Date(relatedPost.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl max-h-[80vh]">
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative h-full w-full flex items-center justify-center">
              <Image
                src={post.images[currentImageIndex]}
                alt={`${post.title} - ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>
            
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <button 
                className="bg-black/50 p-3 rounded-full hover:bg-black/70 text-white"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <button 
                className="bg-black/50 p-3 rounded-full hover:bg-black/70 text-white"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              {currentImageIndex + 1} / {post.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 