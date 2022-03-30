const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalContoller');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

// Other options

// GET
// router.get('/', getGoals);

// // POST
// router.post('/', setGoal);

// // PUT
// router.put('/:id', updateGoal);

// // DELETE
// router.delete('/:id', deleteGoal);

module.exports = router;
