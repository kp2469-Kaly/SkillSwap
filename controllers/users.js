const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('skillsOffered')
      .populate('skillsWanted')
      .populate('reviews');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    // Make sure user is updating their own profile
    if (req.params.id !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this profile'
      });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Add skill to user's offered skills
// @route   PUT /api/users/:id/skills/offered
// @access  Private
exports.addOfferedSkill = async (req, res, next) => {
  try {
    // Make sure user is updating their own profile
    if (req.params.id !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this profile'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Add skill to skillsOffered array if not already there
    if (!user.skillsOffered.includes(req.body.skillId)) {
      user.skillsOffered.push(req.body.skillId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Add skill to user's wanted skills
// @route   PUT /api/users/:id/skills/wanted
// @access  Private
exports.addWantedSkill = async (req, res, next) => {
  try {
    // Make sure user is updating their own profile
    if (req.params.id !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this profile'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Add skill to skillsWanted array if not already there
    if (!user.skillsWanted.includes(req.body.skillId)) {
      user.skillsWanted.push(req.body.skillId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get users by skill match (users who offer skills that the current user wants)
// @route   GET /api/users/matches
// @access  Private
exports.getSkillMatches = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Find users who offer skills that the current user wants
    const matches = await User.find({
      skillsOffered: { $in: currentUser.skillsWanted },
      _id: { $ne: currentUser._id } // Exclude current user
    }).populate('skillsOffered').populate('skillsWanted');

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};
