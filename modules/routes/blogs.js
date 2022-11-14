'use strict';

let express = require("express"),
       router = express.Router(),
       controller = require("../controllers/blog"),
       helper = require("../helpers/fileUpload"),
       authMiddleware = require("../middleware/authValidation");

router.post('/add_blog', authMiddleware.verifyToken, helper.uploadBlogs.fields([{ name: 'image' }]), controller.addBlogs);
router.get('/get_blog/:blog_id', authMiddleware.verifyToken, controller.getBlogs);
router.post('/get_all_blog', authMiddleware.verifyToken, controller.getAllBlogs);
router.delete('/remove_blog/:blog_id', authMiddleware.verifyToken, controller.removeBlog);




module.exports = router;