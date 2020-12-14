const { MovieStock } = require('../models/movieStock');
const _ = require('lodash');
const baseUrl = 'https://image.tmdb.org/t/p/original/';

module.exports = {
  showAdd: (req, res, next) => {
    const id = req.params.id;
    const movies = res.locals.trendingMovies;
    console.log(typeof id);
    const movie = movies.filter((m) => m.id == id);
    res.render('movies/newMovie.ejs', { movie: movie[0] });
  },
  addStock: async (req, res, next) => {
    // const { title, description, genre, languagge, rate, price } = req.body;
    let user = new MovieStock(
      _.pick(req.body, [
        'title',
        'description',
        'genre',
        'language',
        'rate',
        'price',
      ])
    );
    try {
      await user.save();
      req.flash('success', 'Movie Added!');
      //Redirect to show all page
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  },
};
