import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  excerpt: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
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
    required: false,
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
    required: false,
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

