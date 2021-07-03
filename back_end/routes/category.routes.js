const routes = require("express").Router();
const ctrl = require("../controllers");

routes.route("/movie/category").get(ctrl.categoryController.category);
routes.route("/movie/categoryName").get(ctrl.categoryController.categoryName);
routes.route("/movie/categoryId").get(ctrl.categoryController.categoryId);

module.exports = routes;
