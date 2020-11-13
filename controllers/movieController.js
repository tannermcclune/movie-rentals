const Movie = require("../module/movie"),
  getMovieParams = body => {
    return {
        
    };
  };

module.exports = {
    genres: (req, res) => {
      res.render("genres/show");
    },
    rentals: (req, res) => {
      res.render("rentals/rentals");
    },
    moviesShow: (req, res) => {
      res.render("movies/show");
    },
    movies: (req, res, next) => {
      Movie.find()
      .then(movies => {
        res.locals.movies = movies;
        next();
      })
      .catch(error => {
        console.log("Can't get movies!")
        next(error);
      })
    }
  };