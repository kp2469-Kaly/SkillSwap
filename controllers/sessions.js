const Session = require('../models/Session');
const User = require('../models/User');

// @desc    Get all sessions
// @route   GET /api/sessions
// @access  Private
exports.getSessions = async (req, res, next) => {
  try {
    let query;

    // Find sessions where user is either teacher or student
    if (req.user) {
      query = Session.find({
        $or: [{ teacher: req.user.id }, { student: req.user.id }]
      });
    } else {
      query = Session.find();
    }

    // Populate with related data
    query = query
      .populate({
        path: 'teacher',
        select: 'name profileImage'
      })
      .populate({
        path: 'student',
        select: 'name profileImage'
      })
      .populate('skill');

    const sessions = await query;

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single session
// @route   GET /api/sessions/:id
// @access  Private
exports.getSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: 'teacher',
        select: 'name profileImage email'
      })
      .populate({
        path: 'student',
        select: 'name profileImage email'
      })
      .populate('skill');

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Make sure user is either the teacher or student
    if (
      session.teacher._id.toString() !== req.user.id &&
      session.student._id.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this session'
      });
    }

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Create new session
// @route   POST /api/sessions
// @access  Private
exports.createSession = async (req, res, next) => {
  try {
    // Add user to req.body as student
    req.body.student = req.user.id;

    // Check if teacher exists
    const teacher = await User.findById(req.body.teacher);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        error: 'Teacher not found'
      });
    }

    // Create session
    const session = await Session.create(req.body);

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update session
// @route   PUT /api/sessions/:id
// @access  Private
exports.updateSession = async (req, res, next) => {
  try {
    let session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Make sure user is either the teacher or student
    if (
      session.teacher.toString() !== req.user.id &&
      session.student.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this session'
      });
    }

    session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete session
// @route   DELETE /api/sessions/:id
// @access  Private
exports.deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Make sure user is either the teacher or student
    if (
      session.teacher.toString() !== req.user.id &&
      session.student.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this session'
      });
    }

    await session.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};
