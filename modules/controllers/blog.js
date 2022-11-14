'use strict';

let blogmanager = require('../managers/blogs');



/**
 * @swagger
 * /api/blogs/add_blog:
 *   post:
 *     summary: Add blog .
 *     tags:
 *      - blogs
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: ObjectId
 *                 
 *               image:
 *                 type: file
 *                 example: ""
 *               slug:
 *                 type: string
 *                 example: xyz
 *               smallDiscription:
 *                 type: string
 *                 example: xyz
 *               fullDiscription:
 *                 type: string
 *                 example: xyz
 *               seoTitle:
 *                 type: string
 *                 example: xyz
 *               seoDescription:
 *                 type: string
 *                 example: xyz
 *               seoKeyword:
 *                 type: string
 *                 example: xyz
 *               categoryIds[]:
 *                 type: array
 *                 items: 
 *                    type: string 
 *                    example: ObjectId
 *               highlightCategory:
 *                 type: string
 *                 
 *               createdBy:
 *                 type: string
 *                 
 *               imageBy:
 *                 type: string
 *                 
 *               wordsBy:
 *                 type: string
 *                    
 *                 paramType: body
 *     responses:
 *       200:
 *         description: blog object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       400:
 *         description: error in request processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
*/
let addBlogs = (req, res, next) => {
       return blogmanager
              .addBlogs(req)
              .then(data => {
                     let result = {
                            status: 200,
                            data: data
                     }
                     return res.json(result);
              })
              .catch(next);
}

/**
 * @swagger
 * /api/blogs/get_all_blog:
 *   post:
 *     summary: Get All Blogs.
 *     tags:
 *      - blogs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: number
 *                 example: 1
 *               limit:
 *                 type: number
 *                 example: 10
 *                 paramType: body
 *     responses:
 *       200:
 *         description: blogs object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       400:
 *         description: error in request processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
*/


let getAllBlogs = (req, res, next) => {
       return blogmanager
              .getAllBlogs(req.body)
              .then(data => {
                     let result = {
                            status: 200,
                            data: data
                     }
                     return res.json(result);
              })
              .catch(next);
}


/**
 * @swagger
 * /api/blogs/remove_blog/{blog_id}:
 *   delete:
 *     summary: delete blog.
 *     tags:
 *      - blogs
 *     parameters:
 *        - in : path
 *          name: blog_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: blog object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       400:
 *         description: error in request processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
*/
let removeBlog = (req, res, next) => {
       return blogmanager
              .removeBlog(req.params.blog_id)
              .then(data => {
                     let result = {
                            status: 200,
                            data: data
                     }
                     return res.json(result);
              })
              .catch(next);
}



/**
 * @swagger
 * /api/blogs/get_blog/{blog_id}:
 *   get:
 *     summary: get blog.
 *     tags:
 *      - blogs
 *     parameters:
 *        - in : path
 *          name: blog_id
 *     responses:
 *       200:
 *         description: blog object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       400:
 *         description: error in request processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
*/
let getBlogs = (req, res, next) => {
       return blogmanager
              .getBlogs(req.params.blog_id)
              .then(data => {

                     let result = {
                            status: 200,
                            data: data
                     }
                     return res.json(result);
              })
              .catch(next);
}
module.exports = {
       addBlogs,
       getAllBlogs,
       removeBlog,
       getBlogs,
}


