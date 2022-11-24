'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/journey"),
    authMiddleware = require("../middleware/authValidation"),
    helper = require("../helpers/fileUpload");




router.post('/add_journey_icon', authMiddleware.verifyToken, helper.uploadJourneyIconImage.fields([{ name: 'image' }]), controller.addJourneyIcon);

// router.put('/update_journey_icon/:icon_id', authMiddleware.verifyToken, controller.updateFeatureJourneyIcon);

router.post('/get_all_journey_icon', authMiddleware.verifyToken, controller.getAllJourneyIcon);

router.delete('/delete_journey_icon/:icon_id', authMiddleware.verifyToken, controller.removeJourneyIcon);

router.get('/get_journey_icon_by_id/:id', authMiddleware.verifyToken, controller.getJourneyIcon);


// cardsapi

router.get('/get_journey_cards/:card_id', authMiddleware.verifyToken, controller.getJourneyCard);

router.post('/get_journey_cards_details', authMiddleware.verifyToken, controller.getJourneyCardsDetails);

router.post('/add_journey_cards', authMiddleware.verifyToken, controller.addJourneyCard);

router.delete('/delete_journey_cards/:card_id', authMiddleware.verifyToken, controller.deleteJourneyCard);
module.exports = router;


