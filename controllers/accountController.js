const User = require("../models/user"),
    getUserParams = body => {
        return {
            userName: body.userName,
            email: body.email,
            password: body.password
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
                req.flash("success", `User ${user.userName} created successfully!`);
                next();
            }
        });
      },
      redirect: (req, res) => {
          res.redirect(`${res.locals.redirect}`);
      }
  };
