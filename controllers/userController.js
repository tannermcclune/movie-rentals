const { User, userVlidate } = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
module.exports = {
  showLogin: (req, res) => {
    res.render('users/login', {
      error: undefined,
    });
  },
  showRegister: (req, res) => {
    res.render('users/register', {
      error: undefined,
    });
  },
  registeUser: async (req, res) => {
    const { error } = userVlidate(req.body);
    const { name, email, password, password2 } = req.body;
    const emailError = await User.findOne({ email: email });
    if (error) {
      res.render('users/register', {
        error: error.details[0].message,
        name: name,
        email: email,
        password: password,
        password2: password2,
      });
    } else {
      if (emailError) {
        res.render('users/register', {
          error: 'The email is already been registed !',
          name: name,
          email: email,
          password: password,
          password2: password2,
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let user = new User({
          name: name,
          email: email,
          password: hashedPassword,
        });
        try {
          await user.save();
          req.flash('success', 'You are now registered!');
          res.redirect('/users/login');
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  },
  userLogin: (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      successFlash: true,
      failureRedirect: '/users/login',
      failureFlash: true,
    })(req, res, next);
  },
};
