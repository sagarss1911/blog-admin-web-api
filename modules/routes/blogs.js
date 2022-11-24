'use strict';

let express = require("express"),
       router = express.Router(),
       controller = require("../controllers/blog"),
       helper = require("../helpers/fileUpload"),
       authMiddleware = require("../middleware/authValidation");

//  all blog Api's
router.post('/add_blog', authMiddleware.verifyToken, helper.uploadBlogs.fields([{ name: 'image' }]), controller.addBlogs);
router.get('/get_blog/:blog_id', authMiddleware.verifyToken, controller.getBlogs);
router.post('/get_all_blog', authMiddleware.verifyToken, controller.getAllBlogs);
router.delete('/remove_blog/:blog_id', authMiddleware.verifyToken, controller.removeBlog);
router.post('/add_fav', authMiddleware.verifyToken, controller.addToFav);
router.post('/add_bookMark', authMiddleware.verifyToken, controller.addBookmark);
router.get('/get_all_favBlogs/:id', authMiddleware.verifyToken, controller.getFavBlogs);
router.get('/get_all_bookMark/:id', authMiddleware.verifyToken, controller.getbookMarkBlogs);
router.post('/search', authMiddleware.verifyToken, controller.search);

module.exports = router;