const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a skill name'],
    trim: true,
    maxlength: [50, 'Skill name cannot be more than 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Technology',
      'Arts & Crafts',
      'Music',
      'Cooking',
      'Languages',
      'Sports & Fitness',
      'Academic',
      'Professional',
      'DIY & Home',
      'Other'
    ]
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  level: {
    type: String,
    required: [true, 'Please add a skill level'],
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Skill', SkillSchema);
