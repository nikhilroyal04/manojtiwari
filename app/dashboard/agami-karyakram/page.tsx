"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  Users,
  TrendingUp,
  BarChart3,
  Play,
  Pause,
  Zap
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

interface AgamiKaryakram {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  image: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED';
  expectedAttendees?: number;
  actualAttendees?: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  organizer?: string;
  contactPerson?: string;
  contactNumber?: string;
  notes?: string;
}

export default function AgamiKaryakram() {
  const [events, setEvents] = useState<AgamiKaryakram[]>([
    {
      id: 1,
      title: "सांसद श्री मनोज तिवारी जी पार्क का लोकार्पण और मिशन अनिवार्य के तहत जरूरतमंद महिलाओं को सैनेटरी नैपकिन वितरण",
      description: "पार्क का लोकार्पण और मिशन अनिवार्य के तहत जरूरतमंद महिलाओं को सैनेटरी नैपकिन वितरण",
      date: "2024-06-26",
      time: "11:00 AM",
      location: "DDA द्वारा निर्मित खजूर पार्क, सेयदराजा विधानसभा",
      type: "लोकार्पण",
      image: "/images/events/park-inauguration.jpg",
      status: "UPCOMING",
      expectedAttendees: 500,
      priority: "HIGH",
      organizer: "मनोज तिवारी",
      contactPerson: "राजेश कुमार",
      contactNumber: "+91 98765 43210"
    },
    {
      id: 2,
      title: "जनता दरबार - समस्याओं का समाधान",
      description: "सांसद श्री मनोज तिवारी जी द्वारा आयोजित जनता दरबार में क्षेत्र के नागरिकों की समस्याओं का समाधान किया जाएगा। सभी नागरिक अपनी समस्याओं के साथ आमंत्रित हैं।",
      date: "2024-07-15",
      time: "10:00 AM",
      location: "कार्यालय, उत्तर पूर्वी दिल्ली",
      type: "जनता दरबार",
      image: "/images/events/janta-darbar.jpg",
      status: "UPCOMING",
      expectedAttendees: 300,
      priority: "MEDIUM",
      organizer: "मनोज तिवारी",
      contactPerson: "प्रिया शर्मा",
      contactNumber: "+91 87654 32109"
    },
    {
      id: 3,
      title: "स्वच्छता अभियान - स्वच्छ भारत मिशन",
      description: "स्वच्छ भारत मिशन के अंतर्गत स्वच्छता अभियान का आयोजन किया जाएगा। सभी नागरिकों से अनुरोध है कि इस अभियान में बढ़-चढ़कर हिस्सा लें।",
      date: "2024-07-22",
      time: "09:00 AM",
      location: "यमुना घाट, उत्तर पूर्वी दिल्ली",
      type: "अभियान",
      image: "/images/events/swachhta-abhiyan.jpg",
      status: "UPCOMING",
      expectedAttendees: 200,
      priority: "HIGH",
      organizer: "मनोज तिवारी",
      contactPerson: "अमित पटेल",
      contactNumber: "+91 76543 21098"
    },
    {
      id: 4,
      title: "वृक्षारोपण अभियान",
      description: "पर्यावरण संरक्षण के लिए वृक्षारोपण अभियान का आयोजन किया जाएगा। सभी नागरिकों से अनुरोध है कि इस अभियान में भाग लें और अपने क्षेत्र को हरा-भरा बनाएं।",
      date: "2024-08-05",
      time: "08:30 AM",
      location: "यमुना खादर क्षेत्र, उत्तर पूर्वी दिल्ली",
      type: "अभियान",
      image: "/images/events/tree-plantation.jpg",
      status: "UPCOMING",
      expectedAttendees: 150,
      priority: "MEDIUM",
      organizer: "मनोज तिवारी",
      contactPerson: "सुनील वर्मा",
      contactNumber: "+91 65432 10987"
    },
    {
      id: 5,
      title: "स्वास्थ्य शिविर",
      description: "निःशुल्क स्वास्थ्य जांच शिविर का आयोजन किया जाएगा। इस शिविर में विभिन्न बीमारियों की जांच और परामर्श दिया जाएगा।",
      date: "2024-08-15",
      time: "10:00 AM",
      location: "सामुदायिक भवन, उत्तर पूर्वी दिल्ली",
      type: "शिविर",
      image: "/images/events/health-camp.jpg",
      status: "UPCOMING",
      expectedAttendees: 400,
      priority: "HIGH",
      organizer: "मनोज तिवारी",
      contactPerson: "डॉ. रेखा सिंह",
      contactNumber: "+91 54321 09876"
    },
    {
      id: 6,
      title: "स्वतंत्रता दिवस समारोह",
      description: "75वें स्वतंत्रता दिवस के उपलक्ष्य में विशेष समारोह का आयोजन किया जाएगा। इस अवसर पर ध्वजारोहण और सांस्कृतिक कार्यक्रम होंगे।",
      date: "2024-08-15",
      time: "08:00 AM",
      location: "डीडीए मैदान, उत्तर पूर्वी दिल्ली",
      type: "समारोह",
      image: "/images/events/independence-day.jpg",
      status: "UPCOMING",
      expectedAttendees: 1000,
      priority: "URGENT",
      organizer: "मनोज तिवारी",
      contactPerson: "राजेश कुमार",
      contactNumber: "+91 98765 43210"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<AgamiKaryakram | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<AgamiKaryakram>>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: '',
    image: '',
    status: 'UPCOMING',
    expectedAttendees: 0,
    priority: 'MEDIUM',
    organizer: 'मनोज तिवारी',
    contactPerson: '',
    contactNumber: ''
  });

  const statusColors = {
    UPCOMING: 'bg-blue-100 text-blue-800 border-blue-200',
    ONGOING: 'bg-green-100 text-green-800 border-green-200',
    COMPLETED: 'bg-gray-100 text-gray-800 border-gray-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
    POSTPONED: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  const priorityColors = {
    LOW: 'bg-gray-100 text-gray-800 border-gray-200',
    MEDIUM: 'bg-blue-100 text-blue-800 border-blue-200',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
    URGENT: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusIcons = {
    UPCOMING: Clock,
    ONGOING: Play,
    COMPLETED: CheckCircle,
    CANCELLED: XCircle,
    POSTPONED: Pause
  };

  const priorityIcons = {
    LOW: AlertCircle,
    MEDIUM: AlertCircle,
    HIGH: Zap,
    URGENT: Zap
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || event.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const handleAddEvent = () => {
    const event: AgamiKaryakram = {
      id: Date.now(),
      title: newEvent.title || '',
      description: newEvent.description || '',
      date: newEvent.date || '',
      time: newEvent.time || '',
      location: newEvent.location || '',
      type: newEvent.type || '',
      image: newEvent.image || '',
      status: newEvent.status || 'UPCOMING',
      expectedAttendees: newEvent.expectedAttendees || 0,
      priority: newEvent.priority || 'MEDIUM',
      organizer: newEvent.organizer || 'मनोज तिवारी',
      contactPerson: newEvent.contactPerson || '',
      contactNumber: newEvent.contactNumber || ''
    };
    
    setEvents(prev => [event, ...prev]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: '',
      image: '',
      status: 'UPCOMING',
      expectedAttendees: 0,
      priority: 'MEDIUM',
      organizer: 'मनोज तिवारी',
      contactPerson: '',
      contactNumber: ''
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  const getStatusCount = (status: string) => {
    return events.filter(event => status === 'all' ? true : event.status === status).length;
  };

  const getPriorityCount = (priority: string) => {
    return events.filter(event => priority === 'all' ? true : event.priority === priority).length;
  };

  const totalExpectedAttendees = events.reduce((sum, event) => sum + (event.expectedAttendees || 0), 0);
  const urgentEvents = events.filter(event => event.priority === 'URGENT').length;

  const eventTypes = Array.from(new Set(events.map(event => event.type)));

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">आगामी कार्यक्रम प्रबंधन</h1>
          <p className="text-gray-600">Manage and track all upcoming events and programs</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Events', count: events.length, color: 'bg-blue-500', icon: Calendar },
            { label: 'Upcoming', count: getStatusCount('UPCOMING'), color: 'bg-blue-500', icon: Clock },
            { label: 'Ongoing', count: getStatusCount('ONGOING'), color: 'bg-green-500', icon: Play },
            { label: 'Completed', count: getStatusCount('COMPLETED'), color: 'bg-gray-500', icon: CheckCircle },
            { label: 'Urgent', count: urgentEvents, color: 'bg-red-500', icon: Zap },
            { label: 'Expected Attendees', count: totalExpectedAttendees, color: 'bg-purple-500', icon: Users }
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
              <h3 className="text-lg font-semibold text-gray-900">Event Types</h3>
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-3">
              {eventTypes.map(type => (
                <div key={type} className="flex justify-between">
                  <span className="text-gray-600">{type}:</span>
                  <span className="font-semibold">
                    {events.filter(event => event.type === type).length}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Priority Breakdown</h3>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Urgent:</span>
                <span className="font-semibold text-red-600">{getPriorityCount('URGENT')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">High:</span>
                <span className="font-semibold text-orange-600">{getPriorityCount('HIGH')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Medium:</span>
                <span className="font-semibold text-blue-600">{getPriorityCount('MEDIUM')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Low:</span>
                <span className="font-semibold text-gray-600">{getPriorityCount('LOW')}</span>
              </div>
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
                  placeholder="Search events by title, description, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="UPCOMING">Upcoming</SelectItem>
                <SelectItem value="ONGOING">Ongoing</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="POSTPONED">Postponed</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {eventTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Add Event Button */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new upcoming event with all details.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter event description"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Date</label>
                      <Input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Time</label>
                      <Input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <Input
                        value={newEvent.type}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                        placeholder="Event type"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select value={newEvent.status} onValueChange={(value) => setNewEvent(prev => ({ ...prev, status: value as AgamiKaryakram['status'] }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UPCOMING">Upcoming</SelectItem>
                          <SelectItem value="ONGOING">Ongoing</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          <SelectItem value="POSTPONED">Postponed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <Select value={newEvent.priority} onValueChange={(value) => setNewEvent(prev => ({ ...prev, priority: value as AgamiKaryakram['priority'] }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LOW">Low</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HIGH">High</SelectItem>
                          <SelectItem value="URGENT">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Expected Attendees</label>
                      <Input
                        type="number"
                        value={newEvent.expectedAttendees}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, expectedAttendees: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Image URL</label>
                      <Input
                        value={newEvent.image}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="Enter image URL"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Contact Person</label>
                      <Input
                        value={newEvent.contactPerson}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, contactPerson: e.target.value }))}
                        placeholder="Contact person name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Contact Number</label>
                      <Input
                        value={newEvent.contactNumber}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, contactNumber: e.target.value }))}
                        placeholder="Contact number"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEvent} className="bg-orange-500 hover:bg-orange-600">
                    Add Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map((event, index) => (
                  <motion.tr
                    key={event.id}
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
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(event.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{event.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{event.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[event.status]}>
                        {React.createElement(statusIcons[event.status], { className: "w-3 h-3" })}
                        {event.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={priorityColors[event.priority]}>
                        {React.createElement(priorityIcons[event.priority], { className: "w-3 h-3" })}
                        {event.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>Expected: {event.expectedAttendees || 0}</div>
                        {event.actualAttendees && (
                          <div className="text-green-600">Actual: {event.actualAttendees}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {/* View Event */}
                        <Dialog open={isViewModalOpen && selectedEvent?.id === event.id} onOpenChange={(open) => {
                          setIsViewModalOpen(open);
                          if (open) setSelectedEvent(event);
                          else setSelectedEvent(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Event Details</DialogTitle>
                              <DialogDescription>
                                Complete information about {event.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Title</label>
                                  <p className="text-sm text-gray-900">{event.title}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Type</label>
                                  <p className="text-sm text-gray-900">{event.type}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Status</label>
                                  <Badge className={statusColors[event.status]}>
                                    {event.status}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Priority</label>
                                  <Badge className={priorityColors[event.priority]}>
                                    {event.priority}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Date</label>
                                  <p className="text-sm text-gray-900">{new Date(event.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Time</label>
                                  <p className="text-sm text-gray-900">{event.time}</p>
                                </div>
                                <div className="col-span-2">
                                  <label className="text-sm font-medium text-gray-500">Location</label>
                                  <p className="text-sm text-gray-900">{event.location}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Description</label>
                                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{event.description}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Organizer</label>
                                  <p className="text-sm text-gray-900">{event.organizer}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Contact Person</label>
                                  <p className="text-sm text-gray-900">{event.contactPerson}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Contact Number</label>
                                  <p className="text-sm text-gray-900">{event.contactNumber}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Expected Attendees</label>
                                  <p className="text-sm text-gray-900">{event.expectedAttendees || 0}</p>
                                </div>
                                {event.actualAttendees && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Actual Attendees</label>
                                    <p className="text-sm text-gray-900">{event.actualAttendees}</p>
                                  </div>
                                )}
                              </div>
                              {event.notes && (
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Notes</label>
                                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{event.notes}</p>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                                Close
                              </Button>
                              <Button 
                                onClick={() => {
                                  setIsViewModalOpen(false);
                                  setSelectedEvent(event);
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
                        <Dialog open={isEditModalOpen && selectedEvent?.id === event.id} onOpenChange={(open) => {
                          setIsEditModalOpen(open);
                          if (open) setSelectedEvent(event);
                          else setSelectedEvent(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Event</DialogTitle>
                              <DialogDescription>
                                Update the details for {event.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                  value={event.title}
                                  onChange={(e) => {
                                    setEvents(prev => prev.map(ev => 
                                      ev.id === event.id ? { ...ev, title: e.target.value } : ev
                                    ));
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Select 
                                    value={event.status} 
                                    onValueChange={(value) => {
                                      setEvents(prev => prev.map(ev => 
                                        ev.id === event.id ? { ...ev, status: value as AgamiKaryakram['status'] } : ev
                                      ));
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="UPCOMING">Upcoming</SelectItem>
                                      <SelectItem value="ONGOING">Ongoing</SelectItem>
                                      <SelectItem value="COMPLETED">Completed</SelectItem>
                                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                      <SelectItem value="POSTPONED">Postponed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Priority</label>
                                  <Select 
                                    value={event.priority} 
                                    onValueChange={(value) => {
                                      setEvents(prev => prev.map(ev => 
                                        ev.id === event.id ? { ...ev, priority: value as AgamiKaryakram['priority'] } : ev
                                      ));
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="LOW">Low</SelectItem>
                                      <SelectItem value="MEDIUM">Medium</SelectItem>
                                      <SelectItem value="HIGH">High</SelectItem>
                                      <SelectItem value="URGENT">Urgent</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Expected Attendees</label>
                                  <Input
                                    type="number"
                                    value={event.expectedAttendees || 0}
                                    onChange={(e) => {
                                      setEvents(prev => prev.map(ev => 
                                        ev.id === event.id ? { ...ev, expectedAttendees: parseInt(e.target.value) || 0 } : ev
                                      ));
                                    }}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Actual Attendees</label>
                                  <Input
                                    type="number"
                                    value={event.actualAttendees || ''}
                                    onChange={(e) => {
                                      setEvents(prev => prev.map(ev => 
                                        ev.id === event.id ? { ...ev, actualAttendees: parseInt(e.target.value) || undefined } : ev
                                      ));
                                    }}
                                    placeholder="Enter after event"
                                  />
                                </div>
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
                        <Dialog open={isDeleteModalOpen && selectedEvent?.id === event.id} onOpenChange={(open) => {
                          setIsDeleteModalOpen(open);
                          if (open) setSelectedEvent(event);
                          else setSelectedEvent(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Event</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete &quot;{event.title}&quot;? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button 
                                variant="destructive" 
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                Delete Event
                              </Button>
                            </DialogFooter>
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