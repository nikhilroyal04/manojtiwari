import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  type: { type: String, required: false },
  url: { type: String, required: false },
  thumbnail: { type: String, required: false },
  category: { type: String, required: false },
  tags: [{ type: String }],
  uploadDate: { type: Date, required: false },
  size: { type: Number, required: false },
  dimensions: { type: String, required: false },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['public', 'private', 'draft'], 
    default: 'public' 
  },
  location: { type: String, required: false },
  event: { type: String, required: false },
  photographer: { type: String, required: false },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);

export default Gallery;
