'use strict';

let blogmanager = require('../managers/blogs');

/**
 * @swagger
 * /api/product/getallproduct:
 *   post:
 *     summary: Get All product.
 *     tags:
 *      - product
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
 *         description: product object
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
 * /api/product/remove_product/{slider_id}:
 *   delete:
 *     summary: delete product.
 *     tags:
 *      - product
 *     responses:
 *       200:
 *         description: product object
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
              .removeBlog(req.params.slider_id)
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
 * /api/product/get_all_product_website:
 *   post:
 *     summary: Get All product For Website.
 *     tags:
 *      - product
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
 *         description: product object
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
let getAllProductForWebsite = (req, res, next) => {
       return blogmanager
              .getAllProductForWebsite(req.body)
              .then(data => {
                     let result = {
                            status: 200,
                            data: data
                     }
                     return res.json(result);
              })
              .catch(next);
}

let getAllSubProductForWebsite = (req, res, next) => {
       return blogmanager
              .getAllSubProductForWebsite(req.body)
              .then(data => {
                     let result = {
                            status: 200,
                            data: data
                     }
                     return res.json(result);
              })
              .catch(next);
}
let getAllSearchedProduct = (req, res, next) => {
       return blogmanager
              .getAllSearchedProduct(req.body)
              .then(data => {
                     let result = {
                            status: 200,
                            data: data
                     }
                     return res.json(result);
              })
              .catch(next);
}




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

let getBlogs = (req, res, next) => {
       return blogmanager
              .getBlogs(req.body)
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
       getAllBlogs,
       removeBlog,
       addBlogs,
       getBlogs,
       //Website
       getAllProductForWebsite,
       getAllSubProductForWebsite,
       getAllSearchedProduct,

}