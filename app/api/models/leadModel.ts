import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  subject: { type: String, required: false },
  message: { type: String, required: false },
  status: {
    type: String,
    enum: ['new', 'contacted', 'interested', 'not_interested', 'converted', 'qualified', 'lost'],
    default: 'new',
    required: false
  },
  notes: { type: String, required: false },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
    required: false
  },
  createdOn: { type: Date, default: Date.now, required: false },
  updatedOn: { type: Date, default: Date.now, required: false },
}); 

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

export default Lead;