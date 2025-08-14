"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Search, 
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Clock,
  Target,
  Award,
  Activity,
  Globe,
  Share2,
  Download,
  MessageSquare,
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
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ChunaviRailayan {
  id: string
  title: string
  description: string
  location: string
  date: string
  time: string
  expectedCrowd: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  priority: 'high' | 'medium' | 'low'
  campaignType: 'roadshow' | 'rally' | 'meeting' | 'door-to-door' | 'media'
  targetAudience: string[]
  keySpeakers: string[]
  budget: number
  actualCrowd?: number
  feedback?: string
  photos?: string[]
  videos?: string[]
  createdAt: string
  updatedAt: string
}

const mockData: ChunaviRailayan[] = [
  {
    id: '1',
    title: 'महा रैली - पूर्वी दिल्ली',
    description: 'पूर्वी दिल्ली में बड़ी रैली का आयोजन, जनता से सीधा संवाद',
    location: 'शाहदरा, दिल्ली',
    date: '2024-02-15',
    time: '18:00',
    expectedCrowd: 50000,
    status: 'upcoming',
    priority: 'high',
    campaignType: 'rally',
    targetAudience: ['युवा', 'महिलाएं', 'व्यापारी'],
    keySpeakers: ['मनोज तिवारी', 'राज्य अध्यक्ष', 'स्थानीय नेता'],
    budget: 2500000,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'रोड शो - नॉर्थ ईस्ट दिल्ली',
    description: 'नॉर्थ ईस्ट दिल्ली में रोड शो, जनता का समर्थन जुटाना',
    location: 'यमुना विहार, दिल्ली',
    date: '2024-02-10',
    time: '16:00',
    expectedCrowd: 30000,
    status: 'ongoing',
    priority: 'high',
    campaignType: 'roadshow',
    targetAudience: ['सभी वर्ग'],
    keySpeakers: ['मनोज तिवारी', 'संगठन सचिव'],
    budget: 1500000,
    actualCrowd: 35000,
    feedback: 'बहुत अच्छा रेस्पॉन्स मिला',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-10'
  },
  {
    id: '3',
    title: 'चुनावी बैठक - दक्षिण दिल्ली',
    description: 'दक्षिण दिल्ली में चुनावी बैठक, कार्यकर्ताओं से मुलाकात',
    location: 'साकेत, दिल्ली',
    date: '2024-02-08',
    time: '19:00',
    expectedCrowd: 5000,
    status: 'completed',
    priority: 'medium',
    campaignType: 'meeting',
    targetAudience: ['कार्यकर्ता', 'पार्टी सदस्य'],
    keySpeakers: ['मनोज तिवारी', 'जिला अध्यक्ष'],
    budget: 500000,
    actualCrowd: 4800,
    feedback: 'कार्यकर्ताओं का मनोबल बढ़ा',
    createdAt: '2024-01-10',
    updatedAt: '2024-02-08'
  },
  {
    id: '4',
    title: 'दर-दर जाकर प्रचार',
    description: 'महिला कार्यकर्ताओं के साथ दर-दर जाकर प्रचार',
    location: 'लक्ष्मी नगर, दिल्ली',
    date: '2024-02-12',
    time: '10:00',
    expectedCrowd: 2000,
    status: 'upcoming',
    priority: 'medium',
    campaignType: 'door-to-door',
    targetAudience: ['महिलाएं', 'परिवार'],
    keySpeakers: ['महिला मोर्चा अध्यक्ष', 'स्थानीय नेता'],
    budget: 200000,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: '5',
    title: 'मीडिया इंटरव्यू',
    description: 'प्रमुख न्यूज़ चैनल पर लाइव इंटरव्यू',
    location: 'नई दिल्ली',
    date: '2024-02-14',
    time: '20:00',
    expectedCrowd: 0,
    status: 'upcoming',
    priority: 'high',
    campaignType: 'media',
    targetAudience: ['दर्शक', 'मतदाता'],
    keySpeakers: ['मनोज तिवारी'],
    budget: 100000,
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22'
  }
]

export default function ChunaviRailayan() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [campaignTypeFilter, setCampaignTypeFilter] = useState('all')
  const [viewModal, setViewModal] = useState<string | null>(null)
  const [editModal, setEditModal] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState<string | null>(null)
  const [addModal, setAddModal] = useState(false)

  const filteredData = mockData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter
    const matchesType = campaignTypeFilter === 'all' || item.campaignType === campaignTypeFilter
    
    return matchesSearch && matchesStatus && matchesPriority && matchesType
  })

  const stats = {
    total: mockData.length,
    upcoming: mockData.filter(item => item.status === 'upcoming').length,
    ongoing: mockData.filter(item => item.status === 'ongoing').length,
    completed: mockData.filter(item => item.status === 'completed').length,
    totalBudget: mockData.reduce((sum, item) => sum + item.budget, 0),
    totalExpectedCrowd: mockData.reduce((sum, item) => sum + item.expectedCrowd, 0),
    totalActualCrowd: mockData.filter(item => item.actualCrowd).reduce((sum, item) => sum + (item.actualCrowd || 0), 0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case 'roadshow': return <Activity className="w-4 h-4" />
      case 'rally': return <Users className="w-4 h-4" />
      case 'meeting': return <Target className="w-4 h-4" />
      case 'door-to-door': return <Award className="w-4 h-4" />
      case 'media': return <Globe className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">चुनावी रैलियां</h1>
          <p className="text-gray-600 mt-1">चुनावी अभियान और रैलियों का प्रबंधन</p>
        </div>
        <Button onClick={() => setAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
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
              <span className="text-sm font-medium">₹{(stats.totalBudget / stats.total / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">औसत भीड़</span>
              <span className="text-sm font-medium">{(stats.totalExpectedCrowd / stats.total / 1000).toFixed(1)}K</span>
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
              {filteredData.map((campaign, index) => (
                <motion.tr
                  key={campaign.id}
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
                      {campaign.actualCrowd ? (
                        <span className="text-green-600">{campaign.actualCrowd.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-600">{campaign.expectedCrowd.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">अपेक्षित: {campaign.expectedCrowd.toLocaleString()}</div>
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
                    ₹{(campaign.budget / 100000).toFixed(1)}L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewModal(campaign.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditModal(campaign.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteModal(campaign.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm">
                          <DialogHeader>
                            <DialogTitle>त्वरित कार्य</DialogTitle>
                            <DialogDescription>
                              {campaign.title} के लिए कार्य चुनें
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start">
                              <Globe className="w-4 h-4 mr-2" />
                              वेबसाइट पर देखें
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Share2 className="w-4 h-4 mr-2" />
                              रैली शेयर करें
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <Download className="w-4 h-4 mr-2" />
                              रिपोर्ट डाउनलोड
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              फीडबैक देखें
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

      {/* View Modal */}
      <Dialog open={!!viewModal} onOpenChange={() => setViewModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>रैली विवरण</DialogTitle>
          </DialogHeader>
          {viewModal && (
            <div className="space-y-4">
              {(() => {
                const campaign = mockData.find(c => c.id === viewModal)
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
                          {campaign.status === 'upcoming' && 'आगामी'}
                          {campaign.status === 'ongoing' && 'चल रही'}
                          {campaign.status === 'completed' && 'पूर्ण'}
                          {campaign.status === 'cancelled' && 'रद्द'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">स्थान</p>
                        <p className="text-sm text-gray-900">{campaign.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">तारीख और समय</p>
                        <p className="text-sm text-gray-900">{campaign.date} • {campaign.time}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">अपेक्षित भीड़</p>
                        <p className="text-sm text-gray-900">{campaign.expectedCrowd.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">बजट</p>
                        <p className="text-sm text-gray-900">₹{(campaign.budget / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">लक्षित दर्शक</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {campaign.targetAudience.map((audience, index) => (
                          <Badge key={index} variant="outline">{audience}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600">मुख्य वक्ता</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {campaign.keySpeakers.map((speaker, index) => (
                          <Badge key={index} variant="secondary">{speaker}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    {campaign.actualCrowd && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">वास्तविक भीड़</p>
                        <p className="text-sm text-green-600">{campaign.actualCrowd.toLocaleString()}</p>
                      </div>
                    )}
                    
                    {campaign.feedback && (
                      <div>
                        <p className="text-sm font-medium text-gray-600">फीडबैक</p>
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
                  <label className="text-sm font-medium text-gray-700">शीर्षक</label>
                  <Input defaultValue={mockData.find(c => c.id === editModal)?.title} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">स्थान</label>
                  <Input defaultValue={mockData.find(c => c.id === editModal)?.location} />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">विवरण</label>
                <Input defaultValue={mockData.find(c => c.id === editModal)?.description} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">तारीख</label>
                  <Input type="date" defaultValue={mockData.find(c => c.id === editModal)?.date} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">समय</label>
                  <Input type="time" defaultValue={mockData.find(c => c.id === editModal)?.time} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">अपेक्षित भीड़</label>
                  <Input type="number" defaultValue={mockData.find(c => c.id === editModal)?.expectedCrowd} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">बजट (₹)</label>
                  <Input type="number" defaultValue={mockData.find(c => c.id === editModal)?.budget} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">स्थिति</label>
                  <Select defaultValue={mockData.find(c => c.id === editModal)?.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">आगामी</SelectItem>
                      <SelectItem value="ongoing">चल रही</SelectItem>
                      <SelectItem value="completed">पूर्ण</SelectItem>
                      <SelectItem value="cancelled">रद्द</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">प्राथमिकता</label>
                  <Select defaultValue={mockData.find(c => c.id === editModal)?.priority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">उच्च</SelectItem>
                      <SelectItem value="medium">मध्यम</SelectItem>
                      <SelectItem value="low">कम</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditModal(null)}>
                  रद्द करें
                </Button>
                <Button onClick={() => setEditModal(null)}>
                  अपडेट करें
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
            <DialogTitle>रैली हटाएं</DialogTitle>
            <DialogDescription>
              क्या आप वाकई इस रैली को हटाना चाहते हैं? यह कार्य पूर्ववत नहीं किया जा सकता।
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setDeleteModal(null)}>
              रद्द करें
            </Button>
            <Button variant="destructive" onClick={() => setDeleteModal(null)}>
              हटाएं
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Modal */}
      <Dialog open={addModal} onOpenChange={setAddModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>नई रैली जोड़ें</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">शीर्षक</label>
                <Input placeholder="रैली का शीर्षक" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">स्थान</label>
                <Input placeholder="रैली का स्थान" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">विवरण</label>
              <Input placeholder="रैली का विवरण" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">तारीख</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">समय</label>
                <Input type="time" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">अपेक्षित भीड़</label>
                <Input type="number" placeholder="50000" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">बजट (₹)</label>
                <Input type="number" placeholder="2500000" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">प्रकार</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="प्रकार चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roadshow">रोड शो</SelectItem>
                    <SelectItem value="rally">रैली</SelectItem>
                    <SelectItem value="meeting">बैठक</SelectItem>
                    <SelectItem value="door-to-door">दर-दर</SelectItem>
                    <SelectItem value="media">मीडिया</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">प्राथमिकता</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="प्राथमिकता चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">उच्च</SelectItem>
                    <SelectItem value="medium">मध्यम</SelectItem>
                    <SelectItem value="low">कम</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAddModal(false)}>
                रद्द करें
              </Button>
              <Button onClick={() => setAddModal(false)}>
                जोड़ें
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}