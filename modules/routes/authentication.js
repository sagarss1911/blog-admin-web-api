'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/authentication"),
    authMiddleware = require("../middleware/authValidation");

router.post("/login", controller.login);
router.post("/logout", authMiddleware.verifyUserByIdToken, controller.logOut);


module.exports = router;