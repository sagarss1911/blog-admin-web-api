'use strict';

let categoryManager = require('../managers/category');

/**
 * @swagger
 * /api/category/add_category:
 *   post:
 *     summary: Add or update category in single API. If you want to update a category, enter _id in the _id field or else leave it blank.
 *     tags:
 *      - Category 
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:  
 *               categoryName:
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
 *               _id:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: category object
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
let addCategory = (req, res, next) => {

    return categoryManager
        .addCategory(req.body)
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
 * /api/category/get_all_category:
 *   post:
 *     summary: Get All Category.
 *     tags:
 *      - Category 
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
 *         description: category object
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
let getAllCategory = (req, res, next) => {
    return categoryManager
        .getAllCategory(req.body)
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
 * /api/category/get_category:
 *   post:
 *     summary: get category.
 *     tags:
 *      - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: category object
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


let getCategory = (req, res, next) => {
    return categoryManager
        .getCategory(req)
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
 * /api/category/remove_category/{category_id}:
 *   delete:
 *     summary: delete category.
 *     tags:
 *      - Category
 *     parameters:
 *        - in : path
 *          name: category_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: category object
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

let deleteCategory = (req, res, next) => {
    return categoryManager
        .deleteCategory(req.params.category_id)
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
    getAllCategory: getAllCategory,
    deleteCategory: deleteCategory,
    addCategory: addCategory,
    getCategory: getCategory,

}