import Post from '../../models/postModel';
import connectDatabase from '../../config/db';

// Get all posts
export const getAllPosts = async () => {
  await connectDatabase();
  const posts = await Post.find().sort({ createdAt: -1 });
  return posts;
};

// Get post by ID
export const getPostById = async (id: string) => {
  await connectDatabase();
  const post = await Post.findById(id);
  return post;
};

// Get post by slug
export const getPostBySlug = async (slug: string) => {
  await connectDatabase();
  const post = await Post.findOne({ slug });
  return post;
};

// Create new post
export const createPost = async (postData: {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags?: string[];
  status?: string;
  publishDate: string;
  featuredImage?: string;
  readTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
}) => {
  await connectDatabase();
  const post = await Post.create(postData);
  return post;
};

// Update post
export const updatePost = async (id: string, postData: Partial<{
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: string;
  publishDate: string;
  featuredImage: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  lastModified: Date;
}>) => {
  await connectDatabase();
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { ...postData, lastModified: new Date() },
    { new: true, runValidators: true }
  );
  return updatedPost;
};

// Delete post
export const deletePost = async (id: string) => {
  await connectDatabase();
  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
};

// Increment views
export const incrementViews = async (id: string) => {
  await connectDatabase();
  const post = await Post.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );
  return post;
};

// Increment likes
export const incrementLikes = async (id: string) => {
  await connectDatabase();
  const post = await Post.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  return post;
};

