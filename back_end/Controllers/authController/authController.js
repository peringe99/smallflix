const db = require("../../models");
const {
  registerValidation,
  loginValidation,
} = require("../../utilities/validation_schema");
const generateToken = require("../../utilities/generateToken");

const Role = db.role;
const User = db.user;

module.exports.signup_post = async (req, res) => {
  const { error, value } = registerValidation(req.body);
  if (error) {
    return res
      .status(400)
      .send({ msg: error.details[0].message, path: error.details[0].path[0] });
  }

  const emailExist = await User.findOne({ email: value.email });
  if (emailExist)
    return res
      .status(400)
      .send({ msg: `${req.body.email} is already been registered` });

  const user = new User({
    name: value.name,
    email: value.email,
    password: value.password,
  });

  try {
    await user.save((err, user) => {
      if (err) {
        console.log("error", err);
      }
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          console.log(err);
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
      });
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

module.exports.login_post = async (req, res) => {
  // Validate the data before save
  const { error, value } = loginValidation(req.body);
  if (error) {
    return res
      .status(400)
      .send({ msg: error.details[0].message, path: error.details[0].path[0] });
  }
  // Checking if the email exists
  const user = await User.findOne({ email: value.email });
  if (user && (await user.matchPassword(value.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ msg: "Invalid Email or password" });
  }
};
