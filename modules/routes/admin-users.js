'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require('../controllers/admin-users'),
    authMiddleware = require("../middleware/authValidation");

router.post("/login", controller.login);
router.post('/add-user', authMiddleware.verifyToken, controller.createUser)
router.post('/get-users-list', authMiddleware.verifyToken, controller.getUsersData)
router.put('/edit-user/:id', authMiddleware.verifyToken, controller.editUser)
router.delete('/delete-user/:id', authMiddleware.verifyToken, controller.deleteUser)

module.exports = router;