import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  uploadDate: { type: Date, required: true },
  size: { type: Number, required: true },
  dimensions: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['public', 'private', 'draft'], 
    default: 'public' 
  },
  location: { type: String, required: true },
  event: { type: String, required: true },
  photographer: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

export default Gallery;
