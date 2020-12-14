const passport = require('passport');

const express = require('express'),
  layouts = require('express-ejs-layouts'),
  router = express.Router(),
  app = express(),
  mongoose = require('mongoose'),
  expressSession = require('express-session'),
  connectFlash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  homeController = require('./controllers/homeController'),
  movieController = require('./controllers/movieController'),
  userController = require('./controllers/userController'),
  movieStockController = require('./controllers/movieStockControllers');
passportConfig = require('./config/auth');
PORT = process.env.PORT || 3000;

require('dotenv').config();

// Database configuration
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('connected to DB;'))
  .catch((error) => console.log(error));

//config
router.use(express.json());
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
router.use(layouts);
router.use(express.static('public'));
router.use(
  express.urlencoded({
    extended: false,
  })
);
router.use(cookieParser('blockbuster_secret_code'));
router.use(connectFlash());
router.use(
  expressSession({
    secret: 'blockbuster_secret_code',
    cookie: {
      maxAge: 300000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
//passport Middleware
router.use(passport.initialize());
router.use(passport.session());
//passport config
passportConfig(passport);
//Global vars
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.currentUser = req.user;
  console.log(req.user);
  next();
});

//Home Route
router.get('/', homeController.index);
// router.get('/login', accountController.login);

//MovieStock
router.get(
  '/movieStock/add/:id',
  movieController.getApiMovie,
  movieStockController.showAdd
);
router.post('/movieStock/post', movieStockController.addStock);
// MOVIES
router.get(
  '/movies/show',
  movieController.getApiMovie,
  movieController.getMovie
);
router.get(
  '/movies/singleTrendingNow/:id',
  movieController.getApiMovie,
  movieController.getSingleTrending
);
// USERS
router.get('/users/login', userController.showLogin);
router.get('/users/register', userController.showRegister);
router.get('/users/logout', userController.userLogout);
router.post('/users/register', userController.registeUser);
router.post('/users/login', userController.userLogin);

app.use('/', router);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
