import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED'],
    default: 'DRAFT',
  },
  publishDate: {
    type: Date,
    required: true,
  },
  featuredImage: {
    type: String,
    default: '',
  },
  readTime: {
    type: Number,
    default: 5,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  seoTitle: {
    type: String,
    default: '',
  },
  seoDescription: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;

