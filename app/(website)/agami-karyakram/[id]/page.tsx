"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Users, Phone } from 'lucide-react';
import { useParams } from 'next/navigation';

// Same events data as in agami-karyakram.tsx
const events = [
  {
    id: 1,
    title: "सांसद श्री मनोज तिवारी जी पार्क का लोकार्पण और मिशन अनिवार्य के तहत जरूरतमंद महिलाओं को सैनेटरी नैपकिन वितरण",
    description: "पार्क का लोकार्पण और मिशन अनिवार्य के तहत जरूरतमंद महिलाओं को सैनेटरी नैपकिन वितरण",
    date: "2022-06-26",
    time: "11:00 AM",
    location: "DDA द्वारा निर्मित खजूर पार्क, सेयदराजा विधानसभा",
    type: "लोकार्पण",
    image: "/images/events/park-inauguration.jpg",
    fullDescription: "सांसद श्री मनोज तिवारी जी द्वारा DDA द्वारा निर्मित खजूर पार्क का लोकार्पण किया जाएगा। इस अवसर पर मिशन अनिवार्य के तहत जरूरतमंद महिलाओं को सैनेटरी नैपकिन का वितरण भी किया जाएगा। यह कार्यक्रम सेयदराजा विधानसभा क्षेत्र में आयोजित किया जा रहा है और सभी नागरिकों के लिए खुला है।\n\nइस कार्यक्रम का उद्देश्य क्षेत्र में हरियाली बढ़ाना और महिलाओं के स्वास्थ्य के प्रति जागरूकता फैलाना है। पार्क के लोकार्पण से क्षेत्र के निवासियों को एक नया मनोरंजन स्थल मिलेगा जहां वे अपने परिवार के साथ समय बिता सकेंगे।",
    organizer: "सांसद कार्यालय, उत्तर पूर्वी दिल्ली",
    contactPerson: "कृष्णा चौबे",
    contactNumber: "9990152796",
    additionalImages: [
      "/images/events/park-inauguration-1.jpg",
      "/images/events/park-inauguration-2.jpg",
      "/images/events/park-inauguration-3.jpg"
    ],
    attendees: "सभी नागरिक आमंत्रित हैं"
  },
  {
    id: 2,
    title: "जनता दरबार - समस्याओं का समाधान",
    description: "सांसद श्री मनोज तिवारी जी द्वारा आयोजित जनता दरबार में क्षेत्र के नागरिकों की समस्याओं का समाधान किया जाएगा। सभी नागरिक अपनी समस्याओं के साथ आमंत्रित हैं।",
    date: "2022-07-15",
    time: "10:00 AM",
    location: "कार्यालय, उत्तर पूर्वी दिल्ली",
    type: "जनता दरबार",
    image: "/images/events/janta-darbar.jpg",
    fullDescription: "सांसद श्री मनोज तिवारी जी द्वारा आयोजित जनता दरबार में क्षेत्र के नागरिकों की समस्याओं का समाधान किया जाएगा। इस दरबार में नागरिक अपनी समस्याओं के साथ सीधे सांसद जी से मिल सकेंगे और अपनी समस्याओं का समाधान पा सकेंगे।\n\nजनता दरबार का उद्देश्य नागरिकों की समस्याओं का त्वरित समाधान करना है। इसमें विभिन्न विभागों के अधिकारी भी उपस्थित रहेंगे जिससे समस्याओं का तुरंत समाधान किया जा सके।",
    organizer: "सांसद कार्यालय, उत्तर पूर्वी दिल्ली",
    contactPerson: "राजीव वर्मा",
    contactNumber: "9999535258",
    additionalImages: [
      "/images/events/janta-darbar-1.jpg",
      "/images/events/janta-darbar-2.jpg"
    ],
    attendees: "सभी नागरिक आमंत्रित हैं"
  },
  {
    id: 3,
    title: "स्वच्छता अभियान - स्वच्छ भारत मिशन",
    description: "स्वच्छ भारत मिशन के अंतर्गत स्वच्छता अभियान का आयोजन किया जाएगा। सभी नागरिकों से अनुरोध है कि इस अभियान में बढ़-चढ़कर हिस्सा लें।",
    date: "2022-07-22",
    time: "09:00 AM",
    location: "यमुना घाट, उत्तर पूर्वी दिल्ली",
    type: "अभियान",
    image: "/images/events/swachhta-abhiyan.jpg",
    fullDescription: "स्वच्छ भारत मिशन के अंतर्गत यमुना घाट पर स्वच्छता अभियान का आयोजन किया जाएगा। इस अभियान का उद्देश्य यमुना नदी के तट को स्वच्छ रखना और जल प्रदूषण को कम करना है।\n\nइस अभियान में सांसद श्री मनोज तिवारी जी के साथ-साथ क्षेत्र के नागरिक, स्कूली बच्चे और स्वयंसेवी संगठन भी भाग लेंगे। सभी प्रतिभागियों को स्वच्छता किट प्रदान की जाएगी।",
    organizer: "सांसद कार्यालय, उत्तर पूर्वी दिल्ली",
    contactPerson: "राजकुमार श्रीवास्तव",
    contactNumber: "098735 88120",
    additionalImages: [
      "/images/events/swachhta-abhiyan-1.jpg",
      "/images/events/swachhta-abhiyan-2.jpg",
      "/images/events/swachhta-abhiyan-3.jpg"
    ],
    attendees: "सभी नागरिक आमंत्रित हैं"
  },
  {
    id: 4,
    title: "वृक्षारोपण अभियान",
    description: "पर्यावरण संरक्षण के लिए वृक्षारोपण अभियान का आयोजन किया जाएगा। सभी नागरिकों से अनुरोध है कि इस अभियान में भाग लें और अपने क्षेत्र को हरा-भरा बनाएं।",
    date: "2022-08-05",
    time: "08:30 AM",
    location: "यमुना खादर क्षेत्र, उत्तर पूर्वी दिल्ली",
    type: "अभियान",
    image: "/images/events/tree-plantation.jpg",
    fullDescription: "पर्यावरण संरक्षण के लिए यमुना खादर क्षेत्र में वृक्षारोपण अभियान का आयोजन किया जाएगा। इस अभियान का उद्देश्य क्षेत्र में हरियाली बढ़ाना और पर्यावरण संरक्षण के प्रति जागरूकता फैलाना है।\n\nइस अभियान में सांसद श्री मनोज तिवारी जी के साथ-साथ क्षेत्र के नागरिक, स्कूली बच्चे और स्वयंसेवी संगठन भी भाग लेंगे। सभी प्रतिभागियों को पौधे और उन्हें लगाने के लिए आवश्यक सामग्री प्रदान की जाएगी।",
    organizer: "सांसद कार्यालय, उत्तर पूर्वी दिल्ली",
    contactPerson: "विनोद यादव",
    contactNumber: "7654321098",
    additionalImages: [
      "/images/events/tree-plantation-1.jpg",
      "/images/events/tree-plantation-2.jpg"
    ],
    attendees: "सभी नागरिक आमंत्रित हैं"
  },
  {
    id: 5,
    title: "स्वास्थ्य शिविर",
    description: "निःशुल्क स्वास्थ्य जांच शिविर का आयोजन किया जाएगा। इस शिविर में विभिन्न बीमारियों की जांच और परामर्श दिया जाएगा।",
    date: "2022-08-15",
    time: "10:00 AM",
    location: "सामुदायिक भवन, उत्तर पूर्वी दिल्ली",
    type: "शिविर",
    image: "/images/events/health-camp.jpg",
    fullDescription: "निःशुल्क स्वास्थ्य जांच शिविर का आयोजन किया जाएगा। इस शिविर में विभिन्न बीमारियों की जांच और परामर्श दिया जाएगा। शिविर में सामान्य जांच, रक्तचाप, शुगर, आंखों की जांच आदि की सुविधा उपलब्ध होगी।\n\nइस शिविर का उद्देश्य क्षेत्र के नागरिकों को स्वास्थ्य सेवाएं प्रदान करना और स्वास्थ्य के प्रति जागरूकता फैलाना है। शिविर में प्रतिष्ठित डॉक्टर और स्वास्थ्य कर्मी उपस्थित रहेंगे।",
    organizer: "सांसद कार्यालय, उत्तर पूर्वी दिल्ली",
    contactPerson: "प्रिया पटेल",
    contactNumber: "8765432109",
    additionalImages: [
      "/images/events/health-camp-1.jpg",
      "/images/events/health-camp-2.jpg",
      "/images/events/health-camp-3.jpg"
    ],
    attendees: "सभी नागरिक आमंत्रित हैं"
  },
  {
    id: 6,
    title: "स्वतंत्रता दिवस समारोह",
    description: "75वें स्वतंत्रता दिवस के उपलक्ष्य में विशेष समारोह का आयोजन किया जाएगा। इस अवसर पर ध्वजारोहण और सांस्कृतिक कार्यक्रम होंगे।",
    date: "2022-08-15",
    time: "08:00 AM",
    location: "डीडीए मैदान, उत्तर पूर्वी दिल्ली",
    type: "समारोह",
    image: "/images/events/independence-day.jpg",
    fullDescription: "75वें स्वतंत्रता दिवस के उपलक्ष्य में विशेष समारोह का आयोजन किया जाएगा। इस अवसर पर ध्वजारोहण और सांस्कृतिक कार्यक्रम होंगे। समारोह में स्कूली बच्चों द्वारा देशभक्ति गीत और नृत्य प्रस्तुत किए जाएंगे।\n\nइस समारोह का उद्देश्य देशभक्ति की भावना जगाना और स्वतंत्रता सेनानियों के बलिदान को याद करना है। समारोह में स्वतंत्रता सेनानियों के परिवारों को सम्मानित किया जाएगा।",
    organizer: "सांसद कार्यालय, उत्तर पूर्वी दिल्ली",
    contactPerson: "अमित शर्मा",
    contactNumber: "9876543210",
    additionalImages: [
      "/images/events/independence-day-1.jpg",
      "/images/events/independence-day-2.jpg",
      "/images/events/independence-day-3.jpg"
    ],
    attendees: "सभी नागरिक आमंत्रित हैं"
  }
];
export default function EventPage() {
  const params = useParams();
  const event = events.find(e => e.id == parseInt(params.id as string));  

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">कार्यक्रम नहीं मिला</h1>
          <Link href="/agami-karyakram" className="text-primary hover:underline">
            आगामी कार्यक्रम पर वापस जाएं
          </Link>
        </div>
      </div>
    );
  }

  // Format date to display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src={event.image} 
            alt={event.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/agami-karyakram" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 bg-black/20 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            आगामी कार्यक्रम पर वापस जाएं
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
              {event.type}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">कार्यक्रम विवरण</h2>
                <div className="text-gray-700 mb-8 space-y-4">
                  {event.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg">{paragraph}</p>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      आयोजक जानकारी
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">आयोजक:</div>
                        <div className="font-medium">{event.organizer}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">संपर्क व्यक्ति:</div>
                        <div className="font-medium">{event.contactPerson}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">संपर्क नंबर:</div>
                        <div className="font-medium">
                          <Link 
                            href={`tel:${event.contactNumber}`}
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            {event.contactNumber}
                            <Phone className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      कार्यक्रम जानकारी
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">दिनांक:</div>
                        <div className="font-medium">{formatDate(event.date)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">समय:</div>
                        <div className="font-medium">{event.time}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">प्रतिभागी:</div>
                        <div className="font-medium">{event.attendees}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {event.additionalImages && event.additionalImages.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">कार्यक्रम की झलकियां</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {event.additionalImages.map((image, index) => (
                        <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`${event.title} - ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center border-t pt-6">
                  <div className="text-gray-500">
                    स्थान: <span className="font-medium text-primary">{event.location}</span>
                  </div>
                  <button className="flex items-center gap-2 text-primary hover:text-primary/80">
                    <Share2 className="w-5 h-5" />
                    शेयर करें
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">अन्य आगामी कार्यक्रम</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events
              .filter(e => e.id !== event?.id)
              .slice(0, 3)
              .map((relatedEvent) => (
                <Link 
                  href={`/agami-karyakram/${relatedEvent.id}`} 
                  key={relatedEvent.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                      {relatedEvent.type}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2">{relatedEvent.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(relatedEvent.date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {relatedEvent.location}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
} 