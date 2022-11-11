'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/category"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

//Admin Panle
router.post('/add_category', authMiddleware.verifyToken, controller.addCategory);
router.post('/get_all_category', authMiddleware.verifyToken, controller.getAllCategory);
router.post('/get_category', authMiddleware.verifyToken, controller.getCategory);
router.put("/update_category/:category_id", authMiddleware.verifyToken, controller.updateCategory);
router.delete("/remove_category/:category_id", authMiddleware.verifyToken, controller.deleteCategory);

//Website

module.exports = router;


