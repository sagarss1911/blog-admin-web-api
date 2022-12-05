'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/change_icon"),
    authMiddleware = require("../middleware/authValidation"),
    helper = require("../helpers/fileUpload");
//changeIcon API
router.post('/get_all_icons', controller.getAllIcons);

router.post('/add_icon', authMiddleware.verifyToken, helper.uploadIconImage.fields([{ name: 'image' }, { name: 'logoImage' }]), controller.addIcon);

router.get('/get_icon_by_id/:id', authMiddleware.verifyToken, controller.getIconById);

router.get('/get_icon', controller.getIcon);
module.exports = router;


