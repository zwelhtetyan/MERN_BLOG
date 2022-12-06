const { ObjectID, ObjectId } = require('bson');
const Workout = require('../models/workout');

// get all workouts
const getAllWorkouts = async (req, res) => {
   try {
      const allWorkouts = await Workout.find().sort({ createdAt: -1 });
      res.status(200).json(allWorkouts);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// get single workout
const getWorkout = async (req, res) => {
   const { workoutId } = req.params;

   if (!ObjectID.isValid(workoutId))
      return res.status(404).json({ error: 'no such workout with that Id :)' });

   try {
      const workout = await Workout.findById({ _id: workoutId });
      res.status(200).json(workout);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// create new workout
const createWrokout = async (req, res) => {
   try {
      const workout = await Workout.create(req.body);
      res.status(200).json(workout);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

// update workout
const updateWorkout = async (req, res) => {
   const { workoutId } = req.params;

   try {
      const workout = await Workout.findOneAndUpdate(
         { _id: workoutId },
         req.body
      );
      res.status(200).json(workout);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// delete workout
const deleteWorkout = async (req, res) => {
   const { workoutId } = req.params;

   try {
      const workout = await Workout.findOneAndDelete({ _id: workoutId });
      res.status(200).json(workout);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

module.exports = {
   getAllWorkouts,
   getWorkout,
   createWrokout,
   updateWorkout,
   deleteWorkout,
};
