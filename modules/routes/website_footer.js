'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/website_footer"),
    authMiddleware = require("../middleware/authValidation"),
    helper = require("../helpers/fileUpload");

//footer link api
router.post('/get_footer_links', authMiddleware.verifyToken, controller.getFooterLinks);

router.get('/get_footer_links_details/:Link_id', authMiddleware.verifyToken, controller.getFooterLinksDetails);

router.post('/add_footer_links', authMiddleware.verifyToken, controller.addFooterLinks);

router.delete('/delete_footer_link/:Link_id', authMiddleware.verifyToken, controller.deleteFooterLinks);


//footer headings
router.post('/get_footer_headings', controller.getFooterHeading);

router.get('/get_footer_headings_details/:heading_id', authMiddleware.verifyToken, controller.getFooterHeadingDetails);

router.post('/add_footer_headings', authMiddleware.verifyToken, controller.addFooterHeading);

router.delete('/delete_footer_heading/:heading_id', authMiddleware.verifyToken, controller.deleteFooterHeading);

module.exports = router;


