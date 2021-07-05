const routes = require("express").Router();
const ctrl = require("../controllers");

routes
  .route("/movie/moviesByCategory/:id")
  .get(ctrl.movieController.getMoviesInCategory);

routes.route("/movies/allMovies").get(ctrl.movieController.getAllMovies);

routes.route("/movies/search/:title").get(ctrl.movieController.search);

module.exports = routes;
