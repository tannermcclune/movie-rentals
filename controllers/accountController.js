const User = require("../models/user"),
    getUserParams = body => {
        return {
            //add what we need to return from creating a new user
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
        let userParams = getUserParams(req.body);
        User.create(userParams)
          .then(user => {
            res.locals.redirect = "/login";
            res.locals.user = user;
            next();
          })
          .catch(error => {
            console.log("COULD NOT CREATE A NEW USER :(");
            next(error);
          });
      },

  };