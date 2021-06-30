const { Router } = require("express");
const ctrl = require("../../controllers");

const router = Router();

router.route("/users").get(ctrl.adminController.allUserInRole);
router.route("/users2").get(ctrl.adminController.allUserInRole2);
router.route("/updateRole").post(ctrl.adminController.updateRole);
router.route("/updatePassword").post(ctrl.adminController.updatePassword);

module.exports = router;
