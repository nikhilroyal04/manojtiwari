"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Users, Phone } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { fetchKaryakram, selectKaryakram, selectLoading, selectError } from '@/lib/redux/features/karyakramSlice';
import type { Karyakram } from '@/lib/redux/features/karyakramSlice';

export default function EventPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const karyakrams = useSelector(selectKaryakram);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Fetch events on component mount
  useEffect(() => {
    dispatch(fetchKaryakram());
  }, [dispatch]);

  // Find the specific event by ID
  const event = karyakrams.find((e: Karyakram) => e._id === params.id);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4 text-red-600">त्रुटि</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/agami-karyakram" className="text-primary hover:underline">
            आगामी कार्यक्रम पर वापस जाएं
          </Link>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
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
                  {event.description && event.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg">{paragraph}</p>
                  ))}
                  {event.notes && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                      <p className="text-gray-700"><strong>अतिरिक्त जानकारी:</strong> {event.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      आयोजक जानकारी
                    </h3>
                    <div className="space-y-3">
                      {event.organizer && (
                        <div>
                          <div className="text-sm text-gray-500">आयोजक:</div>
                          <div className="font-medium">{event.organizer}</div>
                        </div>
                      )}
                      {event.contactPerson && (
                        <div>
                          <div className="text-sm text-gray-500">संपर्क व्यक्ति:</div>
                          <div className="font-medium">{event.contactPerson}</div>
                        </div>
                      )}
                      {event.contactNumber && (
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
                      )}
                      {!event.organizer && !event.contactPerson && !event.contactNumber && (
                        <div className="text-gray-500">संपर्क जानकारी उपलब्ध नहीं है</div>
                      )}
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
                      {event.expectedAttendees && event.expectedAttendees > 0 && (
                        <div>
                          <div className="text-sm text-gray-500">अपेक्षित उपस्थिति:</div>
                          <div className="font-medium">{event.expectedAttendees} लोग</div>
                        </div>
                      )}
                      {event.actualAttendees && event.actualAttendees > 0 && (
                        <div>
                          <div className="text-sm text-gray-500">वास्तविक उपस्थिति:</div>
                          <div className="font-medium">{event.actualAttendees} लोग</div>
                        </div>
                      )}
                      {event.priority && (
                        <div>
                          <div className="text-sm text-gray-500">प्राथमिकता:</div>
                          <div className="font-medium">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                              event.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                              event.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                              event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {event.priority === 'urgent' ? 'अत्यंत आवश्यक' :
                               event.priority === 'high' ? 'उच्च' :
                               event.priority === 'medium' ? 'मध्यम' :
                               'निम्न'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {event.status && (
                  <div className="mb-8">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-primary">
                      <h3 className="text-xl font-bold mb-2">कार्यक्रम स्थिति</h3>
                      <div className="flex items-center gap-2">
                        <span className={`inline-block px-4 py-2 rounded-full font-bold ${
                          event.status === 'upcoming' ? 'bg-blue-500 text-white' :
                          event.status === 'ongoing' ? 'bg-green-500 text-white' :
                          event.status === 'completed' ? 'bg-gray-500 text-white' :
                          event.status === 'cancelled' ? 'bg-red-500 text-white' :
                          'bg-yellow-500 text-white'
                        }`}>
                          {event.status === 'upcoming' ? '🔜 आगामी' :
                           event.status === 'ongoing' ? '▶️ चल रहा है' :
                           event.status === 'completed' ? '✅ संपन्न हो गया' :
                           event.status === 'cancelled' ? '❌ रद्द कर दिया गया' :
                           '⏸️ स्थगित'}
                        </span>
                      </div>
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
            {karyakrams
              .filter((e: Karyakram) => e._id !== event?._id)
              .slice(0, 3)
              .map((relatedEvent: Karyakram) => (
                <Link 
                  href={`/agami-karyakram/${relatedEvent._id}`} 
                  key={relatedEvent._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedEvent.image || '/images/events/default-event.jpg'}
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