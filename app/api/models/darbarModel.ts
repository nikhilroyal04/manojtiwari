import mongoose from 'mongoose';

const jantaDarbarSchema = new mongoose.Schema({
  title: { type: String, required: false },
  agenda: { type: String, required: false },
  date: { type: Date, required: false },
  status: { 
    type: String, 
    enum: ['open', 'close', 'ongoing'], 
    required: false 
  },
  location: { type: String, required: false },
  images: [{ type: String }], // Made optional - array can be empty
  mainImage: { type: String, required: false },
  attendees: { type: Number, default: 0 },
  issues: { type: Number, default: 0 },
  resolved: { type: Number, default: 0 }
}, {
  timestamps: true // createdAt, updatedAt fields auto add kar dega
});

const JantaDarbar = mongoose.models.JantaDarbar || mongoose.model('JantaDarbar', jantaDarbarSchema);

export default JantaDarbar;
