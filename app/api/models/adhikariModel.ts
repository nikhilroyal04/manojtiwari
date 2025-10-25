import mongoose from 'mongoose';

const adhikariSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  number: { type: String, required: true },
  officeNumber: { type: String, required: false },
  workArea: { type: String, required: false },
  additionalInfo: { type: String, required: false },
  department: { type: String, required: false },
  image: { type: String, required: false },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'RESIGNED'],
    default: 'ACTIVE'
  },
  designation: { type: String, required: false },
  joiningDate: { type: String, required: false },
  experience: { type: Number, default: 0 },
  qualification: { type: String, required: false },
  address: { type: String, required: false },
  emergencyContact: { type: String, required: false },
}, {
  timestamps: true
});

const Adhikari = mongoose.models.Adhikari || mongoose.model('Adhikari', adhikariSchema);

export default Adhikari;
