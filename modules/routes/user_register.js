'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/user_register"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");



router.post('/add_user', controller.userRegister);

router.post('/update_user', authMiddleware.verifyUserByIdToken, helper.uploadUserImage.fields([{ name: 'profileImage' }, { name: 'coverImage' }]), controller.updateUser);

router.get('/get_user/:id', authMiddleware.verifyUserByIdToken, controller.getUser);

router.post('/get_all_user', controller.getAllUser);

router.post('/update_password', controller.updatePassword)

router.delete('/remove_user/:user_id', authMiddleware.verifyUserByIdToken, controller.removeUser);

module.exports = router;







