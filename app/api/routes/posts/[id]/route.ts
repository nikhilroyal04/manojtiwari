import { NextRequest, NextResponse } from 'next/server';
import * as postServices from '../../../services/posts/postServices';
import { uploadToS3 } from '../../../controller/imageController';

// GET - Get post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await postServices.getPostById(id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error: unknown) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT - Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contentType = request.headers.get('content-type') || '';
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let postData: any;
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      
      // Extract text fields
      postData = {};
      formData.forEach((value, key) => {
        if (key !== 'featuredImage') {
          if (key === 'tags') {
            // Parse tags as JSON array
            postData[key] = typeof value === 'string' ? JSON.parse(value) : value;
          } else {
            postData[key] = value;
          }
        }
      });
      
      // Handle image upload
      const file = formData.get('featuredImage') as File | null;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const multerFile = {
          fieldname: 'featuredImage',
          originalname: file.name,
          encoding: '7bit',
          mimetype: file.type,
          buffer: buffer,
          size: file.size,
        } as Express.Multer.File;
        
        const uploaded = await uploadToS3(multerFile);
        postData.featuredImage = uploaded.url;
      }
    } else {
      postData = await request.json();
    }
    
    const updatedPost = await postServices.updatePost(id, postData);
    
    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedPost);
  } catch (error: unknown) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deletedPost = await postServices.deletePost(id);
    
    if (!deletedPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete post' },
      { status: 500 }
    );
  }
}

