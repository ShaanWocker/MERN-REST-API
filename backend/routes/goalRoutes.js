const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalContoller');

router.route('/').get(getGoals).post(setGoal);
router.route('/:id').delete(deleteGoal).put(updateGoal);

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
