'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/website_header"),
    authMiddleware = require("../middleware/authValidation"),
    helper = require("../helpers/fileUpload");

// //Sub Header api

router.post('/add_Header_subHeading', authMiddleware.verifyToken, controller.addHeaderSubHeading);

router.post('/get_sub_header', controller.getAllSubHeader);

router.get('/get_sub_header/:subheader_id', authMiddleware.verifyToken, controller.getSubHeader);

router.delete('/delete_sub_header/:subheader_id', authMiddleware.verifyToken, controller.deleteSubHeader);

router.get('/get_main_header_sub', controller.getMainHeader);


//Header headings api

router.post('/add_Header_headings', authMiddleware.verifyToken, controller.addHeaderMainheading);

router.post('/get_main_header', controller.getAllMainHeader);

router.get('/get_header/:header_id', authMiddleware.verifyToken, controller.getHeader);

router.delete('/delete_header/:header_id', authMiddleware.verifyToken, controller.deleteHeader);


module.exports = router;


