const { default: mongoose, model } = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      subtitle: {
         type: String,
      },
      body: {
         type: String,
         required: true,
      },
      author: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

module.exports = model('Blog', blogSchema);
