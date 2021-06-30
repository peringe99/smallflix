const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).send({ msg: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).send({ msg: "Not authorized, no token" });
  }
};

const checkUser = (req, res, next) => {
  let token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  // const token = req.headers.authorization.split(" ")[1];

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(403).send({ isAuthenticated: false });
      } else {
        console.log(decodedToken);
        res.status(200).send({ isAuthenticated: true });
      }
    });
  } else {
    res.status(403).send({ isAuthenticated: false });
  }
};

module.exports = { protect, checkUser };
