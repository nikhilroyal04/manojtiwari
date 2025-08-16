import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,  
  status: String,
  notes: String,
  priority: String,
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
}); 

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

export default Lead;