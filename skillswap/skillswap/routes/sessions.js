const express = require('express');
const {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession
} = require('../controllers/sessions');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All session routes require authentication
router.use(protect);

router
  .route('/')
  .get(getSessions)
  .post(createSession);

router
  .route('/:id')
  .get(getSession)
  .put(updateSession)
  .delete(deleteSession);

module.exports = router;
