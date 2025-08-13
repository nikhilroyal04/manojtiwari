"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Share2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'next/navigation';  

// Sample janta darbar posts data (same as in janta-darbar.tsx)
const jantaDarbarPosts = [
  {
    id: 1,
    title: "बच्चों के चेहरे पर मुस्कान देख कर मन प्रफुल्लित हो गया",
    agenda: "अपने आवासीय कार्यालय में बच्चों से मिला, बच्चों के चेहरे पर मुस्कान थी, बच्चों की अपने शहर प्रति, अपने देश के प्रति कर्तव्य, अपने देश के प्रधानमंत्री में विश्वास, स्वछता को लेकर Positive Attitude ये सब भाव देख कर मन प्रफुल्लित हो",
    date: "Saturday, July 20, 2019 - 11:45",
    status: "CLOSE",
    location: "North East Delhi",
    images: [
      "/images/janta-darbar/jd1-1.jpg",
      "/images/janta-darbar/jd1-2.jpg",
      "/images/janta-darbar/jd1-3.jpg"
    ],
    mainImage: "/images/janta-darbar/jd1-main.jpg",
    description: "आज अपने आवासीय कार्यालय में बच्चों से मिला। बच्चों के चेहरे पर मुस्कान देखकर मन प्रफुल्लित हो गया। इन बच्चों में अपने शहर के प्रति, अपने देश के प्रति कर्तव्य, अपने देश के प्रधानमंत्री में विश्वास और स्वच्छता को लेकर सकारात्मक दृष्टिकोण देखने को मिला। बच्चों के साथ विभिन्न विषयों पर चर्चा की और उनके सवालों के जवाब दिए। उन्होंने अपनी शिक्षा और भविष्य के लक्ष्यों के बारे में बताया। बच्चों की प्रतिभा और उत्साह देखकर बहुत खुशी हुई। हमारे देश का भविष्य इन बच्चों के हाथों में सुरक्षित है।"
  },
  {
    id: 2,
    title: "जनता दरबार में लोगों की समस्याओं का समाधान",
    agenda: "आज के जनता दरबार में क्षेत्र के नागरिकों की समस्याओं को सुना और संबंधित अधिकारियों को तुरंत समाधान के निर्देश दिए। जल आपूर्ति, सड़क मरम्मत और स्वच्छता से जुड़े मुद्दों पर विशेष ध्यान दिया गया।",
    date: "Monday, August 12, 2019 - 10:30",
    status: "CLOSE",
    location: "North East Delhi",
    images: [
      "/images/janta-darbar/jd2-1.jpg",
      "/images/janta-darbar/jd2-2.jpg"
    ],
    mainImage: "/images/janta-darbar/jd2-main.jpg",
    description: "आज के जनता दरबार में क्षेत्र के नागरिकों ने बड़ी संख्या में भाग लिया। लोगों ने अपनी विभिन्न समस्याएँ रखीं जिनमें जल आपूर्ति, सड़क मरम्मत, स्वच्छता और बिजली से जुड़े मुद्दे प्रमुख थे। हमने सभी समस्याओं को गंभीरता से सुना और संबंधित अधिकारियों को तुरंत समाधान के निर्देश दिए। विशेष रूप से त्रिलोकपुरी क्षेत्र में जल आपूर्ति की समस्या को प्राथमिकता से हल करने का आश्वासन दिया गया। साथ ही कालकाजी मार्ग की सड़क मरम्मत के लिए तत्काल कार्रवाई के निर्देश दिए गए। स्वच्छता अभियान को और मजबूत करने के लिए अतिरिक्त संसाधन उपलब्ध कराने का निर्णय लिया गया।"
  },
  {
    id: 3,
    title: "युवाओं के साथ संवाद कार्यक्रम",
    agenda: "आज के जनता दरबार में युवाओं के साथ विशेष संवाद कार्यक्रम आयोजित किया गया। युवाओं ने शिक्षा, रोजगार और कौशल विकास से जुड़े अपने विचार साझा किए। सभी युवाओं को सरकार की विभिन्न योजनाओं के बारे में जानकारी दी गई।",
    date: "Wednesday, September 18, 2019 - 12:00",
    status: "CLOSE",
    location: "North East Delhi",
    images: [
      "/images/janta-darbar/jd3-1.jpg",
      "/images/janta-darbar/jd3-2.jpg",
      "/images/janta-darbar/jd3-3.jpg"
    ],
    mainImage: "/images/janta-darbar/jd3-main.jpg",
    description: "आज के जनता दरबार में युवाओं के साथ एक विशेष संवाद कार्यक्रम आयोजित किया गया। इस कार्यक्रम में बड़ी संख्या में युवाओं ने भाग लिया और शिक्षा, रोजगार और कौशल विकास से जुड़े अपने विचार साझा किए। युवाओं ने अपनी शिक्षा और करियर से जुड़ी चुनौतियों के बारे में बताया और सरकार से अधिक सहायता की मांग की। हमने सभी युवाओं को सरकार की विभिन्न योजनाओं जैसे प्रधानमंत्री कौशल विकास योजना, स्टार्टअप इंडिया और स्टैंड अप इंडिया के बारे में विस्तार से जानकारी दी। साथ ही, क्षेत्र में एक कौशल विकास केंद्र स्थापित करने का प्रस्ताव भी रखा गया, जिसे युवाओं ने बहुत सराहा।"
  },
  {
    id: 4,
    title: "महिला सशक्तिकरण पर विशेष चर्चा",
    agenda: "आज के जनता दरबार में महिला सशक्तिकरण पर विशेष चर्चा की गई। महिलाओं ने अपनी समस्याएं और सुझाव साझा किए। महिला स्वयं सहायता समूहों को प्रोत्साहन देने और महिलाओं के लिए रोजगार के अवसर बढ़ाने पर जोर दिया गया।",
    date: "Friday, October 25, 2019 - 11:00",
    status: "CLOSE",
    location: "North East Delhi",
    images: [
      "/images/janta-darbar/jd4-1.jpg",
      "/images/janta-darbar/jd4-2.jpg"
    ],
    mainImage: "/images/janta-darbar/jd4-main.jpg",
    description: "आज के जनता दरबार में महिला सशक्तिकरण पर विशेष चर्चा की गई। बड़ी संख्या में महिलाओं ने इस कार्यक्रम में भाग लिया और अपनी समस्याएं और सुझाव साझा किए। महिलाओं ने सुरक्षा, स्वास्थ्य, शिक्षा और रोजगार से जुड़े मुद्दों पर अपनी चिंताएं व्यक्त कीं। हमने महिला स्वयं सहायता समूहों को प्रोत्साहन देने और महिलाओं के लिए रोजगार के अवसर बढ़ाने पर विशेष जोर दिया। साथ ही, महिला सुरक्षा के लिए नई पहल की घोषणा की गई, जिसमें सीसीटीवी कैमरे लगाने और महिला पुलिस गश्त बढ़ाने का प्रावधान है। महिला स्वास्थ्य के लिए नियमित स्वास्थ्य शिविर लगाने का भी निर्णय लिया गया।"
  },
  {
    id: 5,
    title: "स्वच्छता अभियान के साथ जनता दरबार",
    agenda: "आज के जनता दरबार के साथ क्षेत्र में स्वच्छता अभियान भी चलाया गया। स्थानीय निवासियों और स्वयंसेवकों ने बढ़-चढ़कर हिस्सा लिया। स्वच्छ भारत मिशन के तहत लोगों को जागरूक किया गया और सफाई के महत्व पर प्रकाश डाला गया।",
    date: "Sunday, November 10, 2019 - 09:30",
    status: "CLOSE",
    location: "North East Delhi",
    images: [
      "/images/janta-darbar/jd5-1.jpg",
      "/images/janta-darbar/jd5-2.jpg",
      "/images/janta-darbar/jd5-3.jpg"
    ],
    mainImage: "/images/janta-darbar/jd5-main.jpg",
    description: "आज के जनता दरबार के साथ क्षेत्र में एक विशेष स्वच्छता अभियान भी चलाया गया। इस अभियान में स्थानीय निवासियों और स्वयंसेवकों ने बढ़-चढ़कर हिस्सा लिया। स्वच्छ भारत मिशन के तहत लोगों को जागरूक किया गया और सफाई के महत्व पर प्रकाश डाला गया। हमने सभी निवासियों से अपने आसपास के क्षेत्र को साफ रखने और प्लास्टिक के उपयोग को कम करने का आग्रह किया। साथ ही, क्षेत्र में नियमित रूप से सफाई अभियान चलाने और कूड़ा प्रबंधन को बेहतर बनाने के लिए एक विस्तृत योजना पर चर्चा की गई। इस अवसर पर स्कूली बच्चों ने भी स्वच्छता से जुड़े नुक्कड़ नाटक प्रस्तुत किए और लोगों को जागरूक किया।"
  }
];

export default function JantaDarbarPostPage() {
  const params = useParams();
  const post = jantaDarbarPosts.find(p => p.id == parseInt(params.id as string));
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">पोस्ट नहीं मिला</h1>
          <Link href="/janta-darbar" className="text-primary hover:underline">
            जनता दरबार पर वापस जाएं
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
            href="/janta-darbar" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 bg-black/20 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            जनता दरबार पर वापस जाएं
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
                <span>{post.date.split(" - ")[0]}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{post.location}</span>
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
              <h2 className="text-2xl font-bold mb-4">जनता दरबार एजेंडा:</h2>
              <p className="text-gray-700 mb-8 text-lg">{post.agenda}</p>
              
              <h2 className="text-2xl font-bold mb-4">विवरण:</h2>
              <div className="text-gray-700 mb-8 space-y-4 text-lg">
                {post.description.split('\n').map((paragraph, index) => (
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
                  स्थिति: <span className="font-medium text-primary">{post.status}</span>
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
          <h2 className="text-2xl font-bold mb-8 text-center">अन्य जनता दरबार</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jantaDarbarPosts
              .filter(p => p.id !== post?.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link 
                  href={`/janta-darbar/${relatedPost.id}`} 
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
                      {relatedPost.date.split(" - ")[0]}
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