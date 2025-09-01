"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Share, Clock, Users, Mic, Newspaper, Video } from 'lucide-react';

export default function VividhtaSection() {
  const contentCards = [
    {
      title: "मीडिया कवरेज",
      image: "/rp-1.jpg",
      description: "We will ensure MCDs get money direct from Centre",
      subtitle: "INTERVIEW Delhi BJP chief Manoj Tiwari insists though both AAP and Cong governments in Delhi choked the flow of funds to municipalities, the party-ruled civic bodies have developed parks and improved school education."
    },
    {
      title: "एक राजनीतिक के रूप में",
      image: "/rp-2.jpg",
      description: "Speaking at political podium",
      subtitle: "Manoj Tiwari addressing the audience in a formal political setting, representing the voice of the people."
    },
    {
      title: "लाइव डिबेट",
      image: "/rp-3.jpg",
      description: "INDIA TV Live Debate",
      subtitle: "Participating in live television debates and discussions on current political issues."
    }
  ];

  const videoThumbnails = [
    {
      title: "Shri Manoj Kumar Tiwari on The National Sports University Bill",
      channel: "LSTV LIVE",
      duration: "15:15 03.08.2018",
      speaker: "डॉ एम तबि दुरै, माननीय उपाध्यक्ष",
      status: "IN THE CHAIR",
      topic: "LEGISLATIVE BUSINESS",
      image: "/thumb-1.jpg",
      videoUrl: "https://www.youtube.com/watch?v=YF0sedWtbk4&t=1s"
    },
    {
      title: "Shri Manoj Kumar Tiwari's speech during Motion of Thanks",
      channel: "BJPlive",
      duration: "LIVE",
      speaker: "Manoj Ti",
      status: "Parliament Session",
      topic: "Motion of Thanks Discussion",
      image: "/thumb-2.jpg",
      videoUrl: "https://www.youtube.com/watch?v=YQLoxwLpjSUs"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            <span className="text-gray-900">मनोज तिवारी</span>
            <span className="text-blue-500 mx-2">-</span>
            <span className="text-blue-400 font-light">विविधता</span>
          </h2>
          <p className="text-lg text-gray-600">Diverse aspects of public life and leadership</p>
        </motion.div>

        {/* Content Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {contentCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-primary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Parliament Section */}
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Image */}
          <div className="relative h-[34rem] md:h-[38rem]">
            <Image
              src="/thumb-3.jpg"
              alt="Parliament Hall"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            
            {/* Overlay Text */}
            <div className="absolute left-8 top-8 text-white">
              <h3 className="text-3xl font-bold mb-2">In Parliament</h3>
              <p className="text-lg opacity-90">Legislative proceedings and debates</p>
              <a href="https://www.youtube.com/watch?v=p4hIFH5RLSE" target="_blank" className="text-blue-500">Watch on YouTube</a>
            </div>

            {/* Video Thumbnails */}
            <div className="absolute right-4 md:right-8 top-20 md:top-8 bottom-4 md:bottom-8 w-72 md:w-96 overflow-y-auto space-y-4 pr-2">
              {videoThumbnails.map((video, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-3 shadow-lg max-w-sm cursor-pointer"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => window.open(video.videoUrl, '_blank')}
                >
                  {/* Video Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <Play className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{video.channel}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <Share className="w-3 h-3 text-gray-500" />
                    </div>
                  </div>

                  {/* Video Thumbnail */}
                  <div 
                    className="relative h-28 md:h-32 mb-2 rounded overflow-hidden cursor-pointer"
                    onClick={() => window.open(video.videoUrl, '_blank')}
                  >
                    <Image
                      src={video.image}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-900 leading-tight">
                      {video.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{video.speaker}</span>
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-red-500 font-semibold">{video.status}</span>
                      <span className="text-gray-500">{video.topic}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <Newspaper className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Media Interviews</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <Mic className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">100+</div>
            <div className="text-sm text-gray-600">Public Speeches</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <Video className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">25+</div>
            <div className="text-sm text-gray-600">TV Debates</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">200+</div>
            <div className="text-sm text-gray-600">Parliament Sessions</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

