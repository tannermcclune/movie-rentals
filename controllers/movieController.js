module.exports = {
    genres: (req, res) => {
      res.render("genres/show");
    },
    rentals: (req, res) => {
      res.render("rentals/rentals");
    },
    movies: (req, res) => {
      res.render("movies/show");
    },
  };