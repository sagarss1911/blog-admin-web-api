'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/subscriber"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");



router.post('/add_subscriber', authMiddleware.verifyToken, helper.uploadSubscriberImage.fields([{ name: 'profileImage' }, { name: 'coverImage' }]), controller.addSubscriber);

router.get('/get_subscriber/:subscriber_id', authMiddleware.verifyToken, controller.getSubscriber);

router.post('/get_all_subscriber', authMiddleware.verifyToken, controller.getAllSubscriber);

router.delete('/remove_subscriber/:subscriber_id', authMiddleware.verifyToken, controller.removeSubscriber);

module.exports = router;







