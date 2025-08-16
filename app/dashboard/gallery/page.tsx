"use client";

import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Search,
  Edit,
  Eye,
  Image as ImageIcon,
  Video,
  Upload,
  Trash2,
  MoreVertical,
  TrendingUp,
  BarChart3,
  Folder,
  Download,
  Heart,
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  fetchGallery,
  selectGallery,
  updateGalleryItem,
  addGalleryItem,
  deleteGalleryItem,
  selectGalleryError,
  selectGalleryLoading,
} from '@/lib/redux/features/gallerySlice';

// Import GalleryItem type from redux slice
import type { GalleryItem } from '@/lib/redux/features/gallerySlice';
import { AppDispatch } from '@/lib/redux/store';

export default function Gallery() {
  const dispatch = useDispatch<AppDispatch>();
  const galleryItems = useSelector(selectGallery) as GalleryItem[];
  const loading = useSelector(selectGalleryLoading);
  const error = useSelector(selectGalleryError);

  // Fetch gallery on mount
  React.useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // For add
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title: '',
    description: '',
    type: 'photo',
    url: '',
    thumbnail: '',
    category: '',
    tags: [],
    status: 'public',
    location: '',
    event: '',
    photographer: '',
  });

  // For edit
  const [editItem, setEditItem] = useState<Partial<GalleryItem>>({});

  const statusColors: Record<string, string> = {
    public: 'bg-green-100 text-green-800 border-green-200',
    private: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    draft: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const typeColors: Record<string, string> = {
    photo: 'bg-blue-100 text-blue-800 border-blue-200',
    video: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  // Memoize categories for performance
  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          (galleryItems || [])
            .map((item) => item.category)
            .filter((cat) => typeof cat === 'string' && cat.trim() !== '')
        )
      ),
    [galleryItems]
  );

  // Filtering logic
  const filteredItems = useMemo(() => {
    return (galleryItems || []).filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags || []).some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesCategory =
        categoryFilter === 'all' || item.category === categoryFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        item.status === statusFilter ||
        item.status?.toUpperCase() === statusFilter;

      return matchesSearch && matchesType && matchesCategory && matchesStatus;
    });
  }, [galleryItems, searchTerm, typeFilter, categoryFilter, statusFilter]);

  // Stats
  const getTypeCount = (type: string) =>
    (galleryItems || []).filter((item) =>
      type === 'all' ? true : item.type === type
    ).length;

  const getCategoryCount = (category: string) =>
    (galleryItems || []).filter((item) =>
      category === 'all' ? true : item.category === category
    ).length;

  const totalViews = (galleryItems || []).reduce(
    (sum, item) => sum + (item.views || 0),
    0
  );
  const totalLikes = (galleryItems || []).reduce(
    (sum, item) => sum + (item.likes || 0),
    0
  );
  const totalSize = (galleryItems || []).reduce(
    (sum, item) => sum + (item.size || 0),
    0
  );

  const formatFileSize = (size: number) => {
    if (size < 1) return `${(size * 1024).toFixed(1)} KB`;
    return `${size.toFixed(1)} MB`;
  };

  // Add handler
  const handleAddItem = async () => {
    // Validate required fields
    if (!newItem.title || !newItem.type || !newItem.url) {
      alert('Title, Type, and Media URL are required.');
      return;
    }
    // Dispatch addGalleryItem
    try {
      await dispatch(addGalleryItem(newItem as GalleryItem));
      setIsUploadModalOpen(false);
      setNewItem({
        title: '',
        description: '',
        type: 'photo',
        url: '',
        thumbnail: '',
        category: '',
        tags: [],
        status: 'public',
        location: '',
        event: '',
        photographer: '',
      });
    } catch (err) {
      console.log(err,'Failed to add item.');
    }
  };

  // Edit handler
  const handleEditOpen = (item: GalleryItem) => {
    setSelectedItem(item);
    setEditItem({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags : [],
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (field: keyof GalleryItem, value: string | string[] | number) => {
    setEditItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateItem = async () => {
    if (!editItem._id || !selectedItem?._id) {
      console.log('Missing item ID');
      return;
    }
    try {
      await dispatch(updateGalleryItem(selectedItem._id, editItem as GalleryItem));
      setIsEditModalOpen(false);
      setSelectedItem(null);
      setEditItem({});
    } catch (err) {
      console.log(err,'Failed to update item.');
    }
  };

  // Delete handler
  const handleDeleteItem = async (id: string | '') => {
    if (!id) {
      alert('Missing item ID');
      return;
    }
    try {
      await dispatch(deleteGalleryItem(id));
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
    } catch (err) {
      console.log(err,'Failed to delete item.');
    }
  };

  // UI
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            गैलरी प्रबंधन
          </h1>
          <p className="text-gray-600">
            Manage and organize photos and videos in the gallery
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          {[
            {
              label: 'Total Items',
              count: galleryItems?.length || 0,
              color: 'bg-blue-500',
              icon: Folder,
            },
            {
              label: 'Photos',
              count: getTypeCount('photo'),
              color: 'bg-blue-500',
              icon: ImageIcon,
            },
            {
              label: 'Videos',
              count: getTypeCount('video'),
              color: 'bg-purple-500',
              icon: Video,
            },
            {
              label: 'Total Views',
              count: totalViews,
              color: 'bg-green-500',
              icon: Eye,
            },
            {
              label: 'Total Likes',
              count: totalLikes,
              color: 'bg-red-500',
              icon: Heart,
            },
            {
              label: 'Total Size',
              count: formatFileSize(totalSize),
              color: 'bg-orange-500',
              icon: BarChart3,
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
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.count}
                  </p>
                </div>
                <div
                  className={`w-8 h-8 rounded-full ${stat.color} opacity-20 flex items-center justify-center`}
                >
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
              <h3 className="text-lg font-semibold text-gray-900">
                Categories
              </h3>
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-3">
              {categories.map((category) => (
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
              <h3 className="text-lg font-semibold text-gray-900">
                Performance
              </h3>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Views:</span>
                <span className="font-semibold text-blue-600">
                  {galleryItems?.length
                    ? Math.round(totalViews / galleryItems.length)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Likes:</span>
                <span className="font-semibold text-red-600">
                  {galleryItems?.length
                    ? Math.round(totalLikes / galleryItems.length)
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Most Viewed:</span>
                <span className="font-semibold text-green-600">
                  {galleryItems?.length
                    ? Math.max(...galleryItems.map((item) => item.views || 0))
                    : 0}
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
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
              <MoreVertical className="w-6 h-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Upload Media
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Folder className="w-4 h-4 mr-2" />
                Create Album
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Gallery
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
                  placeholder="Search by title, description, category, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="photo">Photos</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            {/* Upload Button */}
            <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload Media</DialogTitle>
                  <DialogDescription>
                    Upload new photos or videos to the gallery.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={newItem.title}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Enter media title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <Select
                        value={newItem.type}
                        onValueChange={(value) =>
                          setNewItem((prev) => ({
                            ...prev,
                            type: value as 'photo' | 'video',
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="photo">Photo</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Enter media description"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Media URL</label>
                      <Input
                        value={newItem.url}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            url: e.target.value,
                          }))
                        }
                        placeholder="Enter media URL"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Thumbnail URL</label>
                      <Input
                        value={newItem.thumbnail}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            thumbnail: e.target.value,
                          }))
                        }
                        placeholder="Enter thumbnail URL"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <Input
                        value={newItem.category}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        placeholder="Enter category"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select
                        value={newItem.status}
                        onValueChange={(value) =>
                          setNewItem((prev) => ({
                            ...prev,
                            status: value as 'public' | 'private' | 'draft',
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Photographer</label>
                      <Input
                        value={newItem.photographer}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            photographer: e.target.value,
                          }))
                        }
                        placeholder="Enter photographer name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        value={newItem.location}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        placeholder="Enter location"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Event</label>
                      <Input
                        value={newItem.event}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            event: e.target.value,
                          }))
                        }
                        placeholder="Enter event name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Tags (comma separated)
                    </label>
                    <Input
                      value={Array.isArray(newItem.tags) ? newItem.tags.join(', ') : ''}
                      onChange={(e) =>
                        setNewItem((prev) => ({
                          ...prev,
                          tags: e.target.value
                            .split(',')
                            .map((tag) => tag.trim())
                            .filter(Boolean),
                        }))
                      }
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsUploadModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddItem}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Upload Media
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {loading ? (
            <div className="text-center py-20 text-lg text-gray-500">
              Loading gallery...
            </div>
          ) : error ? (
            <div className="text-center py-20 text-lg text-red-500">
              Error loading gallery: {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id || item.title + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-200"
                >
                  {/* Media Preview */}
                  <div className="relative h-48 bg-gray-100">
                    {item.type === 'photo' ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-blue-500" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <Video className="w-12 h-12 text-purple-500" />
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className={typeColors[item.type]}>
                        {item.type === 'photo' ? (
                          <ImageIcon className="w-3 h-3" />
                        ) : (
                          <Video className="w-3 h-3" />
                        )}
                        {item.type === 'photo' ? 'Photo' : 'Video'}
                      </Badge>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className={statusColors[item.status]}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Category: {item.category}</span>
                        <span>{formatFileSize(item.size)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Views: {item.views}</span>
                        <span>Likes: {item.likes}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.uploadDate
                          ? new Date(item.uploadDate).toLocaleDateString()
                          : ''}
                      </div>
                    </div>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 2).map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Dialog
                        open={
                          isViewModalOpen &&
                          selectedItem?._id === item._id
                        }
                        onOpenChange={(open) => {
                          setIsViewModalOpen(open);
                          if (open) setSelectedItem(item);
                          else setSelectedItem(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{item.title}</DialogTitle>
                            <DialogDescription>
                              {item.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Media Display */}
                            <div className="relative h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                              {item.type === 'photo' ? (
                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                  <ImageIcon className="w-24 h-24 text-blue-500" />
                                </div>
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                  <Video className="w-24 h-24 text-purple-500" />
                                </div>
                              )}
                            </div>

                            {/* Details */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-500">
                                  Category
                                </label>
                                <p className="text-sm text-gray-900">
                                  {item.category}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">
                                  Status
                                </label>
                                <Badge className={statusColors[item.status]}>
                                  {item.status}
                                </Badge>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">
                                  Upload Date
                                </label>
                                <p className="text-sm text-gray-900">
                                  {item.uploadDate
                                    ? new Date(item.uploadDate).toLocaleDateString()
                                    : ''}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">
                                  File Size
                                </label>
                                <p className="text-sm text-gray-900">
                                  {formatFileSize(item.size)}
                                </p>
                              </div>
                              {item.location && (
                                <div>
                                  <label className="text-sm font-medium text-gray-500">
                                    Location
                                  </label>
                                  <p className="text-sm text-gray-900">
                                    {item.location}
                                  </p>
                                </div>
                              )}
                              {item.event && (
                                <div>
                                  <label className="text-sm font-medium text-gray-500">
                                    Event
                                  </label>
                                  <p className="text-sm text-gray-900">
                                    {item.event}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Tags */}
                            {item.tags && item.tags.length > 0 && (
                              <div>
                                <label className="text-sm font-medium text-gray-500">
                                  Tags
                                </label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {item.tags.map((tag, i) => (
                                    <Badge key={i} variant="outline">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsViewModalOpen(false)}
                            >
                              Close
                            </Button>
                            <Button
                              onClick={() => {
                                setIsViewModalOpen(false);
                                setSelectedItem(item);
                                handleEditOpen(item);
                              }}
                              className="bg-primary hover:bg-primary/90"
                            >
                              Edit Media
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={
                          isEditModalOpen &&
                          selectedItem?._id === item._id
                        }
                        onOpenChange={(open) => {
                          setIsEditModalOpen(open);
                          if (open) {
                            setSelectedItem(item);
                            setEditItem({
                              ...item,
                              tags: Array.isArray(item.tags) ? item.tags : [],
                            });
                          } else {
                            setSelectedItem(null);
                            setEditItem({});
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Media</DialogTitle>
                            <DialogDescription>
                              Update the details for {item.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">
                                Title
                              </label>
                              <Input
                                value={editItem.title ?? ''}
                                onChange={e => handleEditChange('title', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Status
                                </label>
                                <Select
                                  value={editItem.status ?? ''}
                                  onValueChange={value => handleEditChange('status', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Category
                                </label>
                                <Input
                                  value={editItem.category ?? ''}
                                  onChange={e => handleEditChange('category', e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Description
                              </label>
                              <textarea
                                value={editItem.description ?? ''}
                                onChange={e => handleEditChange('description', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Media URL
                                </label>
                                <Input
                                  value={editItem.url ?? ''}
                                  onChange={e => handleEditChange('url', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Thumbnail URL
                                </label>
                                <Input
                                  value={editItem.thumbnail ?? ''}
                                  onChange={e => handleEditChange('thumbnail', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <label className="text-sm font-medium">
                                  Photographer
                                </label>
                                <Input
                                  value={editItem.photographer ?? ''}
                                  onChange={e => handleEditChange('photographer', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Location
                                </label>
                                <Input
                                  value={editItem.location ?? ''}
                                  onChange={e => handleEditChange('location', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">
                                  Event
                                </label>
                                <Input
                                  value={editItem.event ?? ''}
                                  onChange={e => handleEditChange('event', e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Tags (comma separated)
                              </label>
                              <Input
                                value={Array.isArray(editItem.tags) ? editItem.tags.join(', ') : ''}
                                onChange={e =>
                                  handleEditChange(
                                    'tags',
                                    e.target.value
                                      .split(',')
                                      .map((tag: string) => tag.trim())
                                      .filter(Boolean)
                                  )
                                }
                              />
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
                              onClick={handleUpdateItem}
                              className="bg-primary hover:bg-primary/90"
                            >
                              Update Media
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={
                          isDeleteModalOpen &&
                          selectedItem?._id === item._id
                        }
                        onOpenChange={(open) => {
                          setIsDeleteModalOpen(open);
                          if (open) setSelectedItem(item);
                          else setSelectedItem(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Media</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete &quot;
                              {item.title}
                              &quot;? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsDeleteModalOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                if (item._id) {
                                  handleDeleteItem(item._id);
                                } else {
                                  console.error('Cannot delete item: ID is missing');
                                }
                              }}
                            >
                              Delete Media
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && !loading && !error && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-bold mb-2">No media found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Show All Media
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}