import mongoose from 'mongoose';

const adhikariSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  officeNumber: String,
  workArea: { type: String, required: true },
  additionalInfo: String,
  department: { type: String, required: true },
  image: String,
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'RESIGNED'],
    default: 'ACTIVE'
  },
  designation: { type: String, required: true },
  joiningDate: { type: String, required: true },
  experience: { type: Number, default: 0 },
  qualification: { type: String, required: true },
  address: String,
  emergencyContact: String
}, {
  timestamps: true
});

const Adhikari = mongoose.models.Adhikari || mongoose.model('Adhikari', adhikariSchema);

export default Adhikari;
