const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a session title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  skill: {
    type: mongoose.Schema.ObjectId,
    ref: 'Skill',
    required: true
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please add a date for the session']
  },
  duration: {
    type: Number,
    required: [true, 'Please add a duration in minutes']
  },
  location: {
    type: {
      type: String,
      enum: ['Point', 'Online'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    address: String,
    online: {
      platform: String,
      link: String
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Session', SessionSchema);
