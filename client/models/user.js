const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
});

// static signup methods
userSchema.statics.singup = async function (name, email, password) {
   if (!email.trim() || !password.trim())
      throw Error('All fields must be filled!');

   if (!validator.isEmail(email)) throw Error('Email must be a strong email');

   if (password.length < 3) throw Error('Password must be a strong password');

   const alreadyExist = await this.findOne({ email });

   if (alreadyExist) throw Error('Email already exists');

   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);

   const user = await this.create({ name, email, password: hash });

   return user;
};

userSchema.statics.login = async function (email, password) {
   if (!email.trim() || !password.trim())
      throw Error('All fields must be filled!');

   const user = await this.findOne({ email });

   if (!user) throw Error('Incorrect email');

   const match = await bcrypt.compare(password, user.password);

   if (!match) throw Error('Invalid password');

   return user;
};

module.exports = mongoose.model('User', userSchema);
