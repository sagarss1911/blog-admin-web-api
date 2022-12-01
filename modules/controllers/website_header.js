'use strict';
let websiteHeaderManager = require('../managers/website_header');


/**
 * @swagger
 * /api/website_Header/get_Header_links_details/{Link_id}:
 *   get:
 *     summary: get Header Link with id in path for edit.
 *     tags:
 *      - Header
 *     parameters:
 *        - in : path
 *          name: Link_id
 *     responses:
 *       200:
 *         description: Header object
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
let getSubHeader = (req, res, next) => {
    return websiteHeaderManager
        .getSubHeader(req.params.subheader_id)
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
 * /api/website_Header/add_Header_links:
 *   post:
 *     summary: Add or update Header link in one API. if you want to update a Header link , add the id of that object in id field or else keep it empty
 *     tags:
 *      - Header
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               linkName:
 *                 type: string
 *                 example: xyz
 *               link:
 *                 type: string
 *                 example: xyz
 *               _id:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Header link object
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
let addHeaderSubHeading = (req, res, next) => {
    return websiteHeaderManager
        .addHeaderSubHeading(req)
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
 * /api/website_Header/get_Header_links:
 *   post:
 *     summary: get all Header links with pagination value.
 *     tags:
 *      - Header
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
 *         description: Header object
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
let getAllSubHeader = (req, res, next) => {
    return websiteHeaderManager
        .getAllSubHeader(req.body)
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
 * /api/website_Header/delete_Header_link/{Link_id}:
 *   delete:
 *     summary: delete Header Link with id passed in path as parameter.
 *     tags:
 *      - Header
 *     parameters:
 *        - in : path
 *          name: Link_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: Header object
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
let deleteSubHeader = (req, res, next) => {
    return websiteHeaderManager
        .deleteSubHeader(req.params.subheader_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

//Header headings


/**
 * @swagger
 * /api/website_Header/get_Header_headings_details/{heading_id}:
 *   get:
 *     summary: get Header Heading with id in path for edit.
 *     tags:
 *      - Header
 *     parameters:
 *        - in : path
 *          name: heading_id
 *     responses:
 *       200:
 *         description: Header Heading object
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
let getHeader = (req, res, next) => {
    return websiteHeaderManager
        .getHeader(req.params.header_id)
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
 * /api/website_Header/add_Header_headings:
 *   post:
 *     summary: Add or update Header headings in one API. if you want to update a Header headings , add the id of that object in id field or else keep it empty
 *     tags:
 *      - Header
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               explore:
 *                 type: string
 *                 example: xyz
 *               community:
 *                 type: string
 *                 example: xyz
 *               store:
 *                 type: string
 *                 example: xyz
 *               about:
 *                 type: string
 *                 example: xyz
 *               follow:
 *                 type: string
 *                 example: xyz
 *               _id:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Header heading object
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
let addHeaderMainheading = (req, res, next) => {
    return websiteHeaderManager
        .addHeaderMainheading(req)
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
 * /api/website_Header/get_Header_headings:
 *   post:
 *     summary: get all Header headings with pagination values.
 *     tags:
 *      - Header
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
 *         description: Header object
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
let getAllMainHeader = (req, res, next) => {
    return websiteHeaderManager
        .getAllMainHeader(req.body)
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
 * /api/website_Header/deleteHeader/{heading_id}:
 *   delete:
 *     summary: delete Header heading with id passed in path as parameter.
 *     tags:
 *      - Header
 *     parameters:
 *        - in : path
 *          name: heading_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: Header object
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
let deleteHeader = (req, res, next) => {
    return websiteHeaderManager
        .deleteHeader(req.params.header_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let getMainHeader = (req, res, next) => {
    return websiteHeaderManager
        .getMainHeader(req.body)
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
    addHeaderSubHeading: addHeaderSubHeading,
    getSubHeader: getSubHeader,
    getAllSubHeader: getAllSubHeader,
    deleteSubHeader: deleteSubHeader,


    //main header
    addHeaderMainheading: addHeaderMainheading,
    getHeader: getHeader,
    getAllMainHeader: getAllMainHeader,
    deleteHeader: deleteHeader,
    getMainHeader: getMainHeader


}