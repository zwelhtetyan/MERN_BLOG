const { default: mongoose, model } = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      tags: {
         type: [String],
         validate: (tags) => Array.isArray(tags) && tags.length > 0,
      },
      body: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

module.exports = model('Blog', blogSchema);
