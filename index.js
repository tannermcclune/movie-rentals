const express = require('express'),
    layouts = require("express-ejs-layouts"),
    router = express.Router(),
    app = express(),
    mongoose = require('mongoose'),
    Joi = require('joi'),
    //OLD IMPORTS for ROUTES
    // index = require('./routes/index'),
    // genre = require('./routes/genre'),
    // members = require('./routes/member'),
    // movie = require('./routes/movie'),
    // rental = require('./routes/rental'),
    // users = require('./routes/users'),
    // login = require('./routes/login'),
    expressSession = require("express-session"),
    connectFlash = require('connect-flash'),
    homeController = require('./controllers/homeController'),
    movieController = require('./controllers/movieController'),
    accountController = require('./controllers/accountController'),
    PORT = process.env.PORT || 3000,
    config = require('config');
    require("dotenv").config();


// Authentication that Yixin started making
Joi.objectId = require('joi-objectid')(Joi);
if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

// Getting Flash messages set up
router.use(expressSession({
    secret: "blockbuster_secret_code",
    cookie: {
        maxAge: 300000
    },
    resave: false,
    saveUninitialized: false
}));
router.use(connectFlash());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
})

// Database configuration
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('connected to DB;'))
    .catch((error) => console.log(error));

// Some Express stuff
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

// OLD ROUTES
// router.use("/", index);
// router.use('/genres', genre);
// router.use('/members', members);
// router.use('/movies', movie);
// router.use('/rentals', rental);
// router.use('/users', users);
// router.use('/login', login);

// NEW ROUTES
router.get("/", homeController.index);
router.get("/login", accountController.login);
router.get("/genres", movieController.genres);
router.get("/rentals", movieController.rentals);
router.get("/movies", movieController.moviesShow, movieController.movies);
router.get("/users", accountController.users);
router.get("/users/create", accountController.create);
router.post("/users/create", accountController.createNew, accountController.redirect);
router.get("/members", accountController.members);


app.use("/", router);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));