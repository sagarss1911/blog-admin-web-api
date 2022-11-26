'use strict';

let express = require("express"),
       router = express.Router(),
       controller = require("../controllers/blog"),
       helper = require("../helpers/fileUpload"),
       authMiddleware = require("../middleware/authValidation");

//  all blog Api's
router.post('/add_blog', authMiddleware.verifyToken, helper.uploadBlogs.fields([{ name: 'image' }]), controller.addBlogs);
router.get('/get_blog/:blog_id', controller.getBlogs);
router.post('/get_all_blog', controller.getAllBlogs);
router.delete('/remove_blog/:blog_id', authMiddleware.verifyToken, controller.removeBlog);
router.post('/add_fav', controller.addToFav);
router.post('/add_bookMark', controller.addBookmark);
router.get('/get_all_favBlogs/:id', controller.getFavBlogs);
router.get('/get_all_bookMark/:id', controller.getbookMarkBlogs);
router.post('/search', controller.search);

module.exports = router;