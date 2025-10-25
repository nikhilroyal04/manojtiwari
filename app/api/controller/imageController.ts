import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';

// AWS S3 Setup
const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const folderName = "saathi-portal-backups";

// Multer (memory storage) with increased file size limit for video uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB limit for video files
  }
});

// ✅ Upload single file to S3
const uploadToS3 = async (file: Express.Multer.File) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const filename = `${folderName}/${uniqueSuffix}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
    return {
      url: fileUrl,
      name: filename,
      originalName: file.originalname,
      type: file.mimetype,
      size: file.size,
    };
  } catch (error) {
    console.error("❌ Error uploading single file:", error);
    throw error;
  }
};

// ✅ Delete single file from S3
const deleteSingleImage = async (url: string) => {
  try {
    const key = url.split('/').slice(-2).join('/'); // folderName/filename.ext
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };
    await s3.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error(`❌ Error deleting single file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};


export {
  upload,
  uploadToS3,
  deleteSingleImage,
};
