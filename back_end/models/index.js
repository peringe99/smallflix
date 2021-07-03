const db = {};

db.role = require("./authentication/role.model");
db.user = require("./authentication/user.model");

db.movieModel = require("./movies/movieModel");
db.categoryModel = require("./movies/categoryModel");
db.Movies = require('./movies/movies')

db.ROLES = ["user", "admin", "superadmin"];

module.exports = db;
