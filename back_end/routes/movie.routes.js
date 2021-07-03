const routes = require("express").Router();
const ctrl = require("../controllers");

routes
  .route("/movie/moviesByCategory/:id")
  .get(ctrl.movieController.getMoviesInCategory);

routes.route("/movies/allMovies").get(ctrl.movieController.getAllMovies);

module.exports = routes;
