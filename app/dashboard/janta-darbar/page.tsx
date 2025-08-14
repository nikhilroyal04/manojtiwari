"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  MoreVertical,
  Trash2,
  MessageSquare,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Users,
  TrendingUp,
  BarChart3
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface JantaDarbar {
  id: number;
  title: string;
  agenda: string;
  date: string;
  status: 'OPEN' | 'CLOSE' | 'SCHEDULED' | 'CANCELLED';
  location: string;
  images: string[];
  mainImage: string;
  attendees?: number;
  issues?: number;
  resolved?: number;
  notes?: string;
}

export default function JantaDarbar() {
  const [jantaDarbars, setJantaDarbars] = useState<JantaDarbar[]>([
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
      attendees: 150,
      issues: 25,
      resolved: 22
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
      attendees: 200,
      issues: 35,
      resolved: 30
    },
    {
      id: 3,
      title: "युवाओं के साथ संवाद कार्यक्रम",
      agenda: "आज के जनता दरबार में युवाओं के साथ विशेष संवाद कार्यक्रम आयोजित किया गया। युवाओं ने शिक्षा, रोजगार और कौशल विकास से जुड़े अपने विचार साझा किए।",
      date: "Wednesday, September 18, 2019 - 12:00",
      status: "CLOSE",
      location: "North East Delhi",
      images: [
        "/images/janta-darbar/jd3-1.jpg",
        "/images/janta-darbar/jd3-2.jpg",
        "/images/janta-darbar/jd3-3.jpg"
      ],
      mainImage: "/images/janta-darbar/jd3-main.jpg",
      attendees: 180,
      issues: 28,
      resolved: 25
    },
    {
      id: 4,
      title: "महिला सशक्तिकरण पर विशेष चर्चा",
      agenda: "आज के जनता दरबार में महिला सशक्तिकरण पर विशेष चर्चा की गई। महिलाओं ने अपनी समस्याएं और सुझाव साझा किए।",
      date: "Friday, October 25, 2019 - 11:00",
      status: "CLOSE",
      location: "North East Delhi",
      images: [
        "/images/janta-darbar/jd4-1.jpg",
        "/images/janta-darbar/jd4-2.jpg"
      ],
      mainImage: "/images/janta-darbar/jd4-main.jpg",
      attendees: 120,
      issues: 20,
      resolved: 18
    },
    {
      id: 5,
      title: "स्वच्छता अभियान के साथ जनता दरबार",
      agenda: "आज के जनता दरबार के साथ क्षेत्र में स्वच्छता अभियान भी चलाया गया। स्थानीय निवासियों और स्वयंसेवकों ने बढ़-चढ़कर हिस्सा लिया।",
      date: "Sunday, November 10, 2019 - 09:30",
      status: "CLOSE",
      location: "North East Delhi",
      images: [
        "/images/janta-darbar/jd5-1.jpg",
        "/images/janta-darbar/jd5-2.jpg",
        "/images/janta-darbar/jd5-3.jpg"
      ],
      mainImage: "/images/janta-darbar/jd5-main.jpg",
      attendees: 250,
      issues: 40,
      resolved: 35
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedJantaDarbar, setSelectedJantaDarbar] = useState<JantaDarbar | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newJantaDarbar, setNewJantaDarbar] = useState<Partial<JantaDarbar>>({
    title: '',
    agenda: '',
    date: '',
    status: 'SCHEDULED',
    location: 'North East Delhi',
    images: [],
    mainImage: '',
    attendees: 0,
    issues: 0,
    resolved: 0
  });

  const statusColors = {
    OPEN: 'bg-green-100 text-green-800 border-green-200',
    CLOSE: 'bg-gray-100 text-gray-800 border-gray-200',
    SCHEDULED: 'bg-blue-100 text-blue-800 border-blue-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusIcons = {
    OPEN: CheckCircle,
    CLOSE: Clock,
    SCHEDULED: AlertCircle,
    CANCELLED: XCircle
  };

  const filteredJantaDarbars = jantaDarbars.filter(jd => {
    const matchesSearch = 
      jd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jd.agenda.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jd.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || jd.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddJantaDarbar = () => {
    const jd: JantaDarbar = {
      id: Date.now(),
      title: newJantaDarbar.title || '',
      agenda: newJantaDarbar.agenda || '',
      date: newJantaDarbar.date || '',
      status: newJantaDarbar.status || 'SCHEDULED',
      location: newJantaDarbar.location || 'North East Delhi',
      images: newJantaDarbar.images || [],
      mainImage: newJantaDarbar.mainImage || '',
      attendees: newJantaDarbar.attendees || 0,
      issues: newJantaDarbar.issues || 0,
      resolved: newJantaDarbar.resolved || 0
    };
    
    setJantaDarbars(prev => [jd, ...prev]);
    setNewJantaDarbar({
      title: '',
      agenda: '',
      date: '',
      status: 'SCHEDULED',
      location: 'North East Delhi',
      images: [],
      mainImage: '',
      attendees: 0,
      issues: 0,
      resolved: 0
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteJantaDarbar = (id: number) => {
    setJantaDarbars(prev => prev.filter(jd => jd.id !== id));
    setIsDeleteModalOpen(false);
    setSelectedJantaDarbar(null);
  };

  const getStatusCount = (status: string) => {
    return jantaDarbars.filter(jd => status === 'all' ? true : jd.status === status).length;
  };

  const totalAttendees = jantaDarbars.reduce((sum, jd) => sum + (jd.attendees || 0), 0);
  const totalIssues = jantaDarbars.reduce((sum, jd) => sum + (jd.issues || 0), 0);
  const totalResolved = jantaDarbars.reduce((sum, jd) => sum + (jd.resolved || 0), 0);

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">जनता दरबार प्रबंधन</h1>
          <p className="text-gray-600">Manage and track all Janta Darbar events</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Events', count: jantaDarbars.length, color: 'bg-blue-500', icon: Calendar },
            { label: 'Open', count: getStatusCount('OPEN'), color: 'bg-green-500', icon: CheckCircle },
            { label: 'Scheduled', count: getStatusCount('SCHEDULED'), color: 'bg-blue-500', icon: AlertCircle },
            { label: 'Closed', count: getStatusCount('CLOSE'), color: 'bg-gray-500', icon: Clock },
            { label: 'Cancelled', count: getStatusCount('CANCELLED'), color: 'bg-red-500', icon: XCircle },
            { label: 'Total Attendees', count: totalAttendees, color: 'bg-purple-500', icon: Users }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                </div>
                <div className={`w-8 h-8 rounded-full ${stat.color} opacity-20 flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Issues & Resolutions</h3>
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Issues:</span>
                <span className="font-semibold">{totalIssues}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolved:</span>
                <span className="font-semibold text-green-600">{totalResolved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolution Rate:</span>
                <span className="font-semibold text-blue-600">
                  {totalIssues > 0 ? Math.round((totalResolved / totalIssues) * 100) : 0}%
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Last 7 days: 3 events</div>
              <div className="text-sm text-gray-600">Last 30 days: 12 events</div>
              <div className="text-sm text-gray-600">Average attendees: {Math.round(totalAttendees / jantaDarbars.length)}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <MoreVertical className="w-6 h-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule New Event
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search janta darbar by title, agenda, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                <SelectItem value="CLOSE">Closed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Add Janta Darbar Button */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Janta Darbar Event</DialogTitle>
                  <DialogDescription>
                    Create a new janta darbar event with all details.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={newJantaDarbar.title}
                      onChange={(e) => setNewJantaDarbar(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Agenda</label>
                    <textarea
                      value={newJantaDarbar.agenda}
                      onChange={(e) => setNewJantaDarbar(prev => ({ ...prev, agenda: e.target.value }))}
                      placeholder="Enter event agenda"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Date & Time</label>
                      <Input
                        type="datetime-local"
                        value={newJantaDarbar.date}
                        onChange={(e) => setNewJantaDarbar(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        value={newJantaDarbar.location}
                        onChange={(e) => setNewJantaDarbar(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Enter location"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select value={newJantaDarbar.status} onValueChange={(value) => setNewJantaDarbar(prev => ({ ...prev, status: value as JantaDarbar['status'] }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                          <SelectItem value="OPEN">Open</SelectItem>
                          <SelectItem value="CLOSE">Closed</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Expected Attendees</label>
                      <Input
                        type="number"
                        value={newJantaDarbar.attendees}
                        onChange={(e) => setNewJantaDarbar(prev => ({ ...prev, attendees: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Main Image URL</label>
                      <Input
                        value={newJantaDarbar.mainImage}
                        onChange={(e) => setNewJantaDarbar(prev => ({ ...prev, mainImage: e.target.value }))}
                        placeholder="Enter image URL"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddJantaDarbar} className="bg-orange-500 hover:bg-orange-600">
                    Add Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Janta Darbar Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJantaDarbars.map((jd, index) => (
                  <motion.tr
                    key={jd.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{jd.title}</div>
                          <div className="text-sm text-gray-500">{jd.images.length} images</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{jd.agenda}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{jd.date.split(" - ")[0]}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {jd.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[jd.status]}>
                        {React.createElement(statusIcons[jd.status], { className: "w-3 h-3" })}
                        {jd.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>👥 {jd.attendees || 0}</div>
                        <div>📋 {jd.issues || 0} issues</div>
                        <div>✅ {jd.resolved || 0} resolved</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {/* View Event */}
                        <Dialog open={isViewModalOpen && selectedJantaDarbar?.id === jd.id} onOpenChange={(open) => {
                          setIsViewModalOpen(open);
                          if (open) setSelectedJantaDarbar(jd);
                          else setSelectedJantaDarbar(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Janta Darbar Details</DialogTitle>
                              <DialogDescription>
                                Complete information about {jd.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Title</label>
                                  <p className="text-sm text-gray-900">{jd.title}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Status</label>
                                  <Badge className={statusColors[jd.status]}>
                                    {jd.status}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Date & Time</label>
                                  <p className="text-sm text-gray-900">{jd.date}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Location</label>
                                  <p className="text-sm text-gray-900">{jd.location}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Agenda</label>
                                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{jd.agenda}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Attendees</label>
                                  <p className="text-sm text-gray-900">{jd.attendees || 0}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Issues Raised</label>
                                  <p className="text-sm text-gray-900">{jd.issues || 0}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Issues Resolved</label>
                                  <p className="text-sm text-gray-900">{jd.resolved || 0}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Images ({jd.images.length})</label>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                  {jd.images.map((image, i) => (
                                    <div key={i} className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                                      <ImageIcon className="w-6 h-6 text-gray-400" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                                Close
                              </Button>
                              <Button 
                                onClick={() => {
                                  setIsViewModalOpen(false);
                                  setSelectedJantaDarbar(jd);
                                  setIsEditModalOpen(true);
                                }}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Edit Event
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Edit Event */}
                        <Dialog open={isEditModalOpen && selectedJantaDarbar?.id === jd.id} onOpenChange={(open) => {
                          setIsEditModalOpen(open);
                          if (open) setSelectedJantaDarbar(jd);
                          else setSelectedJantaDarbar(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Janta Darbar Event</DialogTitle>
                              <DialogDescription>
                                Update the details for {jd.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                  value={jd.title}
                                  onChange={(e) => {
                                    setJantaDarbars(prev => prev.map(j => 
                                      j.id === jd.id ? { ...j, title: e.target.value } : j
                                    ));
                                  }}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Status</label>
                                <Select 
                                  value={jd.status} 
                                  onValueChange={(value) => {
                                    setJantaDarbars(prev => prev.map(j => 
                                      j.id === jd.id ? { ...j, status: value as JantaDarbar['status'] } : j
                                    ));
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                                    <SelectItem value="OPEN">Open</SelectItem>
                                    <SelectItem value="CLOSE">Closed</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Attendees</label>
                                  <Input
                                    type="number"
                                    value={jd.attendees || 0}
                                    onChange={(e) => {
                                      setJantaDarbars(prev => prev.map(j => 
                                        j.id === jd.id ? { ...j, attendees: parseInt(e.target.value) || 0 } : j
                                      ));
                                    }}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Issues Raised</label>
                                  <Input
                                    type="number"
                                    value={jd.issues || 0}
                                    onChange={(e) => {
                                      setJantaDarbars(prev => prev.map(j => 
                                        j.id === jd.id ? { ...j, issues: parseInt(e.target.value) || 0 } : j
                                      ));
                                    }}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Issues Resolved</label>
                                <Input
                                  type="number"
                                  value={jd.resolved || 0}
                                  onChange={(e) => {
                                    setJantaDarbars(prev => prev.map(j => 
                                      j.id === jd.id ? { ...j, resolved: parseInt(e.target.value) || 0 } : j
                                    ));
                                  }}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Update Event
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Delete Event */}
                        <Dialog open={isDeleteModalOpen && selectedJantaDarbar?.id === jd.id} onOpenChange={(open) => {
                          setIsDeleteModalOpen(open);
                          if (open) setSelectedJantaDarbar(jd);
                          else setSelectedJantaDarbar(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Janta Darbar Event</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete &quot;{jd.title}&quot;? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button 
                                variant="destructive" 
                                onClick={() => handleDeleteJantaDarbar(jd.id)}
                              >
                                Delete Event
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Quick Actions */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm">
                            <DialogHeader>
                              <DialogTitle>Quick Actions</DialogTitle>
                              <DialogDescription>
                                Choose an action for {jd.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                              <Button variant="ghost" className="w-full justify-start">
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Upload Images
                              </Button>
                              <Button variant="ghost" className="w-full justify-start">
                                <FileText className="w-4 h-4 mr-2" />
                                Generate Report
                              </Button>
                              <Button variant="ghost" className="w-full justify-start">
                                <Users className="w-4 h-4 mr-2" />
                                Manage Attendees
                              </Button>
                              <Button variant="ghost" className="w-full justify-start">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Send Notifications
                              </Button>
                              <Button variant="ghost" className="w-full justify-start">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View on Website
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}