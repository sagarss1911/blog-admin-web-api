'use strict';

let express = require("express"),
       router = express.Router(),
       controller = require("../controllers/contributors"),
       helper = require("../helpers/fileUpload"),
       authMiddleware = require("../middleware/authValidation");

//  all blog Api's
router.post('/add_contributor', controller.addContribuor);
router.get('/get_contributors', controller.getContributtors);


module.exports = router;