const User = require("../models/user"),
    getUserParams = body => {
        return {
            username: body.userName,
            firstname: body.firstName,
            lastname: body.lastName,
            email: body.email,
            password: body.password,
            isAdmin: body.isAdmin
        };
    };


module.exports = {
    login: (req, res) => {
        res.render("login/show")
    },
    users: (req, res) => {
        res.render("users/show")
    },
    members: (req, res) => {
        res.render("members/show")
    },
    create: (req, res) => {
        res.render("users/create")
    },
    createNew: (req, res, next) => {
        let newUser = getUserParams(req.body);
        User.create(newUser, (error, user) => {
            if (error) {
                console.log(error.message);
                console.log(req.body);
                req.flash("error", "COULD NOT CREATE A NEW USER :(");
                res.locals.redirect = "/users/create";
                next();
            } else {
                res.locals.redirect = "/login";
                res.locals.user = user;
                req.flash("success", `User ${user.username} created successfully!`);
                next();
            }
        });
      },
      redirect: (req, res) => {
          res.redirect(`${res.locals.redirect}`);
      },
      getAllUsers: async (req, res, next) => {
          let data = await User.find().then(data => {
              res.locals.users = data;
              res.render("users/allUsers");
          })
      }
  };
