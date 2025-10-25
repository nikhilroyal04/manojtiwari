"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Search,
  Plus,
  Edit,
  Eye,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  Users,
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
import {
  fetchDarbars,
  selectDarbars,
  addDarbar,
  updateDarbar,
  deleteDarbar,
  selectDarbarError,
  selectDarbarLoading
} from '@/lib/redux/features/darbarSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';

// Import the JantaDarbar type from the slice for type safety
import type { JantaDarbar } from '@/lib/redux/features/darbarSlice';

export default function JantaDarbarPage() {
  const dispatch = useDispatch<AppDispatch>();
  const jantaDarbars: JantaDarbar[] = useSelector(selectDarbars) || [];
  const error = useSelector(selectDarbarError)
  const loading = useSelector(selectDarbarLoading)

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedJantaDarbar, setSelectedJantaDarbar] = useState<JantaDarbar | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [editImageFiles, setEditImageFiles] = useState<File[]>([]);
  const [existingImagesToKeep, setExistingImagesToKeep] = useState<string[]>([]);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-IN', options);
  };

  // For Add
  const [newJantaDarbar, setNewJantaDarbar] = useState<Partial<JantaDarbar>>({
    title: '',
    agenda: '',
    date: '',
    location: 'North East Delhi',
    status: 'open',
    attendees: 0,
    issues: 0,
    resolved: 0,
  });

  // For Edit
  const [editJantaDarbar, setEditJantaDarbar] = useState<Partial<JantaDarbar>>({
    _id: '',
    title: '',
    agenda: '',
    date: '',
    location: '',
    status: 'open',
    attendees: 0,
    issues: 0,
    resolved: 0,
  });

  useEffect(() => {
    dispatch(fetchDarbars());
  }, [dispatch]);

  // Status color and icon mapping
  const statusColors: Record<string, string> = {
    open: 'bg-blue-100 text-blue-800 border-blue-200',
    ongoing: 'bg-green-100 text-green-800 border-green-200',
    close: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const statusIcons: Record<string, React.ElementType> = {
    open: AlertCircle,
    ongoing: CheckCircle,
    close: XCircle,
  };

  // Filtered list
  const filteredJantaDarbars = jantaDarbars.filter((jd) => {
    const matchesSearch =
      (jd.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (jd.agenda?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (jd.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || jd.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats
  const getStatusCount = (status: string) => {
    if (status === 'all') return jantaDarbars.length;
    return jantaDarbars.filter((jd) => jd.status === status).length;
  };

  const totalAttendees = jantaDarbars.reduce((sum, jd) => sum + (jd.attendees || 0), 0);

  // Handle multiple image selection for Add
  const handleNewImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = newImageFiles.length + files.length;
    
    if (totalImages > 5) {
      alert(`Maximum 5 images allowed / Maximum 5 images hi upload kar sakte hain. Aapne ${totalImages} select kiye hain.`);
      return;
    }
    
    // Add new files to existing files
    setNewImageFiles(prev => [...prev, ...files]);
    // Clear the input so same file can be selected again if needed
    e.target.value = '';
  };

  // Handle multiple image selection for Edit
  const handleEditImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = existingImagesToKeep.length + editImageFiles.length + files.length;
    
    if (totalImages > 5) {
      alert(`Maximum 5 images allowed / Maximum 5 images hi upload kar sakte hain. Total images: ${totalImages}`);
      return;
    }
    
    // Add new files to existing files
    setEditImageFiles(prev => [...prev, ...files]);
    // Clear the input so same file can be selected again if needed
    e.target.value = '';
  };

  // Remove image from new images
  const removeNewImage = (index: number) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Remove image from edit images
  const removeEditImage = (index: number) => {
    setEditImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Remove existing image (mark for deletion)
  const removeExistingImage = (imageUrl: string) => {
    setExistingImagesToKeep(prev => prev.filter(url => url !== imageUrl));
  };

  // Add Janta Darbar
  const handleAddJantaDarbar = async () => {
    // Validate required fields
    if (!newJantaDarbar.title || !newJantaDarbar.date || !newJantaDarbar.location) {
      alert('Please fill in all required fields (title, date, location).');
      return;
    }
    try {
      // Pass all images array to upload to S3
      await dispatch(addDarbar(newJantaDarbar as JantaDarbar, newImageFiles.length > 0 ? newImageFiles : null));
      setIsAddModalOpen(false);
      setNewImageFiles([]);
      setNewJantaDarbar({
        title: '',
        agenda: '',
        date: '',
        location: 'North East Delhi',
        status: 'open',
        attendees: 0,
        issues: 0,
        resolved: 0,
      });
      dispatch(fetchDarbars());
    } catch (err) {
      console.log(err,'Failed to add event.');
    }
  };

  // Prepare Edit Modal
  const openEditModal = (jd: JantaDarbar) => {
    setEditJantaDarbar({
      _id: jd._id,
      title: jd.title,
      agenda: jd.agenda,
      date: jd.date,
      location: jd.location,
      status: jd.status,
      attendees: jd.attendees,
      issues: jd.issues,
      resolved: jd.resolved,
    });
    setSelectedJantaDarbar(jd);
    // Initialize existing images to keep with all current images
    setExistingImagesToKeep(jd.images || []);
    setIsEditModalOpen(true);
  };

  // Update Janta Darbar
  const handleUpdateJantaDarbar = async () => {
    if (!editJantaDarbar._id) return;
    try {
      // Combine existing images to keep with new images
      const updatedDarbar = {
        ...editJantaDarbar,
        existingImages: existingImagesToKeep // Send existing images that should be kept
      };
      
      // Pass all images array to upload to S3
      await dispatch(updateDarbar(editJantaDarbar._id , updatedDarbar as JantaDarbar, editImageFiles.length > 0 ? editImageFiles : null));
      setIsEditModalOpen(false);
      setSelectedJantaDarbar(null);
      setEditImageFiles([]);
      setExistingImagesToKeep([]);
      setEditJantaDarbar({
        _id: '',
        title: '',
        agenda: '',
        date: '',
        location: '',
        status: 'open',
        attendees: 0,
        issues: 0,
        resolved: 0,
      });
      dispatch(fetchDarbars());
    } catch (err) {
      console.log(err,'Failed to update event.');
    }
  };

  // Delete Janta Darbar
  const handleDeleteJantaDarbar = async (id?: string) => {
    if (!id) return;
    try {
      await dispatch(deleteDarbar(id));
      setIsDeleteModalOpen(false);
      setSelectedJantaDarbar(null);
      dispatch(fetchDarbars());
    } catch (err) {
      console.log(err,'Failed to delete event.');
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">जनता दरबार प्रबंधन</h1>
          <p className="text-gray-600">Manage and track all Janta Darbar events</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Events', count: jantaDarbars.length, color: 'bg-blue-500', icon: Calendar },
            { label: 'Open', count: getStatusCount('open'), color: 'bg-blue-500', icon: AlertCircle },
            { label: 'Ongoing', count: getStatusCount('ongoing'), color: 'bg-green-500', icon: CheckCircle },
            { label: 'Closed', count: getStatusCount('close'), color: 'bg-gray-500', icon: XCircle },
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
                <SelectItem value="all">All Status / सभी</SelectItem>
                <SelectItem value="open">Open / खुला</SelectItem>
                <SelectItem value="ongoing">Ongoing / चल रहा</SelectItem>
                <SelectItem value="close">Closed / बंद</SelectItem>
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
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Naya Janta Darbar Event Add Karein / Add New Event</DialogTitle>
                  <DialogDescription>
                    Janta darbar event ki saari details enter karein.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title / शीर्षक</label>
                    <Input
                      value={newJantaDarbar.title || ''}
                      onChange={(e) => setNewJantaDarbar((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Event ka title likhen"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Agenda / Description / विवरण</label>
                    <textarea
                      value={newJantaDarbar.agenda || ''}
                      onChange={(e) => setNewJantaDarbar((prev) => ({ ...prev, agenda: e.target.value }))}
                      placeholder="Event ka agenda ya description"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Date & Time / तारीख और समय</label>
                      <Input
                        type="datetime-local"
                        value={newJantaDarbar.date || ''}
                        onChange={(e) => setNewJantaDarbar((prev) => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location / स्थान</label>
                      <Input
                        value={newJantaDarbar.location || ''}
                        onChange={(e) => setNewJantaDarbar((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Location enter karein"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Status / स्थिति</label>
                      <Select
                        value={newJantaDarbar.status || 'open'}
                        onValueChange={(value) =>
                          setNewJantaDarbar((prev) => ({
                            ...prev,
                            status: value as JantaDarbar['status'],
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open / खुला</SelectItem>
                          <SelectItem value="ongoing">Ongoing / चल रहा</SelectItem>
                          <SelectItem value="close">Closed / बंद</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Attendees / उपस्थिति</label>
                      <Input
                        type="number"
                        value={newJantaDarbar.attendees || 0}
                        onChange={(e) =>
                          setNewJantaDarbar((prev) => ({
                            ...prev,
                            attendees: parseInt(e.target.value) || 0,
                          }))
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Issues Raised / उठाए गए मुद्दे</label>
                    <Input
                      type="number"
                      value={newJantaDarbar.issues || 0}
                      onChange={(e) => setNewJantaDarbar((prev) => ({ ...prev, issues: parseInt(e.target.value) || 0 }))}
                      placeholder="Kitne issues raise hue"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Resolved Issues / हल किए गए मुद्दे</label>
                    <Input
                      type="number"
                      value={newJantaDarbar.resolved || 0}
                      onChange={(e) => setNewJantaDarbar((prev) => ({ ...prev, resolved: parseInt(e.target.value) || 0 }))}
                      placeholder="Kitne issues resolve hue"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Images / छवियाँ अपलोड करें (Max 5)</label>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleNewImagesChange}
                    />
                    {newImageFiles.length > 0 && (
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {newImageFiles.map((file, index) => (
                          <div key={index} className="relative group h-20">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover rounded-md border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                            {index === 0 && (
                              <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                                Main
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel / रद्द करें
                  </Button>
                  <Button onClick={handleAddJantaDarbar} className="bg-orange-500 hover:bg-orange-600">
                    Add Event / जोड़ें
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJantaDarbars.map((jd, index) => (
                  <motion.tr
                    key={jd._id || jd.title + jd.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {jd.mainImage ? (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                            <Image
                              src={jd.mainImage}
                              alt={jd.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-orange-600" />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{jd.title}</div>
                          {jd.images && jd.images.length > 1 && (
                            <div className="text-xs text-gray-500 mt-1">
                              📷 {jd.images.length} images
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{jd.agenda}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(jd.date)}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {jd.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[jd.status]}>
                        {(() => {
                          const Icon = statusIcons[jd.status];
                          if (!Icon) return null; // Don't render icon if undefined
                          return <Icon className="w-3 h-3" />;
                        })()}
                        {jd.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>👥 {jd.attendees || 0}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {/* View Event */}
                        <Dialog
                          open={isViewModalOpen && selectedJantaDarbar?._id === jd._id}
                          onOpenChange={(open) => {
                            setIsViewModalOpen(open);
                            if (open) setSelectedJantaDarbar(jd);
                            else setSelectedJantaDarbar(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Event Details / विवरण</DialogTitle>
                              <DialogDescription>
                                {jd.title} ki puri jaankari
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              {/* Images Gallery */}
                              {jd.images && jd.images.length > 0 && (
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Event Images</label>
                                  <div className="mt-2 grid grid-cols-4 gap-2">
                                    {jd.images.map((img, index) => (
                                      <div key={index} className="relative h-24">
                                        <Image
                                          src={img}
                                          alt={`Event ${index + 1}`}
                                          fill
                                          className="object-cover rounded-md border-2 border-gray-200"
                                          unoptimized
                                        />
                                        {img === jd.mainImage && (
                                          <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                            Main Image
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
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
                                  <p className="text-sm text-gray-900">{formatDate(jd.date)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Location</label>
                                  <p className="text-sm text-gray-900">{jd.location}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Description</label>
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
                                  <label className="text-sm font-medium text-gray-500">Resolved Issues</label>
                                  <p className="text-sm text-gray-900">{jd.resolved || 0}</p>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                                Close
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Edit Event */}
                        <Dialog
                          open={isEditModalOpen && selectedJantaDarbar?._id === jd._id}
                          onOpenChange={(open) => {
                            setIsEditModalOpen(open);
                            if (open) openEditModal(jd);
                            else {
                              setIsEditModalOpen(false);
                              setSelectedJantaDarbar(null);
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => openEditModal(jd)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Event Edit Karein / Edit Event</DialogTitle>
                              <DialogDescription>
                                {editJantaDarbar.title} ki details update karein
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Title / शीर्षक</label>
                                <Input
                                  value={editJantaDarbar.title || ''}
                                  onChange={e => setEditJantaDarbar(prev => ({ ...prev, title: e.target.value }))}
                                  placeholder="Event ka title"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Agenda / Description / विवरण</label>
                                <textarea
                                  value={editJantaDarbar.agenda || ''}
                                  onChange={e => setEditJantaDarbar(prev => ({ ...prev, agenda: e.target.value }))}
                                  placeholder="Event ka agenda"
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                  rows={3}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Date & Time / तारीख और समय</label>
                                  <Input
                                    type="datetime-local"
                                    value={editJantaDarbar.date || ''}
                                    onChange={e => setEditJantaDarbar(prev => ({ ...prev, date: e.target.value }))}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Location / स्थान</label>
                                  <Input
                                    value={editJantaDarbar.location || ''}
                                    onChange={e => setEditJantaDarbar(prev => ({ ...prev, location: e.target.value }))}
                                    placeholder="Location"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Status / स्थिति</label>
                                  <Select
                                    value={editJantaDarbar.status || 'open'}
                                    onValueChange={value =>
                                      setEditJantaDarbar(prev => ({
                                        ...prev,
                                        status: value as JantaDarbar['status'],
                                      }))
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="open">Open / खुला</SelectItem>
                                      <SelectItem value="ongoing">Ongoing / चल रहा</SelectItem>
                                      <SelectItem value="close">Closed / बंद</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Attendees / उपस्थिति</label>
                                  <Input
                                    type="number"
                                    value={editJantaDarbar.attendees || 0}
                                    onChange={e =>
                                      setEditJantaDarbar(prev => ({
                                        ...prev,
                                        attendees: parseInt(e.target.value) || 0,
                                      }))
                                    }
                                    placeholder="0"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Issues Raised / उठाए गए मुद्दे</label>
                                <Input
                                  type="number"
                                  value={editJantaDarbar.issues || 0}
                                  onChange={e => setEditJantaDarbar(prev => ({ ...prev, issues: parseInt(e.target.value) || 0 }))}
                                  placeholder="Number of issues"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Resolved Issues / हल किए गए मुद्दे</label>
                                <Input
                                  type="number"
                                  value={editJantaDarbar.resolved || 0}
                                  onChange={e => setEditJantaDarbar(prev => ({ ...prev, resolved: parseInt(e.target.value) || 0 }))}
                                  placeholder="Number resolved"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Images / छवियाँ अपलोड करें (Max 5)</label>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={handleEditImagesChange}
                                />
                                {/* Show current images */}
                                {selectedJantaDarbar?.images && selectedJantaDarbar.images.length > 0 && (
                                  <div className="mt-3">
                                    <p className="text-xs text-gray-500 mb-2">Current Images / Mujoodah Images:</p>
                                    <div className="grid grid-cols-5 gap-2">
                                      {selectedJantaDarbar.images.map((img, index) => {
                                        const isKept = existingImagesToKeep.includes(img);
                                        return (
                                          <div key={index} className={`relative group h-20 ${!isKept ? 'opacity-50' : ''}`}>
                                            <Image
                                              src={img}
                                              alt={`Current ${index + 1}`}
                                              fill
                                              className={`object-cover rounded-md border-2 ${isKept ? 'border-gray-200' : 'border-red-300'}`}
                                              unoptimized
                                            />
                                            {isKept ? (
                                              <button
                                                type="button"
                                                onClick={() => removeExistingImage(img)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Remove / Hatao"
                                              >
                                                ×
                                              </button>
                                            ) : (
                                              <button
                                                type="button"
                                                onClick={() => setExistingImagesToKeep(prev => [...prev, img])}
                                                className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Restore / Wapas lao"
                                              >
                                                ↻
                                              </button>
                                            )}
                                            {img === selectedJantaDarbar.mainImage && isKept && (
                                              <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                                                Main
                                              </span>
                                            )}
                                            {!isKept && (
                                              <span className="absolute bottom-1 left-1 bg-red-500 text-white text-xs px-1 rounded">
                                                Removed
                                              </span>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                                {/* Show new images to upload */}
                                {editImageFiles.length > 0 && (
                                  <div className="mt-3">
                                    <p className="text-xs text-gray-500 mb-2">New Images to Upload:</p>
                                    <div className="grid grid-cols-5 gap-2">
                                      {editImageFiles.map((file, index) => (
                                        <div key={index} className="relative group h-20">
                                          <Image
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index + 1}`}
                                            fill
                                            className="object-cover rounded-md border-2 border-green-300"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => removeEditImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                          >
                                            ×
                                          </button>
                                          {index === 0 && (
                                            <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                                              Main
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Cancel / रद्द करें
                              </Button>
                              <Button
                                onClick={handleUpdateJantaDarbar}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Update / अपडेट करें
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Delete Event */}
                        <Dialog
                          open={isDeleteModalOpen && selectedJantaDarbar?._id === jd._id}
                          onOpenChange={(open) => {
                            setIsDeleteModalOpen(open);
                            if (open) setSelectedJantaDarbar(jd);
                            else setSelectedJantaDarbar(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Event / इवेंट हटाएं</DialogTitle>
                              <DialogDescription>
                                Kya aap sach mein &quot;{jd.title}&quot; ko delete karna chahte hain? Yeh action undo nahi ho sakta.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Cancel / रद्द करें
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleDeleteJantaDarbar(jd._id)}
                              >
                                Delete / हटाएं
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