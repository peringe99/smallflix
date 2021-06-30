const db = require("../../models");

const Category = db.categoryModel;

module.exports.category = async (req, res) => {
  try {
    const categoryResult = await Category.find();
    if (categoryResult) {
      res.status(200).json(categoryResult);
    } else {
      res.status(404).send({ msg: "Kan inte hitta data" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};
module.exports.categoryName = async (req, res) => {
  try {
    const categoryResult = await Category.find().select("cat_type -_id");
    if (categoryResult) {
      res.status(200).json(categoryResult);
    } else {
      res.status(404).send({ msg: "Kan inte hitta data" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};
module.exports.categoryId = async (req, res) => {
  try {
    const categoryResult = await Category.find().select("_id -cat_type -__v");
    if (categoryResult) {
      res.status(200).json(categoryResult);
    } else {
      res.status(404).send({ msg: "Kan inte hitta data" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};
