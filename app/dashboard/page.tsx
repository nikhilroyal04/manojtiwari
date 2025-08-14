"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Eye, 
  FileText, 
  Image, 
  Video, 
  Award, 
  TrendingUp,
  BarChart3,
  Activity,
  Globe,
  Mail
} from 'lucide-react';

export default function Dashboard() {
  // Mock data - replace with real data from your backend
  const stats = [
    {
      title: "Total Visitors",
      value: "12,847",
      change: "+12.5%",
      changeType: "positive",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Page Views",
      value: "45,234",
      change: "+8.2%",
      changeType: "positive",
      icon: Eye,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Gallery Views",
      value: "8,456",
      change: "+15.3%",
      changeType: "positive",
      icon: Image,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Video Plays",
      value: "3,234",
      change: "+22.1%",
      changeType: "positive",
      icon: Video,
      color: "from-red-500 to-red-600"
    }
  ];

  const sectionStats = [
    {
      name: "Manoj Tiwari Profile",
      views: 15420,
      growth: "+18.5%",
      icon: Users,
      color: "bg-orange-500"
    },
    {
      name: "Achievements",
      views: 8920,
      growth: "+12.3%",
      icon: Award,
      color: "bg-yellow-500"
    },
    {
      name: "Political Career",
      views: 6750,
      growth: "+8.7%",
      icon: BarChart3,
      color: "bg-blue-500"
    },
    {
      name: "Filmography",
      views: 5430,
      growth: "+15.2%",
      icon: Video,
      color: "bg-purple-500"
    },
    {
      name: "Gallery",
      views: 8456,
      growth: "+22.1%",
      icon: Image,
      color: "bg-green-500"
    },
    {
      name: "Contact",
      views: 3240,
      growth: "+5.8%",
      icon: Mail,
      color: "bg-red-500"
    }
  ];

  const recentActivity = [
    {
      action: "New visitor from Delhi",
      time: "2 minutes ago",
      type: "visitor"
    },
    {
      action: "Gallery photo viewed",
      time: "5 minutes ago",
      type: "gallery"
    },
    {
      action: "Video played - Live Performance",
      time: "8 minutes ago",
      type: "video"
    },
    {
      action: "Contact form submitted",
      time: "12 minutes ago",
      type: "contact"
    },
    {
      action: "Achievements page visited",
      time: "15 minutes ago",
      type: "page"
    }
  ];

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
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your website.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section Performance */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Section Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectionStats.map((section, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center mr-4`}>
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{section.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-gray-600">{section.views.toLocaleString()} views</span>
                        <span className="text-sm font-medium text-green-600">{section.growth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity & Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full ${
                        activity.type === 'visitor' ? 'bg-blue-100' :
                        activity.type === 'gallery' ? 'bg-purple-100' :
                        activity.type === 'video' ? 'bg-red-100' :
                        activity.type === 'contact' ? 'bg-green-100' : 'bg-gray-100'
                      } flex items-center justify-center mr-3`}>
                        {activity.type === 'visitor' && <Users className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'gallery' && <Image className="w-4 h-4 text-purple-600" />}
                        {activity.type === 'video' && <Video className="w-4 h-4 text-red-600" />}
                        {activity.type === 'contact' && <Mail className="w-4 h-4 text-green-600" />}
                        {activity.type === 'page' && <FileText className="w-4 h-4 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center mr-3">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Website Uptime</p>
                        <p className="text-sm text-gray-600">Last 30 days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">99.9%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center mr-3">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Average Session</p>
                        <p className="text-sm text-gray-600">Time spent</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">4m 32s</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center mr-3">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Bounce Rate</p>
                        <p className="text-sm text-gray-600">Lower is better</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">23.4%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
  