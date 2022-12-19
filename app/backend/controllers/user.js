const User = require('../models/user');
const jwt = require('jsonwebtoken');

// create token
const createToken = (_id) =>
   jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1h' });

// signup
const signup = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      const user = await User.singup(name, email, password);

      const token = createToken(user._id);

      res.status(200).json({ name: user.name, email, token });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

// login
const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.login(email, password);

      const token = createToken(user._id);

      res.status(200).json({ name: user.name, email, token });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

module.exports = { signup, login };
