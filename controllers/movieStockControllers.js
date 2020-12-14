const { MovieStock } = require('../models/movieStock');
const _ = require('lodash');
const baseUrl = 'https://image.tmdb.org/t/p/original/';

module.exports = {
  showAdd: (req, res, next) => {
    const id = req.params.id;
    const movies = res.locals.trendingMovies;
    console.log(typeof id);
    const movie = movies.filter((m) => m.id == id);
    res.render('movies/newMovie.ejs', { movie: movie[0], baseUrl: baseUrl });
  },
  addStock: async (req, res, next) => {
    const {
      title,
      description,
      genre,
      language,
      rate,
      price,
      imageURL,
    } = req.body;
    let movie = new MovieStock({
      title: title,
      description: description,
      genre: genre,
      language: language,
      rate: rate,
      price: price,
      imageURL: imageURL,
    });
    try {
      await movie.save();
      req.flash('success', 'Movie Added!');
      //Redirect to show all page
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  },
};
