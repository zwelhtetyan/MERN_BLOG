require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { default: mongoose } = require('mongoose');
const blogRoutes = require('./router/blog');
const userRoutes = require('./router/user');

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/blogs', blogRoutes);
app.use(userRoutes);

// connect to database
const connect = async () => {
   await mongoose.connect(process.env.MONGO_URI);
   app.listen(process.env.PORT, () =>
      console.log('connected to db & listening on port', process.env.PORT)
   );
};
connect().catch((err) => console.log(err));
