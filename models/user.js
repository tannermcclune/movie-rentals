const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  myMovie: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movie',
    },
  ],
});

const User = mongoose.model('user', userSchema);

const userVlidate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(1).required(),
    password2: Joi.ref('password'),
  });
  return schema.validate(user);
};

module.exports.User = User;
module.exports.userVlidate = userVlidate;
