"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Search, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  Target,
  Award,
  Activity,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/lib/redux/store'
import { fetchRailayan, selectRailayan, selectRailayanError, selectRailayanLoading, addRailayan, updateRailayan, deleteRailayan } from '@/lib/redux/features/railayanSlice'
import type { ChunaviRailayan } from '@/lib/redux/features/railayanSlice'

export default function ChunaviRailayan() {
  const dispatch = useDispatch<AppDispatch>()
  const campaigns: ChunaviRailayan[] = useSelector(selectRailayan) || [];
  const loading = useSelector(selectRailayanLoading);
  const error = useSelector(selectRailayanError);

  useEffect(() => {
    dispatch(fetchRailayan());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [campaignTypeFilter, setCampaignTypeFilter] = useState('all')
  const [viewModal, setViewModal] = useState<string | null>(null)
  const [editModal, setEditModal] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState<string | null>(null)
  const [addModal, setAddModal] = useState(false)
  const [newImageFiles, setNewImageFiles] = useState<File[]>([])
  const [editImageFiles, setEditImageFiles] = useState<File[]>([])
  const [existingImagesToKeep, setExistingImagesToKeep] = useState<string[]>([])
  const [newRailayan, setNewRailayan] = useState<Partial<ChunaviRailayan>>({})
  const [editRailayan, setEditRailayan] = useState<Partial<ChunaviRailayan>>({})

  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-IN', options);
  };

  // Format time
  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    return timeString;
  };

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

  // Filter campaigns based on search and filters
  const filteredData = campaigns.filter((campaign: ChunaviRailayan) => {
    const matchesSearch = (campaign.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (campaign.location?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || campaign.priority === priorityFilter
    const matchesType = campaignTypeFilter === 'all' || campaign.campaignType === campaignTypeFilter
    
    return matchesSearch && matchesStatus && matchesPriority && matchesType
  })

  // Calculate stats from actual data
  const stats = {
    total: campaigns.length,
    upcoming: campaigns.filter((item: ChunaviRailayan) => item.status === 'upcoming').length,
    ongoing: campaigns.filter((item: ChunaviRailayan) => item.status === 'ongoing').length,
    completed: campaigns.filter((item: ChunaviRailayan) => item.status === 'completed').length,
    totalBudget: campaigns.reduce((sum: number, item: ChunaviRailayan) => sum + (item.budget ?? 0), 0),
    totalExpectedCrowd: campaigns.reduce((sum: number, item: ChunaviRailayan) => sum + (item.expectedCrowd ?? 0), 0),
    totalActualCrowd: campaigns.filter((item: ChunaviRailayan) => item.actualCrowd !== undefined && item.actualCrowd !== null).reduce((sum: number, item: ChunaviRailayan) => sum + (item.actualCrowd ?? 0), 0)
  }

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCampaignTypeIcon = (type: string | undefined) => {
    switch (type) {
      case 'roadshow': return <Activity className="w-4 h-4" />
      case 'rally': return <Users className="w-4 h-4" />
      case 'meeting': return <Target className="w-4 h-4" />
      case 'door-to-door': return <Award className="w-4 h-4" />
      case 'media': return <Globe className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-0 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">चुनावी रैलियां</h1>
          <p className="text-gray-600 mt-1">चुनावी अभियान और रैलियों का प्रबंधन</p>
        </div>
        <Button onClick={() => setAddModal(true)} className="bg-primary">
          <Plus className="w-4 h-4 mr-1" />
          नई रैली जोड़ें
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">कुल रैलियां</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">आगामी</p>
              <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">कुल बजट</p>
              <p className="text-2xl font-bold text-green-600">₹{(stats.totalBudget / 100000).toFixed(1)}L</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">कुल भीड़</p>
              <p className="text-2xl font-bold text-purple-600">{(stats.totalExpectedCrowd / 1000).toFixed(1)}K</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">स्थिति अनुसार</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">आगामी</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">{stats.upcoming}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">चल रही</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">{stats.ongoing}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">पूर्ण</span>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">{stats.completed}</Badge>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">भीड़ आंकड़े</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">अपेक्षित</span>
              <span className="text-sm font-medium">{(stats.totalExpectedCrowd / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">वास्तविक</span>
              <span className="text-sm font-medium">{(stats.totalActualCrowd / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">उपस्थिति दर</span>
              <span className="text-sm font-medium text-green-600">
                {stats.totalExpectedCrowd > 0 ? ((stats.totalActualCrowd / stats.totalExpectedCrowd) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-lg shadow-sm border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">प्रदर्शन</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">सफलता दर</span>
              <span className="text-sm font-medium text-green-600">
                {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">औसत बजट</span>
              <span className="text-sm font-medium">₹{stats.total > 0 ? (stats.totalBudget / stats.total / 100000).toFixed(1) : '0.0'}L</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">औसत भीड़</span>
              <span className="text-sm font-medium">{stats.total > 0 ? (stats.totalExpectedCrowd / stats.total / 1000).toFixed(1) : '0.0'}K</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="रैली या स्थान खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="स्थिति फ़िल्टर" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">सभी स्थिति</SelectItem>
              <SelectItem value="upcoming">आगामी</SelectItem>
              <SelectItem value="ongoing">चल रही</SelectItem>
              <SelectItem value="completed">पूर्ण</SelectItem>
              <SelectItem value="cancelled">रद्द</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="प्राथमिकता फ़िल्टर" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">सभी प्राथमिकता</SelectItem>
              <SelectItem value="high">उच्च</SelectItem>
              <SelectItem value="medium">मध्यम</SelectItem>
              <SelectItem value="low">कम</SelectItem>
            </SelectContent>
          </Select>
          <Select value={campaignTypeFilter} onValueChange={setCampaignTypeFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="प्रकार फ़िल्टर" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">सभी प्रकार</SelectItem>
              <SelectItem value="roadshow">रोड शो</SelectItem>
              <SelectItem value="rally">रैली</SelectItem>
              <SelectItem value="meeting">बैठक</SelectItem>
              <SelectItem value="door-to-door">दर-दर</SelectItem>
              <SelectItem value="media">मीडिया</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">रैली</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">स्थान & तारीख</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">भीड़</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">स्थिति</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">प्राथमिकता</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">बजट</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">कार्य</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((campaign: ChunaviRailayan, index) => (
                <motion.tr
                  key={campaign._id ?? index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {getCampaignTypeIcon(campaign.campaignType)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                        <div className="text-sm text-gray-500">{campaign.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.location}</div>
                    <div className="text-sm text-gray-500">{campaign.date} • {campaign.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {campaign.actualCrowd !== undefined && campaign.actualCrowd !== null ? (
                        <span className="text-green-600">{campaign.actualCrowd.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-600">{(campaign.expectedCrowd ?? 0).toLocaleString()}</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">अपेक्षित: {(campaign.expectedCrowd ?? 0).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status === 'upcoming' && 'आगामी'}
                      {campaign.status === 'ongoing' && 'चल रही'}
                      {campaign.status === 'completed' && 'पूर्ण'}
                      {campaign.status === 'cancelled' && 'रद्द'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getPriorityColor(campaign.priority)}>
                      {campaign.priority === 'high' && 'उच्च'}
                      {campaign.priority === 'medium' && 'मध्यम'}
                      {campaign.priority === 'low' && 'कम'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{((campaign.budget ?? 0) / 100000).toFixed(1)}L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewModal(campaign._id ?? null)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditModal(campaign._id ?? null)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteModal(campaign._id ?? null)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <Dialog open={!!viewModal} onOpenChange={() => setViewModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Rally Details / रैली विवरण</DialogTitle>
          </DialogHeader>
          {viewModal && (
            <div className="space-y-4">
              {(() => {
                const campaign = campaigns.find(c => c._id === viewModal)
                if (!campaign) return null
                
                return (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status === 'upcoming' && 'Upcoming / आगामी'}
                          {campaign.status === 'ongoing' && 'Ongoing / चल रही'}
                          {campaign.status === 'completed' && 'Completed / पूर्ण'}
                          {campaign.status === 'cancelled' && 'Cancelled / रद्द'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Location / स्थान</p>
                        <p className="text-sm text-gray-900">{campaign.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Date & Time / तारीख और समय</p>
                        <p className="text-sm text-gray-900">{formatDate(campaign.date)} • {formatTime(campaign.time)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Expected Crowd / अपेक्षित भीड़</p>
                        <p className="text-sm text-gray-900">{(campaign.expectedCrowd ?? 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Budget / बजट</p>
                        <p className="text-sm text-gray-900">₹{((campaign.budget ?? 0) / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                    
                    {campaign.targetAudience && campaign.targetAudience.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Target Audience / लक्षित दर्शक</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {campaign.targetAudience.map((audience, index) => (
                            <Badge key={index} variant="outline">{audience}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {campaign.keySpeakers && campaign.keySpeakers.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Key Speakers / मुख्य वक्ता</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {campaign.keySpeakers.map((speaker, index) => (
                            <Badge key={index} variant="secondary">{speaker}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {campaign.actualCrowd !== undefined && campaign.actualCrowd !== null && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Actual Crowd / वास्तविक भीड़</p>
                        <p className="text-sm text-green-600">{campaign.actualCrowd.toLocaleString()}</p>
                      </div>
                    )}
                    
                    {campaign.feedback && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">Feedback / फीडबैक</p>
                        <p className="text-sm text-gray-900">{campaign.feedback}</p>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!editModal} onOpenChange={() => setEditModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>रैली संपादित करें</DialogTitle>
          </DialogHeader>
          {editModal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Title / शीर्षक</label>
                  <Input defaultValue={campaigns.find(c => c._id === editModal)?.title ?? ''} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Location / स्थान</label>
                  <Input defaultValue={campaigns.find(c => c._id === editModal)?.location ?? ''} />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Description / विवरण</label>
                <Input defaultValue={campaigns.find(c => c._id === editModal)?.description ?? ''} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Date / तारीख</label>
                  <Input type="date" defaultValue={campaigns.find(c => c._id === editModal)?.date ?? ''} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Time / समय</label>
                  <Input type="time" defaultValue={campaigns.find(c => c._id === editModal)?.time ?? ''} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Expected Crowd / अपेक्षित भीड़</label>
                  <Input type="number" defaultValue={campaigns.find(c => c._id === editModal)?.expectedCrowd ?? ''} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Budget / बजट (₹)</label>
                  <Input type="number" defaultValue={campaigns.find(c => c._id === editModal)?.budget ?? ''} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Status / स्थिति</label>
                  <Select defaultValue={campaigns.find(c => c._id === editModal)?.status ?? ''}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming / आगामी</SelectItem>
                      <SelectItem value="ongoing">Ongoing / चल रही</SelectItem>
                      <SelectItem value="completed">Completed / पूर्ण</SelectItem>
                      <SelectItem value="cancelled">Cancelled / रद्द</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Priority / प्राथमिकता</label>
                  <Select defaultValue={campaigns.find(c => c._id === editModal)?.priority ?? ''}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High / उच्च</SelectItem>
                      <SelectItem value="medium">Medium / मध्यम</SelectItem>
                      <SelectItem value="low">Low / कम</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Images / छवियाँ अपलोड करें (Max 5)</label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleEditImagesChange}
                />
                {/* Show current images */}
                {editModal && campaigns.find(c => c._id === editModal)?.images && campaigns.find(c => c._id === editModal)!.images!.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">Current Images:</p>
                    <div className="grid grid-cols-5 gap-2">
                      {campaigns.find(c => c._id === editModal)!.images!.map((img, index) => {
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
                              >
                                ×
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setExistingImagesToKeep(prev => [...prev, img])}
                                className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ↻
                              </button>
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
                {/* Show new images */}
                {editImageFiles.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-2">New Images:</p>
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
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {
                  setEditModal(null);
                  setEditImageFiles([]);
                  setExistingImagesToKeep([]);
                }}>
                  Cancel / रद्द करें
                </Button>
                <Button onClick={async () => {
                  if (editModal) {
                    const campaign = campaigns.find(c => c._id === editModal);
                    if (campaign) {
                      // Initialize existing images on first edit
                      if (existingImagesToKeep.length === 0 && campaign.images) {
                        setExistingImagesToKeep(campaign.images);
                      }
                      const updatedCampaign = {
                        ...campaign,
                        ...editRailayan,
                        existingImages: existingImagesToKeep
                      };
                      await dispatch(updateRailayan(editModal, updatedCampaign as ChunaviRailayan, editImageFiles.length > 0 ? editImageFiles : null));
                      setEditModal(null);
                      setEditRailayan({});
                      setEditImageFiles([]);
                      setExistingImagesToKeep([]);
                      dispatch(fetchRailayan());
                    }
                  }
                }}>
                  Update / अपडेट करें
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={!!deleteModal} onOpenChange={() => setDeleteModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Rally / रैली हटाएं</DialogTitle>
            <DialogDescription>
              Kya aap sach mein is rally ko delete karna chahte hain? Yeh action undo nahi ho sakta.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setDeleteModal(null)}>
              Cancel / रद्द करें
            </Button>
            <Button variant="destructive" onClick={async () => {
              if (deleteModal) {
                await dispatch(deleteRailayan(deleteModal));
                setDeleteModal(null);
                dispatch(fetchRailayan());
              }
            }}>
              Delete / हटाएं
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Modal */}
      <Dialog open={addModal} onOpenChange={setAddModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>नई रैली जोड़ें / Add New Rally</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title / शीर्षक</label>
                <Input 
                  placeholder="Rally ka title" 
                  value={newRailayan.title || ''}
                  onChange={(e) => setNewRailayan(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location / स्थान</label>
                <Input 
                  placeholder="Rally ka location" 
                  value={newRailayan.location || ''}
                  onChange={(e) => setNewRailayan(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Description / विवरण</label>
              <Input 
                placeholder="Rally ka description" 
                value={newRailayan.description || ''}
                onChange={(e) => setNewRailayan(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Date / तारीख</label>
                <Input 
                  type="date" 
                  value={newRailayan.date || ''}
                  onChange={(e) => setNewRailayan(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Time / समय</label>
                <Input 
                  type="time" 
                  value={newRailayan.time || ''}
                  onChange={(e) => setNewRailayan(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Expected Crowd / अपेक्षित भीड़</label>
                <Input 
                  type="number" 
                  placeholder="50000" 
                  value={newRailayan.expectedCrowd || ''}
                  onChange={(e) => setNewRailayan(prev => ({ ...prev, expectedCrowd: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Budget / बजट (₹)</label>
                <Input 
                  type="number" 
                  placeholder="2500000" 
                  value={newRailayan.budget || ''}
                  onChange={(e) => setNewRailayan(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Type / प्रकार</label>
                <Select 
                  value={newRailayan.campaignType || ''}
                  onValueChange={(value) => setNewRailayan(prev => ({ ...prev, campaignType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type chunein" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roadshow">Roadshow / रोड शो</SelectItem>
                    <SelectItem value="rally">Rally / रैली</SelectItem>
                    <SelectItem value="meeting">Meeting / बैठक</SelectItem>
                    <SelectItem value="door-to-door">Door-to-Door / घर-घर</SelectItem>
                    <SelectItem value="media">Media / मीडिया</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Priority / प्राथमिकता</label>
                <Select 
                  value={newRailayan.priority || ''}
                  onValueChange={(value) => setNewRailayan(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Priority chunein" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High / उच्च</SelectItem>
                    <SelectItem value="medium">Medium / मध्यम</SelectItem>
                    <SelectItem value="low">Low / कम</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Images / छवियाँ अपलोड करें (Max 5)</label>
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
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setAddModal(false);
                setNewImageFiles([]);
              }}>
                Cancel / रद्द करें
              </Button>
              <Button onClick={async () => {
                await dispatch(addRailayan(newRailayan as ChunaviRailayan, newImageFiles.length > 0 ? newImageFiles : null));
                setAddModal(false);
                setNewRailayan({});
                setNewImageFiles([]);
                dispatch(fetchRailayan());
              }}>
                Add / जोड़ें
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}