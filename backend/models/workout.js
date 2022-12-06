const { default: mongoose, model } = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      reps: {
         type: Number,
         required: true,
      },
      load: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true }
);

module.exports = model('Workout', workoutSchema);
