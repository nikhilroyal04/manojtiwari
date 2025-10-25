import { NextRequest, NextResponse } from 'next/server';
import * as postServices from '../../services/posts/postServices';
import { uploadToS3 } from '../../controller/imageController';

// GET - Get all posts
export async function GET() {
  try {
    const posts = await postServices.getAllPosts();
    return NextResponse.json(posts);
  } catch (error: unknown) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - Create new post
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract text fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const postData: any = {};
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
    
    const post = await postServices.createPost(postData);
    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create post' },
      { status: 500 }
    );
  }
}

