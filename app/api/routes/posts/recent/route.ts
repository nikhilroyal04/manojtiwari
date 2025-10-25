import { NextResponse } from 'next/server';
import * as postServices from '../../../services/posts/postServices';

// GET - Get recent posts (limit 6, published only, sorted by date)
export async function GET() {
  try {
    const allPosts = await postServices.getAllPosts();
    
    // Filter for published posts only and limit to 6 most recent
    const recentPosts = allPosts
      .filter(post => post.status === 'PUBLISHED')
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, 6);
    
    return NextResponse.json(recentPosts);
  } catch (error: unknown) {
    console.error('Error fetching recent posts:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch recent posts' },
      { status: 500 }
    );
  }
}

