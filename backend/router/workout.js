const express = require('express');
const router = express.Router();
const {
   getAllWorkouts,
   getWorkout,
   createWrokout,
   updateWorkout,
   deleteWorkout,
} = require('../controllers/workout');

// get all workouts
router.get('/', getAllWorkouts);

// get single workout
router.get('/:workoutId', getWorkout);

// create new workout
router.post('/', createWrokout);

// update workout
router.patch('/:workoutId', updateWorkout);

// delete workout
router.delete('/:workoutId', deleteWorkout);

module.exports = router;
