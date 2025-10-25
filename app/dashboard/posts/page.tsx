"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  FileText,
  Trash2,
  MoreVertical,
  TrendingUp,
  BarChart3,
  Share2,
  Heart,
  PenTool,
  Clock,
  CheckCircle,
  XCircle
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

interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED';
  publishDate: string;
  featuredImage?: string;
  readTime: number; // in minutes
  views: number;
  likes: number;
  comments: number;
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  lastModified: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "मनोज तिवारी जी का जनता दरबार में लोगों से मुलाकात",
      content: "सांसद श्री मनोज तिवारी जी ने आज जनता दरबार में लोगों की समस्याओं को सुना और उनके निराकरण के लिए तत्काल कार्रवाई का आश्वासन दिया। इस कार्यक्रम में सैकड़ों लोगों ने भाग लिया और अपनी समस्याएं रखीं।",
      excerpt: "सांसद श्री मनोज तिवारी जी द्वारा जनता दरबार का आयोजन और लोगों की समस्याओं का समाधान।",
      author: "राजेश कुमार",
      category: "जनता दरबार",
      tags: ["जनता दरबार", "मनोज तिवारी", "समस्याएं", "समाधान"],
      status: "PUBLISHED",
      publishDate: "2024-01-15",
      featuredImage: "/images/posts/janta-darbar.jpg",
      readTime: 5,
      views: 1250,
      likes: 89,
      comments: 23,
      seoTitle: "मनोज तिवारी जी का जनता दरबार - लोगों की समस्याओं का समाधान",
      seoDescription: "सांसद श्री मनोज तिवारी जी द्वारा जनता दरबार में लोगों की समस्याओं का समाधान",
      slug: "manoj-tiwari-janta-darbar",
      lastModified: "2024-01-15"
    },
    {
      id: 2,
      title: "स्वच्छता अभियान: स्वच्छ भारत मिशन की ओर एक कदम",
      content: "स्वच्छ भारत मिशन के तहत आज यमुना घाट पर विशाल स्वच्छता अभियान का आयोजन किया गया। इस अभियान में सैकड़ों स्वयंसेवकों ने भाग लिया और क्षेत्र को स्वच्छ बनाने में योगदान दिया।",
      excerpt: "स्वच्छ भारत मिशन के तहत यमुना घाट पर स्वच्छता अभियान का आयोजन।",
      author: "प्रिया शर्मा",
      category: "स्वच्छता",
      tags: ["स्वच्छता", "स्वच्छ भारत", "अभियान", "यमुना घाट"],
      status: "PUBLISHED",
      publishDate: "2024-01-20",
      featuredImage: "/images/posts/swachhta-abhiyan.jpg",
      readTime: 7,
      views: 890,
      likes: 67,
      comments: 15,
      seoTitle: "स्वच्छता अभियान - स्वच्छ भारत मिशन",
      seoDescription: "यमुना घाट पर स्वच्छता अभियान का आयोजन",
      slug: "swachhta-abhiyan-swachh-bharat",
      lastModified: "2024-01-20"
    },
    {
      id: 3,
      title: "वृक्षारोपण कार्यक्रम: पर्यावरण संरक्षण की ओर",
      content: "पर्यावरण संरक्षण के लिए यमुना खादर में विशाल वृक्षारोपण कार्यक्रम का आयोजन किया गया। इस कार्यक्रम में 1000 से अधिक पौधे लगाए गए और लोगों को पर्यावरण के प्रति जागरूक किया गया।",
      excerpt: "यमुना खादर में वृक्षारोपण कार्यक्रम का आयोजन और पर्यावरण संरक्षण।",
      author: "अमित वर्मा",
      category: "पर्यावरण",
      tags: ["वृक्षारोपण", "पर्यावरण", "हरियाली", "यमुना खादर"],
      status: "PUBLISHED",
      publishDate: "2024-01-25",
      featuredImage: "/images/posts/tree-plantation.jpg",
      readTime: 6,
      views: 756,
      likes: 45,
      comments: 12,
      seoTitle: "वृक्षारोपण कार्यक्रम - पर्यावरण संरक्षण",
      seoDescription: "यमुना खादर में वृक्षारोपण कार्यक्रम",
      slug: "tree-plantation-environment",
      lastModified: "2024-01-25"
    },
    {
      id: 4,
      title: "स्वास्थ्य शिविर: निःशुल्क स्वास्थ्य जांच",
      content: "सामुदायिक भवन में निःशुल्क स्वास्थ्य जांच शिविर का आयोजन किया गया। इस शिविर में डॉक्टरों ने लोगों की स्वास्थ्य जांच की और उन्हें स्वास्थ्य के प्रति जागरूक किया।",
      excerpt: "सामुदायिक भवन में निःशुल्क स्वास्थ्य जांच शिविर का आयोजन।",
      author: "डॉ. सुनीता पटेल",
      category: "स्वास्थ्य",
      tags: ["स्वास्थ्य", "शिविर", "जांच", "डॉक्टर"],
      status: "DRAFT",
      publishDate: "2024-02-01",
      featuredImage: "/images/posts/health-camp.jpg",
      readTime: 8,
      views: 0,
      likes: 0,
      comments: 0,
      seoTitle: "स्वास्थ्य शिविर - निःशुल्क जांच",
      seoDescription: "सामुदायिक भवन में स्वास्थ्य शिविर",
      slug: "health-camp-free-checkup",
      lastModified: "2024-01-30"
    },
    {
      id: 5,
      title: "स्वतंत्रता दिवस समारोह: 75वें स्वतंत्रता दिवस का उत्सव",
      content: "75वें स्वतंत्रता दिवस के उपलक्ष्य में डीडीए मैदान में विशेष समारोह का आयोजन किया गया। इस समारोह में ध्वजारोहण, सांस्कृतिक कार्यक्रम और देशभक्ति के गीत प्रस्तुत किए गए।",
      excerpt: "75वें स्वतंत्रता दिवस के उपलक्ष्य में विशेष समारोह का आयोजन।",
      author: "राजेश कुमार",
      category: "समारोह",
      tags: ["स्वतंत्रता दिवस", "समारोह", "ध्वजारोहण", "देशभक्ति"],
      status: "SCHEDULED",
      publishDate: "2024-02-05",
      featuredImage: "/images/posts/independence-day.jpg",
      readTime: 10,
      views: 0,
      likes: 0,
      comments: 0,
      seoTitle: "स्वतंत्रता दिवस समारोह - 75वां स्वतंत्रता दिवस",
      seoDescription: "75वें स्वतंत्रता दिवस का विशेष समारोह",
      slug: "independence-day-celebration",
      lastModified: "2024-01-28"
    },
    {
      id: 6,
      title: "युवा संवाद कार्यक्रम: युवाओं के साथ विशेष संवाद",
      content: "युवाओं के साथ विशेष संवाद कार्यक्रम का आयोजन किया गया। इस कार्यक्रम में युवाओं ने अपने विचार रखे और सांसद जी ने उनकी समस्याओं को सुना।",
      excerpt: "युवाओं के साथ विशेष संवाद कार्यक्रम का आयोजन।",
      author: "विनोद यादव",
      category: "युवा",
      tags: ["युवा", "संवाद", "शिक्षा", "रोजगार"],
      status: "PUBLISHED",
      publishDate: "2024-02-10",
      featuredImage: "/images/posts/youth-dialogue.jpg",
      readTime: 6,
      views: 980,
      likes: 78,
      comments: 19,
      seoTitle: "युवा संवाद कार्यक्रम - युवाओं के साथ संवाद",
      seoDescription: "युवाओं के साथ विशेष संवाद कार्यक्रम",
      slug: "youth-dialogue-program",
      lastModified: "2024-02-10"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    tags: [],
    status: 'DRAFT',
    publishDate: '',
    featuredImage: '',
    readTime: 5,
    seoTitle: '',
    seoDescription: '',
    slug: ''
  });

  const statusColors = {
    DRAFT: 'bg-gray-100 text-gray-800 border-gray-200',
    PUBLISHED: 'bg-green-100 text-green-800 border-green-200',
    ARCHIVED: 'bg-red-100 text-red-800 border-red-200',
    SCHEDULED: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const statusIcons = {
    DRAFT: PenTool,
    PUBLISHED: CheckCircle,
    ARCHIVED: XCircle,
    SCHEDULED: Clock
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreatePost = () => {
    const post: Post = {
      id: Date.now(),
      title: newPost.title || '',
      content: newPost.content || '',
      excerpt: newPost.excerpt || '',
      author: newPost.author || '',
      category: newPost.category || '',
      tags: newPost.tags || [],
      status: newPost.status || 'DRAFT',
      publishDate: newPost.publishDate || new Date().toISOString().split('T')[0],
      featuredImage: newImageFile ? URL.createObjectURL(newImageFile) : newPost.featuredImage || '',
      readTime: newPost.readTime || 5,
      views: 0,
      likes: 0,
      comments: 0,
      seoTitle: newPost.seoTitle || '',
      seoDescription: newPost.seoDescription || '',
      slug: newPost.slug || '',
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    setPosts(prev => [post, ...prev]);
    setNewPost({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      category: '',
      tags: [],
      status: 'DRAFT',
      publishDate: '',
      featuredImage: '',
      readTime: 5,
      seoTitle: '',
      seoDescription: '',
      slug: ''
    });
    setNewImageFile(null);
    setIsCreateModalOpen(false);
  };

  const handleDeletePost = (id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
    setIsDeleteModalOpen(false);
    setSelectedPost(null);
  };

  const getStatusCount = (status: string) => {
    return posts.filter(post => status === 'all' ? true : post.status === status).length;
  };

  const getCategoryCount = (category: string) => {
    return posts.filter(post => category === 'all' ? true : post.category === category).length;
  };

  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const categories = Array.from(new Set(posts.map(post => post.category)));

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">पोस्ट प्रबंधन</h1>
          <p className="text-gray-600">Create, edit, and manage blog posts and articles</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Posts', count: posts.length, color: 'bg-blue-500', icon: FileText },
            { label: 'Published', count: getStatusCount('PUBLISHED'), color: 'bg-green-500', icon: CheckCircle },
            { label: 'Drafts', count: getStatusCount('DRAFT'), color: 'bg-gray-500', icon: PenTool },
            { label: 'Scheduled', count: getStatusCount('SCHEDULED'), color: 'bg-blue-500', icon: Clock },
            { label: 'Total Views', count: totalViews, color: 'bg-purple-500', icon: Eye },
            { label: 'Total Likes', count: totalLikes, color: 'bg-red-500', icon: Heart }
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
              <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-3">
              {categories.map(category => (
                <div key={category} className="flex justify-between">
                  <span className="text-gray-600">{category}:</span>
                  <span className="font-semibold">
                    {getCategoryCount(category)}
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
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Views:</span>
                <span className="font-semibold text-blue-600">
                  {Math.round(totalViews / posts.length)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Likes:</span>
                <span className="font-semibold text-red-600">
                  {Math.round(totalLikes / posts.length)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Comments:</span>
                <span className="font-semibold text-green-600">
                  {totalComments}
                </span>
              </div>
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
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Export Posts
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Share2 className="w-4 h-4 mr-2" />
                Share Posts
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
                  placeholder="Search posts by title, content, author, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Create Post Button */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>
                    Create a new blog post with all details.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter post title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Excerpt</label>
                    <textarea
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Enter post excerpt"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Enter post content"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={8}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Author</label>
                      <Input
                        value={newPost.author}
                        onChange={(e) => setNewPost(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Enter author name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <Input
                        value={newPost.category}
                        onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="Enter category"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select value={newPost.status} onValueChange={(value) => setNewPost(prev => ({ ...prev, status: value as Post['status'] }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="PUBLISHED">Published</SelectItem>
                          <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                          <SelectItem value="ARCHIVED">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Publish Date</label>
                      <Input
                        type="date"
                        value={newPost.publishDate}
                        onChange={(e) => setNewPost(prev => ({ ...prev, publishDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Read Time (minutes)</label>
                      <Input
                        type="number"
                        value={newPost.readTime}
                        onChange={(e) => setNewPost(prev => ({ ...prev, readTime: parseInt(e.target.value) || 5 }))}
                        placeholder="5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Featured Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tags (comma separated)</label>
                    <Input
                      value={newPost.tags?.join(', ')}
                      onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }))}
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">SEO Title</label>
                    <Input
                      value={newPost.seoTitle}
                      onChange={(e) => setNewPost(prev => ({ ...prev, seoTitle: e.target.value }))}
                      placeholder="Enter SEO title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">SEO Description</label>
                    <textarea
                      value={newPost.seoDescription}
                      onChange={(e) => setNewPost(prev => ({ ...prev, seoDescription: e.target.value }))}
                      placeholder="Enter SEO description"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Slug</label>
                    <Input
                      value={newPost.slug}
                      onChange={(e) => setNewPost(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="Enter URL slug"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost} className="bg-orange-500 hover:bg-orange-600">
                    Create Post
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post, index) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.excerpt}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(post.publishDate).toLocaleDateString()} • {post.readTime} min read
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[post.status]}>
                        {React.createElement(statusIcons[post.status], { className: "w-3 h-3" })}
                        {post.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>👁️ {post.views} views</div>
                        <div>❤️ {post.likes} likes</div>
                        <div>💬 {post.comments} comments</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {/* View Post */}
                        <Dialog open={isViewModalOpen && selectedPost?.id === post.id} onOpenChange={(open) => {
                          setIsViewModalOpen(open);
                          if (open) setSelectedPost(post);
                          else setSelectedPost(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{post.title}</DialogTitle>
                              <DialogDescription>
                                {post.excerpt}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Post Content:</h3>
                                <p className="text-gray-700">{post.content}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Author</label>
                                  <p className="text-sm text-gray-900">{post.author}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Category</label>
                                  <p className="text-sm text-gray-900">{post.category}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Status</label>
                                  <Badge className={statusColors[post.status]}>
                                    {post.status}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Publish Date</label>
                                  <p className="text-sm text-gray-900">{new Date(post.publishDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Read Time</label>
                                  <p className="text-sm text-gray-900">{post.readTime} minutes</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Slug</label>
                                  <p className="text-sm text-gray-900">{post.slug}</p>
                                </div>
                              </div>
                              {post.tags.length > 0 && (
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Tags</label>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {post.tags.map((tag, i) => (
                                      <Badge key={i} variant="outline">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
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
                                  setSelectedPost(post);
                                  setIsEditModalOpen(true);
                                }}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Edit Post
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Edit Post */}
                        <Dialog open={isEditModalOpen && selectedPost?.id === post.id} onOpenChange={(open) => {
                          setIsEditModalOpen(open);
                          if (open) setSelectedPost(post);
                          else setSelectedPost(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Post</DialogTitle>
                              <DialogDescription>
                                Update the details for {post.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                  value={post.title}
                                  onChange={(e) => {
                                    setPosts(prev => prev.map(p => 
                                      p.id === post.id ? { ...p, title: e.target.value } : p
                                    ));
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Select 
                                    value={post.status} 
                                    onValueChange={(value) => {
                                      setPosts(prev => prev.map(p => 
                                        p.id === post.id ? { ...p, status: value as Post['status'] } : p
                                      ));
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="DRAFT">Draft</SelectItem>
                                      <SelectItem value="PUBLISHED">Published</SelectItem>
                                      <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Category</label>
                                  <Input
                                    value={post.category}
                                    onChange={(e) => {
                                      setPosts(prev => prev.map(p => 
                                        p.id === post.id ? { ...p, category: e.target.value } : p
                                      ));
                                    }}
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
                                Update Post
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Delete Post */}
                        <Dialog open={isDeleteModalOpen && selectedPost?.id === post.id} onOpenChange={(open) => {
                          setIsDeleteModalOpen(open);
                          if (open) setSelectedPost(post);
                          else setSelectedPost(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Post</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete &quot;{post.title}&quot;? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button 
                                variant="destructive" 
                                onClick={() => handleDeletePost(post.id)}
                              >
                                Delete Post
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