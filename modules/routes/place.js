'use strict';

let express = require("express"),
       router = express.Router(),
       controller = require("../controllers/place"),
       authMiddleware = require("../middleware/authValidation"),
       helper = require("../helpers/fileUpload");
//place api
router.post('/get_all_place', authMiddleware.verifyToken, controller.getAllPlace);
router.delete('/remove_place/:place_id', authMiddleware.verifyToken, controller.removePlace);
router.post('/add_places', authMiddleware.verifyToken, helper.uploadPlaceImage.fields([{ name: 'image' }, { name: 'mapImage' }]), controller.addPlace);
router.get('/get_place/:id', authMiddleware.verifyToken, controller.getPlace);
router.put('/add_featured_places', authMiddleware.verifyToken, controller.addFeaturePlace);
router.get('/get_featured_places', controller.getFeaturePlace);
module.exports = router;


