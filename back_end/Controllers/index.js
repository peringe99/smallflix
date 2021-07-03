const controller = {};

controller.authController = require("./authController/authController");
controller.adminController = require("./admin.controller/adminController");
controller.movieController = require("./movies.controller/movieController");
controller.categoryController = require("./movies.controller/category.controller");

module.exports = controller;
