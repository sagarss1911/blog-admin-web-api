'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require('../controllers/admin-users'),
    authMiddleware = require("../middleware/authValidation");

router.post('/add_user', authMiddleware.verifyToken, controller.createUser);
router.post('/get_users_list', authMiddleware.verifyToken, controller.getUsersData);
router.put('/edit_user/:id', authMiddleware.verifyToken, controller.editUser);
router.delete('/delete_user/:id', authMiddleware.verifyToken, controller.deleteUser);


module.exports = router;