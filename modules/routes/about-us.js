'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/about-us"),
    authMiddleware = require("../middleware/authValidation"),
    helper = require("../helpers/fileUpload");

//place api
router.get('/get_about_us', authMiddleware.verifyToken, controller.getAboutUs);

router.get('/get_about_us_details', authMiddleware.verifyToken, controller.getAboutUsDetails);

router.post('/add_about_us', authMiddleware.verifyToken, helper.uploadAboutUsImage.fields([{ name: 'image' }]), controller.addAboutUs);

router.delete('/delete_about_us/:aboutUs_id', authMiddleware.verifyToken, controller.deleteAboutUs);


// cardsapi

router.get('/get_about_us_cards/:aboutUs_id', authMiddleware.verifyToken, controller.getAboutUsCard);

router.post('/get_about_us_cards_details', authMiddleware.verifyToken, controller.getAboutUsCardsDetails);

router.post('/add_about_us_cards', authMiddleware.verifyToken, controller.addAboutUsCards);

router.delete('/delete_about_us_cards/:aboutUs_id', authMiddleware.verifyToken, controller.deleteAboutUsCard);

module.exports = router;


