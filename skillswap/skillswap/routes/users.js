const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  addOfferedSkill,
  addWantedSkill,
  getSkillMatches
} = require('../controllers/users');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getUsers);
router.route('/matches').get(protect, getSkillMatches);
router.route('/:id').get(getUser).put(protect, updateUser);
router.route('/:id/skills/offered').put(protect, addOfferedSkill);
router.route('/:id/skills/wanted').put(protect, addWantedSkill);

module.exports = router;
