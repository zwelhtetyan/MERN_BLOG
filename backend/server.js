require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const workoutRoutes = require('./router/workout');

//express app
const app = express();

//middleware
app.use(express.json());

//routes
app.use(workoutRoutes);

// connect to database
const connect = async () => {
   await mongoose.connect(process.env.MONGO_URI);
   app.listen(process.env.PORT, () =>
      console.log('connected to db & listening on port', process.env.PORT)
   );
};
connect().catch((err) => console.log(err));
