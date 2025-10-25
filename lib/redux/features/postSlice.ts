import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Post {
  _id?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED';
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
  createdAt?: string;
  updatedAt?: string;
}

interface PostState {
  posts: Post[];
  recentPosts: Post[];
  loading: boolean;
  recentLoading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  recentPosts: [],
  loading: false,
  recentLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRecentLoading: (state, action) => {
      state.recentLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setRecentPosts: (state, action) => {
      state.recentPosts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePostInState: (state, action) => {
      const index = state.posts.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(p => p._id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setRecentLoading,
  setError,
  setPosts,
  setRecentPosts,
  addPost,
  updatePostInState,
  removePost,
} = postSlice.actions;

// Thunk actions
export const fetchPosts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch('/api/routes/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    dispatch(setPosts(data));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchRecentPosts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setRecentLoading(true));
    const response = await fetch('/api/routes/posts/recent');
    if (!response.ok) {
      throw new Error('Failed to fetch recent posts');
    }
    const data = await response.json();
    dispatch(setRecentPosts(data));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setRecentLoading(false));
  }
};

export const createPost = (post: Post, file?: File | null) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('excerpt', post.excerpt);
    formData.append('author', post.author);
    formData.append('category', post.category);
    formData.append('tags', JSON.stringify(post.tags));
    formData.append('status', post.status);
    formData.append('publishDate', post.publishDate);
    formData.append('readTime', post.readTime.toString());
    formData.append('slug', post.slug);
    
    if (post.seoTitle) formData.append('seoTitle', post.seoTitle);
    if (post.seoDescription) formData.append('seoDescription', post.seoDescription);
    if (file) formData.append('featuredImage', file);
    
    const response = await fetch('/api/routes/posts', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    
    const data = await response.json();
    dispatch(addPost(data));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updatePost = (id: string, post: Partial<Post>, file?: File | null) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    
    let response;
    
    if (file) {
      const formData = new FormData();
      Object.entries(post).forEach(([key, value]) => {
        if (key === 'tags') {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      formData.append('featuredImage', file);
      
      response = await fetch(`/api/routes/posts/${id}`, {
        method: 'PUT',
        body: formData,
      });
    } else {
      response = await fetch(`/api/routes/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
    }
    
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    
    const data = await response.json();
    dispatch(updatePostInState(data));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deletePost = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    
    const response = await fetch(`/api/routes/posts/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    
    dispatch(removePost(id));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Selectors
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectRecentPosts = (state: RootState) => state.posts.recentPosts;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectRecentPostsLoading = (state: RootState) => state.posts.recentLoading;
export const selectPostsError = (state: RootState) => state.posts.error;

export default postSlice.reducer;

