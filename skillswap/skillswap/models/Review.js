const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a review title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  text: {
    type: String,
    required: [true, 'Please add review text'],
    maxlength: [500, 'Review cannot be more than 500 characters']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  session: {
    type: mongoose.Schema.ObjectId,
    ref: 'Session',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  reviewee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent user from submitting more than one review per session
ReviewSchema.index({ session: 1, reviewer: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);
