const db = require("../../models");

const Movies = db.Movies;

module.exports.getAllMovies = async (req, res) => {
  const moviesResult = await Movies.find();

  if (moviesResult) {
    res.status(200).json(moviesResult);
  } else {
    res.status(404).send({ msg: "Kan inte hitta data" });
  }
};
module.exports.getMoviesInCategory = async (req, res) => {
  const { id } = req.params;

  const moviesResult = await Movies.find({ category: id }).populate(
    "category",
    "cat_type -_id"
  );
  if (moviesResult) {
    res.status(200).json(moviesResult);
  } else {
    res.status(404).send({ msg: "Kan inte hitta data" });
  }
};
module.exports.search = async (req, res) => {
  const { title } = req.params;
  console.log(title);

  const moviesResult = await Movies.find({
    title: { $regex: new RegExp(title, "i") },
  }).limit(10);
  if (moviesResult) {
    res.status(200).json(moviesResult);
  } else {
    res.status(404).send({ msg: "Kan inte hitta data" });
  }
};
