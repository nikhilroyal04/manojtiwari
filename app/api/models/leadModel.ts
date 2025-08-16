import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,  
  status: {
    type: String,
    enum: ['new', 'contacted', 'interested', 'not_interested', 'converted', 'qualified', 'lost'],
    default: 'new'
  },
  notes: String,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
}); 

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

export default Lead;