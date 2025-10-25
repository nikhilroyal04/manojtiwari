import mongoose from 'mongoose';

const jantaDarbarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  agenda: { type: String, required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['open', 'close', 'ongoing'], 
    required: true 
  },
  location: { type: String, required: true },
  images: [{ type: String }], // Made optional - array can be empty
  mainImage: { type: String, required: true },
  attendees: { type: Number, default: 0 },
  issues: { type: Number, default: 0 },
  resolved: { type: Number, default: 0 }
}, {
  timestamps: true // createdAt, updatedAt fields auto add kar dega
});

const JantaDarbar = mongoose.models.JantaDarbar || mongoose.model('JantaDarbar', jantaDarbarSchema);

export default JantaDarbar;
