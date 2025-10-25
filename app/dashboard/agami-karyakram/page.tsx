"use client";

import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchKaryakram, selectLoading, selectKaryakram, selectError, addKaryakram, updateKaryakram, deleteKaryakram, Karyakram } from '@/lib/redux/features/karyakramSlice';
import { AppDispatch } from '@/lib/redux/store';

export default function AgamiKaryakram() {

  const dispatch = useDispatch<AppDispatch>();
  const karyakram = useSelector(selectKaryakram);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<Karyakram | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<Partial<Karyakram>>({});
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
    const [newEvent, setNewEvent] = useState<Partial<Karyakram>>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: '',
    image: '',
    status: 'upcoming',
    expectedAttendees: 0,
    priority: 'medium',
    organizer: 'मनोज तिवारी',
    contactPerson: '',
    contactNumber: ''
  });

  useEffect(() => {
    dispatch(fetchKaryakram());
  }, [dispatch]);

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
    ongoing: 'bg-green-100 text-green-800 border-green-200',
    completed: 'bg-gray-100 text-gray-800 border-gray-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    postponed: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800 border-gray-200',
    medium: 'bg-blue-100 text-blue-800 border-blue-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    urgent: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusIcons = {
    upcoming: Clock,
    ongoing: Play,
    completed: CheckCircle,
    cancelled: XCircle,
    postponed: Pause
  };

  const priorityIcons = {
    low: AlertCircle,
    medium: AlertCircle,
    high: Zap,
    urgent: Zap
  };

  const filteredEvents = karyakram.filter(event => {
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
    const event: Karyakram = {
      title: newEvent.title || '',
      description: newEvent.description || '',
      date: newEvent.date || '',
      time: newEvent.time || '',
      location: newEvent.location || '',
      type: newEvent.type || '',
      image: newEvent.image || '',
      status: newEvent.status || 'upcoming',
      expectedAttendees: newEvent.expectedAttendees || 0,
      priority: newEvent.priority || 'medium',
      organizer: newEvent.organizer || 'मनोज तिवारी',
      contactPerson: newEvent.contactPerson || '',
      contactNumber: newEvent.contactNumber || ''
    };
    
    dispatch(addKaryakram(event, newImageFile));
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: '',
      image: '',
      status: 'upcoming',
      expectedAttendees: 0,
      priority: 'medium',
      organizer: 'मनोज तिवारी',
      contactPerson: '',
      contactNumber: ''
    });
    setNewImageFile(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteEvent = (id: string | undefined) => {
    if (id) {
      dispatch(deleteKaryakram(id));
    }
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  const getStatusCount = (status: string) => {
    return karyakram.filter(event => status === 'all' ? true : event.status === status).length;
  };

  const getPriorityCount = (priority: string) => {
    return karyakram.filter(event => priority === 'all' ? true : event.priority === priority).length;
  };

  const totalExpectedAttendees = karyakram.reduce((sum, event) => sum + (event.expectedAttendees || 0), 0);

  const eventTypes = Array.from(new Set(karyakram.map(event => event.type)));

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

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
            { label: 'Total Events', count: karyakram.length, color: 'bg-blue-500', icon: Calendar },
            { label: 'Upcoming', count: getStatusCount('upcoming'), color: 'bg-blue-500', icon: Clock },
            { label: 'Ongoing', count: getStatusCount('ongoing'), color: 'bg-green-500', icon: Play },
            { label: 'Completed', count: getStatusCount('completed'), color: 'bg-gray-500', icon: CheckCircle },
            { label: 'Urgent', count: getPriorityCount('urgent'), color: 'bg-red-500', icon: Zap },
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
                    {karyakram.filter(event => event.type === type).length}
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
                <span className="font-semibold text-red-600">{getPriorityCount('urgent')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">High:</span>
                <span className="font-semibold text-orange-600">{getPriorityCount('high')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Medium:</span>
                <span className="font-semibold text-blue-600">{getPriorityCount('medium')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Low:</span>
                <span className="font-semibold text-gray-600">{getPriorityCount('low')}</span>
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
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="postponed">Postponed</SelectItem>
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
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
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
                      <Select value={newEvent.status} onValueChange={(value) => setNewEvent(prev => ({ ...prev, status: value as Karyakram['status'] }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="postponed">Postponed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <Select value={newEvent.priority} onValueChange={(value) => setNewEvent(prev => ({ ...prev, priority: value as Karyakram['priority'] }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
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
                      <label className="text-sm font-medium">Event Image</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
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
                    key={event._id}
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
                        <Dialog open={isViewModalOpen && selectedEvent?._id === event._id} onOpenChange={(open) => {
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
                                  setEditEvent(event);
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
                        <Dialog open={isEditModalOpen && selectedEvent?._id === event._id} onOpenChange={(open) => {
                          setIsEditModalOpen(open);
                          if (open) {
                            setSelectedEvent(event);
                            setEditEvent(event);
                          } else {
                            setSelectedEvent(null);
                            setEditEvent({});
                          }
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
                                  value={editEvent.title ?? ''}
                                  onChange={(e) => setEditEvent(prev => ({ ...prev, title: e.target.value }))}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Select 
                                    value={editEvent.status ?? 'upcoming'} 
                                    onValueChange={(value) => {
                                      setEditEvent(prev => ({ ...prev, status: value as Karyakram['status'] }));
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="upcoming">Upcoming</SelectItem>
                                      <SelectItem value="ongoing">Ongoing</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                      <SelectItem value="postponed">Postponed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Priority</label>
                                  <Select 
                                    value={editEvent.priority ?? 'medium'} 
                                    onValueChange={(value) => {
                                      setEditEvent(prev => ({ ...prev, priority: value as Karyakram['priority'] }));
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="low">Low</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="urgent">Urgent</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Expected Attendees</label>
                                  <Input
                                    type="number"
                                    value={editEvent.expectedAttendees ?? 0}
                                    onChange={(e) => setEditEvent(prev => ({ ...prev, expectedAttendees: parseInt(e.target.value) || 0 }))}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Actual Attendees</label>
                                  <Input
                                    type="number"
                                    value={editEvent.actualAttendees ?? ''}
                                    onChange={(e) => setEditEvent(prev => ({ ...prev, actualAttendees: parseInt(e.target.value) || undefined }))}
                                    placeholder="Enter after event"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Update Event Image</label>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => setEditImageFile(e.target.files?.[0] || null)}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button 
                                onClick={() => {
                                  if (selectedEvent?._id) {
                                    const payload: Karyakram = {
                                      ...selectedEvent,
                                      ...editEvent,
                                    } as Karyakram;
                                    dispatch(updateKaryakram(selectedEvent._id, payload, editImageFile));
                                  }
                                  setIsEditModalOpen(false);
                                  setSelectedEvent(null);
                                  setEditEvent({});
                                  setEditImageFile(null);
                                }}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Update Event
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Delete Event */}
                        <Dialog open={isDeleteModalOpen && selectedEvent?._id === event._id} onOpenChange={(open) => {
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
                                onClick={() => handleDeleteEvent(event._id)}
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