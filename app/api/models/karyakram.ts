import mongoose from "mongoose";

const karyakramSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  date: { type: Date, required: false },
  time: { type: String, required: false },
  location: { type: String, required: false },
  type: { type: String, required: false },
  image: { type: String, required: false },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled', 'postponed'],
    default: 'upcoming'
  },
  expectedAttendees: { type: Number, default: 0 },
  actualAttendees: { type: Number, default: 0 },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  organizer: { type: String, required: false, default: null },
  contactPerson: { type: String, required: false, default: null },
  contactNumber: { type: String, required: false, default: null },
  notes: { type: String, required: false, default: null }
}, {
  timestamps: true // createdAt, updatedAt auto add kar dega
});

const Karyakram = mongoose.models.Karyakram || mongoose.model('Karyakram', karyakramSchema);

export default Karyakram;
