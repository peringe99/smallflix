const router = require("express").Router();
const ctrl = require("../controllers");

router.route("/signup").post(ctrl.authController.signup_post);
router.route("/login").post(ctrl.authController.login_post);

module.exports = router;
