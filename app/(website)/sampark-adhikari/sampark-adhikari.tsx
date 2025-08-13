"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Briefcase, UserPlus, Users, X } from 'lucide-react';
import Link from 'next/link';
import CTA from '@/components/all/cta-section';

export default function SamparkAdhikari() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  // Staff profiles data
  const staffProfiles = [
    {
      id: 1,
      name: "कृष्णा चौबे (राजा)",
      email: "krishna.choubey@example.com",
      number: "9990152796",
      officeNumber: "(011) 23094122",
      workArea: "मा. सांसद जी के द्वारा जनसमस्याओं के निराकरण हेतु किये जा रहे कार्यों में समर्पण भाव से सहभागिता करना",
      additionalInfo: "एजुकेशनल क्वालिफिकेशन - B.tech (ECE) शुरू से ही सामाजिक कार्य में अभिरुचि रखना",
      department: "जनसमस्या निराकरण",
      image: "/images/staff/krishna-choubey.jpg"
    },
    {
      id: 2,
      name: "राजीव वर्मा",
      email: "rajeev.verma@example.com",
      number: "9999535258",
      officeNumber: "(011) 23094122",
      workArea: "मा. सांसद जी के द्वारा जनसमस्याओं के निराकरण हेतु किये जा रहे कार्यों में समर्पण भाव से सहभागिता करना",
      department: "जनसमस्या निराकरण",
      image: "/images/staff/rajeev-verma.jpg"
    },
    {
      id: 3,
      name: "राजकुमार श्रीवास्तव",
      email: "rajkumar.srivastava@example.com",
      number: "098735 88120",
      workArea: "सांसद जी के सहयोग आवर जन समस्या समादन में सहयोग करते हैं",
      department: "जन समस्या समाधान",
      image: "/images/staff/rajkumar-srivastava.jpg"
    },
    {
      id: 4,
      name: "अमित शर्मा",
      email: "amit.sharma@example.com",
      number: "9876543210",
      workArea: "सोशल मीडिया प्रबंधन और डिजिटल कम्युनिकेशन",
      department: "मीडिया",
      image: "/images/staff/amit-sharma.jpg"
    },
    {
      id: 5,
      name: "प्रिया पटेल",
      email: "priya.patel@example.com",
      number: "8765432109",
      workArea: "कार्यक्रम आयोजन और प्रबंधन",
      department: "कार्यक्रम प्रबंधन",
      image: "/images/staff/priya-patel.jpg"
    },
    {
      id: 6,
      name: "विनोद यादव",
      email: "vinod.yadav@example.com",
      number: "7654321098",
      workArea: "क्षेत्रीय विकास कार्य और योजनाओं का निरीक्षण",
      department: "क्षेत्रीय विकास",
      image: "/images/staff/vinod-yadav.jpg"
    }
  ];

  // Get unique departments for filter
  const departments = Array.from(new Set(staffProfiles.map(profile => profile.department)));

  // Filter profiles based on search term and selected department
  const filteredProfiles = staffProfiles.filter(profile => {
    let matchesSearch = true;
    let matchesDepartment = true;

    if (searchTerm) {
      matchesSearch = 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        profile.workArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.department.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (selectedDepartment) {
      matchesDepartment = profile.department === selectedDepartment;
    }

    return matchesSearch && matchesDepartment;
  });

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
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <CTA 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        title="संपर्क अधिकारी"
        description="मनोज तिवारी जी के कार्यालय के संपर्क अधिकारियों की सूची"
        placeholder="अधिकारी या विभाग खोजें..."
      />

      {/* Filter Section */}
      <section className="py-6 bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">स्टाफ प्रोफाइल</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {departments.map(department => (
                <button
                  key={department}
                  onClick={() => setSelectedDepartment(department === selectedDepartment ? null : department)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    department === selectedDepartment
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {department}
                </button>
              ))}
              
              {(searchTerm || selectedDepartment) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDepartment(null);
                  }}
                  className="py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  फ़िल्टर हटाएं
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Staff Profiles Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProfiles.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProfiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col h-full">
                    <div className="relative bg-gradient-to-r from-orange-100 to-red-100 p-6">
                      <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={profile.image}
                          alt={profile.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        {profile.department}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow">
                      <h3 className="text-2xl font-bold text-center mb-4">{profile.name}</h3>
                      
                      <div className="space-y-4">
                        {profile.email && (
                          <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                              <div className="text-sm text-gray-500">Email:</div>
                              <div>{profile.email}</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-500">Number:</div>
                            <div>{profile.number} {profile.officeNumber && `/ ${profile.officeNumber}`}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Briefcase className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-500">Work Area:</div>
                            <div className="text-sm">{profile.workArea}</div>
                          </div>
                        </div>
                        
                        {profile.additionalInfo && (
                          <div className="flex items-start gap-3">
                            <UserPlus className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                              <div className="text-sm text-gray-500">Additional Info:</div>
                              <div className="text-sm">{profile.additionalInfo}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border-t">
                      <Link 
                        href={`tel:${profile.number}`}
                        className="block w-full py-2 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        संपर्क करें
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">कोई परिणाम नहीं मिला</h3>
              <p className="text-gray-600 mb-6">अपनी खोज या फ़िल्टर को बदलकर पुनः प्रयास करें</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment(null);
                }}
                className="py-2 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                सभी अधिकारी दिखाएं
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Office Section */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">कार्यालय संपर्क</h2>
              <p className="text-white/80">किसी भी प्रकार की जानकारी या सहायता के लिए हमारे कार्यालय से संपर्क करें</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  दिल्ली कार्यालय
                </h3>
                <p className="mb-2">12, तुगलक लेन, नई दिल्ली - 110011</p>
                <p className="mb-2">फोन: (011) 23094122</p>
                <p>ईमेल: office.manojtiwari@gmail.com</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  क्षेत्रीय कार्यालय
                </h3>
                <p className="mb-2">उत्तर पूर्वी दिल्ली संसदीय क्षेत्र</p>
                <p className="mb-2">फोन: 9990152796</p>
                <p>ईमेल: contact.manojtiwari@gmail.com</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}