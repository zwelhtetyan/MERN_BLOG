require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { default: mongoose } = require('mongoose');
const multer = require('multer');
const path = require('path');
const blogRoutes = require('./router/blog');
const userRoutes = require('./router/user');

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

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

// image upload
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'images');
   },
   filename: function (req, file, cb) {
      console.log(req.body);
      cb(null, req.body.imgName);
   },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('img'), (req, res) => {
   res.status(200).json('Image uploaded successfully');
});
