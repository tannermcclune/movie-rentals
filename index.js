const express = require('express'),
    layouts = require("express-ejs-layouts"),
    router = express.Router(),
    app = express(),
    mongoose = require('mongoose'),
    Joi = require('joi'),
    index = require('./routes/index'),
    genre = require('./routes/genre'),
    members = require('./routes/member'),
    movie = require('./routes/movie'),
    rental = require('./routes/rental'),
    users = require('./routes/users'),
    login = require('./routes/login'),
    cookieParser = require("cookie-parser"),
    connectFlash = require("connect-flash"),
    PORT = process.env.PORT || 3000,
    config = require('config');
require("dotenv").config();

Joi.objectId = require('joi-objectid')(Joi);

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('connected to DB;'))
    .catch((error) => console.log(error));

router.use(express.json());
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
router.use(layouts);
router.use(express.static("public"));
router.use(
    express.urlencoded({
        extended: false
    })
)


router.use("/", index);
router.use('/genres', genre);
router.use('/members', members);
router.use('/movies', movie);
router.use('/rentals', rental);
router.use('/users', users);
router.use('/login', login);

app.use("/", router);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));