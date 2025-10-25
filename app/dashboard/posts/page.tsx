"use client";

import React, { useState, useEffect } from "react"; // useEffect import karein
import { motion } from "framer-motion";
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
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SCHEDULED";
  publishDate: string;
  featuredImage?: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  lastModified: string;
}

// Initial data ko ek alag variable mein rakhein
const initialPostsData: Post[] = [
  {
    id: 1,
    title: "मनोज तिवारी जी का जनता दरबार में लोगों से मुलाकात",
    content:
      "सांसद श्री मनोज तिवारी जी ने आज जनता दरबार में लोगों की समस्याओं को सुना और उनके निराकरण के लिए तत्काल कार्रवाई का आश्वासन दिया। इस कार्यक्रम में सैकड़ों लोगों ने भाग लिया और अपनी समस्याएं रखीं।",
    excerpt:
      "सांसद श्री मनोज तिवारी जी द्वारा जनता दरबार का आयोजन और लोगों की समस्याओं का समाधान।",
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
    seoDescription:
      "सांसद श्री मनोज तिवारी जी द्वारा जनता दरबार में लोगों की समस्याओं का समाधान",
    slug: "manoj-tiwari-janta-darbar",
    lastModified: "2024-01-15",
  },
  {
    id: 2,
    title: "स्वच्छता अभियान: स्वच्छ भारत मिशन की ओर एक कदम",
    content:
      "स्वच्छ भारत मिशन के तहत आज यमुना घाट पर विशाल स्वच्छता अभियान का आयोजन किया गया। इस अभियान में सैकड़ों स्वयंसेवकों ने भाग लिया और क्षेत्र को स्वच्छ बनाने में योगदान दिया।",
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
    lastModified: "2024-01-20",
  },
];

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  // ===== YEH NAYA CODE HAI (localStorage se data load karne ke liye) =====
  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem("blogPosts");
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        // Agar localStorage khaali hai, to initial data set karein
        setPosts(initialPostsData);
      }
    } catch (error) {
      console.error("Failed to parse posts from localStorage", error);
      setPosts(initialPostsData);
    }
  }, []); // [] ka matlab yeh sirf ek baar chalega jab component load hoga

  // ===== YEH BHI NAYA CODE HAI (localStorage mein data save karne ke liye) =====
  useEffect(() => {
    // Shuruaati render par save na karein jab tak posts load na ho jayein
    if (posts.length > 0) {
      localStorage.setItem("blogPosts", JSON.stringify(posts));
    }
  }, [posts]); // Yeh tab chalega jab bhi 'posts' state mein badlav hoga

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    tags: [],
    status: "DRAFT",
    publishDate: "",
    featuredImage: "",
    readTime: 5,
    seoTitle: "",
    seoDescription: "",
    slug: "",
  });

  const statusColors = {
    DRAFT: "bg-gray-100 text-gray-800 border-gray-200",
    PUBLISHED: "bg-green-100 text-green-800 border-green-200",
    ARCHIVED: "bg-red-100 text-red-800 border-red-200",
    SCHEDULED: "bg-blue-100 text-blue-800 border-blue-200",
  };
  const statusIcons = {
    DRAFT: PenTool,
    PUBLISHED: CheckCircle,
    ARCHIVED: XCircle,
    SCHEDULED: Clock,
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreatePost = () => {
    const post: Post = {
      id: Date.now(),
      title: newPost.title || "",
      content: newPost.content || "",
      excerpt: newPost.excerpt || "",
      author: newPost.author || "",
      category: newPost.category || "",
      tags: newPost.tags || [],
      status: newPost.status || "DRAFT",
      publishDate:
        newPost.publishDate || new Date().toISOString().split("T")[0],
      featuredImage: newImageFile
        ? URL.createObjectURL(newImageFile)
        : newPost.featuredImage || "",
      readTime: newPost.readTime || 5,
      views: 0,
      likes: 0,
      comments: 0,
      seoTitle: newPost.seoTitle || "",
      seoDescription: newPost.seoDescription || "",
      slug: newPost.slug || "",
      lastModified: new Date().toISOString().split("T")[0],
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost({
      title: "",
      content: "",
      excerpt: "",
      author: "",
      category: "",
      tags: [],
      status: "DRAFT",
      publishDate: "",
      featuredImage: "",
      readTime: 5,
      seoTitle: "",
      seoDescription: "",
      slug: "",
    });
    setNewImageFile(null);
    setIsCreateModalOpen(false);
  };

  const handleDeletePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    setIsDeleteModalOpen(false);
    setSelectedPost(null);
  };

  const getStatusCount = (status: string) =>
    posts.filter((post) => (status === "all" ? true : post.status === status))
      .length;
  const getCategoryCount = (category: string) =>
    posts.filter((post) =>
      category === "all" ? true : post.category === category
    ).length;
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <div className="flex-shrink-0 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            पोस्ट प्रबंधन
          </h1>
          <p className="text-gray-600">
            Create, edit, and manage blog posts and articles
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          {[
            {
              label: "Total Posts",
              count: posts.length,
              color: "bg-blue-500",
              icon: FileText,
            },
            {
              label: "Published",
              count: getStatusCount("PUBLISHED"),
              color: "bg-green-500",
              icon: CheckCircle,
            },
            {
              label: "Drafts",
              count: getStatusCount("DRAFT"),
              color: "bg-gray-500",
              icon: PenTool,
            },
            {
              label: "Scheduled",
              count: getStatusCount("SCHEDULED"),
              color: "bg-blue-500",
              icon: Clock,
            },
            {
              label: "Total Views",
              count: totalViews,
              color: "bg-purple-500",
              icon: Eye,
            },
            {
              label: "Total Likes",
              count: totalLikes,
              color: "bg-red-500",
              icon: Heart,
            },
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
                  {" "}
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>{" "}
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.count}
                  </p>{" "}
                </div>
                <div
                  className={`w-8 h-8 rounded-full ${stat.color} opacity-20 flex items-center justify-center`}
                >
                  {" "}
                  <stat.icon className="w-4 h-4 text-white" />{" "}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              {" "}
              <h3 className="text-lg font-semibold text-gray-900">
                Categories
              </h3>{" "}
              <BarChart3 className="w-6 h-6 text-blue-500" />{" "}
            </div>
            <div className="space-y-3">
              {" "}
              {categories.map((category) => (
                <div key={category} className="flex justify-between">
                  {" "}
                  <span className="text-gray-600">{category}:</span>{" "}
                  <span className="font-semibold">
                    {getCategoryCount(category)}
                  </span>{" "}
                </div>
              ))}{" "}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              {" "}
              <h3 className="text-lg font-semibold text-gray-900">
                Performance
              </h3>{" "}
              <TrendingUp className="w-6 h-6 text-green-500" />{" "}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                {" "}
                <span className="text-gray-600">Avg Views:</span>{" "}
                <span className="font-semibold text-blue-600">
                  {Math.round(totalViews / posts.length) || 0}
                </span>{" "}
              </div>
              <div className="flex justify-between">
                {" "}
                <span className="text-gray-600">Avg Likes:</span>{" "}
                <span className="font-semibold text-red-600">
                  {Math.round(totalLikes / posts.length) || 0}
                </span>{" "}
              </div>
              <div className="flex justify-between">
                {" "}
                <span className="text-gray-600">Total Comments:</span>{" "}
                <span className="font-semibold text-green-600">
                  {totalComments}
                </span>{" "}
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
              {" "}
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>{" "}
              <MoreVertical className="w-6 h-6 text-gray-500" />{" "}
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => setIsCreateModalOpen(true)}
              >
                {" "}
                <Plus className="w-4 h-4 mr-2" /> Create Post{" "}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                {" "}
                <FileText className="w-4 h-4 mr-2" /> Export Posts{" "}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                {" "}
                <Share2 className="w-4 h-4 mr-2" /> Share Posts{" "}
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                {" "}
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />{" "}
                <Input
                  type="text"
                  placeholder="Search posts by title, content, author, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />{" "}
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              {" "}
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                <SelectItem value="all">All Status</SelectItem>{" "}
                <SelectItem value="PUBLISHED">Published</SelectItem>{" "}
                <SelectItem value="DRAFT">Draft</SelectItem>{" "}
                <SelectItem value="SCHEDULED">Scheduled</SelectItem>{" "}
                <SelectItem value="ARCHIVED">Archived</SelectItem>{" "}
              </SelectContent>{" "}
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              {" "}
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>{" "}
              <SelectContent>
                {" "}
                <SelectItem value="all">All Categories</SelectItem>{" "}
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}{" "}
              </SelectContent>{" "}
            </Select>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setIsCreateModalOpen(true)}
            >
              {" "}
              <Plus className="w-4 h-4" /> Create Post{" "}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
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
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {" "}
                          <FileText className="w-6 h-6 text-orange-600" />{" "}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {post.excerpt}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(post.publishDate).toLocaleDateString()} •{" "}
                            {post.readTime} min read
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {post.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={`${statusColors[post.status]} flex items-center gap-1.5`}
                      >
                        {" "}
                        {React.createElement(statusIcons[post.status], {
                          className: "w-3 h-3",
                        })}{" "}
                        <span className="capitalize">
                          {post.status.toLowerCase()}
                        </span>{" "}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-blue-500" />{" "}
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" />{" "}
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedPost(post);
                            setIsViewModalOpen(true);
                          }}
                        >
                          {" "}
                          <Eye className="w-4 h-4" />{" "}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedPost(post);
                            setIsEditModalOpen(true);
                          }}
                        >
                          {" "}
                          <Edit className="w-4 h-4" />{" "}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedPost(post);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          {" "}
                          <Trash2 className="w-4 h-4" />{" "}
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            {" "}
            <DialogTitle>Create New Post</DialogTitle>{" "}
            <DialogDescription>
              Create a new blog post with all details.
            </DialogDescription>{" "}
          </DialogHeader>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
            <div>
              {" "}
              <label className="text-sm font-medium">Title</label>{" "}
              <Input
                value={newPost.title}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter post title"
              />{" "}
            </div>
            <div>
              {" "}
              <label className="text-sm font-medium">Excerpt</label>{" "}
              <textarea
                value={newPost.excerpt}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="Enter post excerpt"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
              />{" "}
            </div>
            <div>
              {" "}
              <label className="text-sm font-medium">Content</label>{" "}
              <textarea
                value={newPost.content}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Enter post content"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={8}
              />{" "}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                {" "}
                <label className="text-sm font-medium">Author</label>{" "}
                <Input
                  value={newPost.author}
                  onChange={(e) =>
                    setNewPost((prev) => ({ ...prev, author: e.target.value }))
                  }
                  placeholder="Enter author name"
                />{" "}
              </div>
              <div>
                {" "}
                <label className="text-sm font-medium">Category</label>{" "}
                <Input
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  placeholder="Enter category"
                />{" "}
              </div>
              <div>
                {" "}
                <label className="text-sm font-medium">Status</label>{" "}
                <Select
                  value={newPost.status}
                  onValueChange={(value) =>
                    setNewPost((prev) => ({
                      ...prev,
                      status: value as Post["status"],
                    }))
                  }
                >
                  {" "}
                  <SelectTrigger>
                    {" "}
                    <SelectValue />{" "}
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {" "}
                    <SelectItem value="DRAFT">Draft</SelectItem>{" "}
                    <SelectItem value="PUBLISHED">Published</SelectItem>{" "}
                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>{" "}
                    <SelectItem value="ARCHIVED">Archived</SelectItem>{" "}
                  </SelectContent>{" "}
                </Select>{" "}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                {" "}
                <label className="text-sm font-medium">Publish Date</label>{" "}
                <Input
                  type="date"
                  value={newPost.publishDate}
                  onChange={(e) =>
                    setNewPost((prev) => ({
                      ...prev,
                      publishDate: e.target.value,
                    }))
                  }
                />{" "}
              </div>
              <div>
                {" "}
                <label className="text-sm font-medium">
                  Read Time (minutes)
                </label>{" "}
                <Input
                  type="number"
                  value={newPost.readTime}
                  onChange={(e) =>
                    setNewPost((prev) => ({
                      ...prev,
                      readTime: parseInt(e.target.value) || 5,
                    }))
                  }
                  placeholder="5"
                />{" "}
              </div>
            </div>
            <div>
              {" "}
              <label className="text-sm font-medium">Featured Image</label>{" "}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
              />{" "}
            </div>
            <div>
              {" "}
              <label className="text-sm font-medium">
                Tags (comma separated)
              </label>{" "}
              <Input
                value={newPost.tags?.join(", ")}
                onChange={(e) =>
                  setNewPost((prev) => ({
                    ...prev,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  }))
                }
                placeholder="Enter tags separated by commas"
              />{" "}
            </div>
            <div>
              {" "}
              <label className="text-sm font-medium">SEO Title</label>{" "}
              <Input
                value={newPost.seoTitle}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, seoTitle: e.target.value }))
                }
                placeholder="Enter SEO title"
              />{" "}
            </div>
            <div>
              {" "}
              <label className="text-sm font-medium">
                SEO Description
              </label>{" "}
              <textarea
                value={newPost.seoDescription}
                onChange={(e) =>
                  setNewPost((prev) => ({
                    ...prev,
                    seoDescription: e.target.value,
                  }))
                }
                placeholder="Enter SEO description"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
              />{" "}
            </div>
            <div>
              {" "}
              <label className="text-sm font-medium">Slug</label>{" "}
              <Input
                value={newPost.slug}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="Enter URL slug"
              />{" "}
            </div>
          </div>
          <DialogFooter>
            {" "}
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              {" "}
              Cancel{" "}
            </Button>{" "}
            <Button
              onClick={handleCreatePost}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {" "}
              Create Post{" "}
            </Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedPost && (
        <>
          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                {" "}
                <DialogTitle>{selectedPost.title}</DialogTitle>{" "}
                <DialogDescription>
                  {selectedPost.excerpt}
                </DialogDescription>{" "}
              </DialogHeader>
              <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  {" "}
                  <h3 className="font-semibold mb-2">Post Content:</h3>{" "}
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedPost.content}
                  </p>{" "}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-500">
                      Author
                    </label>{" "}
                    <p className="text-sm text-gray-900">
                      {selectedPost.author}
                    </p>{" "}
                  </div>
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-500">
                      Category
                    </label>{" "}
                    <p className="text-sm text-gray-900">
                      {selectedPost.category}
                    </p>{" "}
                  </div>
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>{" "}
                    <Badge className={statusColors[selectedPost.status]}>
                      {selectedPost.status}
                    </Badge>{" "}
                  </div>
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-500">
                      Publish Date
                    </label>{" "}
                    <p className="text-sm text-gray-900">
                      {new Date(selectedPost.publishDate).toLocaleDateString()}
                    </p>{" "}
                  </div>
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-500">
                      Read Time
                    </label>{" "}
                    <p className="text-sm text-gray-900">
                      {selectedPost.readTime} minutes
                    </p>{" "}
                  </div>
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-500">
                      Slug
                    </label>{" "}
                    <p className="text-sm text-gray-900">
                      {selectedPost.slug}
                    </p>{" "}
                  </div>
                </div>
                {selectedPost.tags.length > 0 && (
                  <div>
                    {" "}
                    <label className="text-sm font-medium text-gray-500">
                      Tags
                    </label>{" "}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {" "}
                      {selectedPost.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">
                          {tag}
                        </Badge>
                      ))}{" "}
                    </div>{" "}
                  </div>
                )}
              </div>
              <DialogFooter>
                {" "}
                <Button
                  variant="outline"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </Button>{" "}
                <Button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setIsEditModalOpen(true);
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Edit Post
                </Button>{" "}
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                {" "}
                <DialogTitle>Edit Post</DialogTitle>{" "}
                <DialogDescription>
                  Update the details for {selectedPost.title}
                </DialogDescription>{" "}
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  {" "}
                  <label className="text-sm font-medium">Title</label>{" "}
                  <Input
                    value={selectedPost.title}
                    onChange={(e) =>
                      setSelectedPost((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                      )
                    }
                  />{" "}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {" "}
                    <label className="text-sm font-medium">Status</label>{" "}
                    <Select
                      value={selectedPost.status}
                      onValueChange={(value) =>
                        setSelectedPost((prev) =>
                          prev
                            ? { ...prev, status: value as Post["status"] }
                            : null
                        )
                      }
                    >
                      {" "}
                      <SelectTrigger>
                        {" "}
                        <SelectValue />{" "}
                      </SelectTrigger>{" "}
                      <SelectContent>
                        {" "}
                        <SelectItem value="DRAFT">Draft</SelectItem>{" "}
                        <SelectItem value="PUBLISHED">Published</SelectItem>{" "}
                        <SelectItem value="SCHEDULED">Scheduled</SelectItem>{" "}
                        <SelectItem value="ARCHIVED">Archived</SelectItem>{" "}
                      </SelectContent>{" "}
                    </Select>{" "}
                  </div>
                  <div>
                    {" "}
                    <label className="text-sm font-medium">Category</label>{" "}
                    <Input
                      value={selectedPost.category}
                      onChange={(e) =>
                        setSelectedPost((prev) =>
                          prev ? { ...prev, category: e.target.value } : null
                        )
                      }
                    />{" "}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setPosts((prev) =>
                      prev.map((p) =>
                        p.id === selectedPost.id ? selectedPost : p
                      )
                    );
                    setIsEditModalOpen(false);
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Update Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogContent>
              <DialogHeader>
                {" "}
                <DialogTitle>Delete Post</DialogTitle>{" "}
                <DialogDescription>
                  Are you sure you want to delete &quot;{selectedPost.title}
                  &quot;? This action cannot be undone.
                </DialogDescription>{" "}
              </DialogHeader>
              <DialogFooter>
                {" "}
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </Button>{" "}
                <Button
                  variant="destructive"
                  onClick={() => handleDeletePost(selectedPost.id)}
                >
                  Delete Post
                </Button>{" "}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}