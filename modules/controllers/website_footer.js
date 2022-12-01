'use strict';
let websitefooterManager = require('../managers/website_footer');


/**
 * @swagger
 * /api/website_footer/get_footer_links_details/{Link_id}:
 *   get:
 *     summary: get Footer Link with id in path for edit.
 *     tags:
 *      - Footer
 *     parameters:
 *        - in : path
 *          name: Link_id
 *     responses:
 *       200:
 *         description: Footer object
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
let getFooterLinksDetails = (req, res, next) => {
    return websitefooterManager
        .getFooterLinksDetails(req.params.Link_id)
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
 * /api/website_footer/add_footer_links:
 *   post:
 *     summary: Add or update Footer link in one API. if you want to update a Footer link , add the id of that object in id field or else keep it empty
 *     tags:
 *      - Footer
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
 *         description: footer link object
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
let addFooterLinks = (req, res, next) => {
    return websitefooterManager
        .addFooterLinks(req)
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
 * /api/website_footer/get_footer_links:
 *   post:
 *     summary: get all footer links with pagination value.
 *     tags:
 *      - Footer
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
 *         description: Footer object
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
let getFooterLinks = (req, res, next) => {
    return websitefooterManager
        .getFooterLinks(req.body)
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
 * /api/website_footer/delete_footer_link/{Link_id}:
 *   delete:
 *     summary: delete Footer Link with id passed in path as parameter.
 *     tags:
 *      - Footer
 *     parameters:
 *        - in : path
 *          name: Link_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: Footer object
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
let deleteFooterLinks = (req, res, next) => {
    return websitefooterManager
        .deleteFooterLinks(req.params.Link_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

//footer headings


/**
 * @swagger
 * /api/website_footer/get_footer_headings_details/{heading_id}:
 *   get:
 *     summary: get Footer Heading with id in path for edit.
 *     tags:
 *      - Footer
 *     parameters:
 *        - in : path
 *          name: heading_id
 *     responses:
 *       200:
 *         description: Footer Heading object
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
let getFooterHeadingDetails = (req, res, next) => {
    return websitefooterManager
        .getFooterHeadingDetails(req.params.heading_id)
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
 * /api/website_footer/add_footer_headings:
 *   post:
 *     summary: Add or update Footer headings in one API. if you want to update a Footer headings , add the id of that object in id field or else keep it empty
 *     tags:
 *      - Footer
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
 *         description: footer heading object
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
let addFooterHeading = (req, res, next) => {
    return websitefooterManager
        .addFooterHeading(req)
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
 * /api/website_footer/get_footer_headings:
 *   post:
 *     summary: get all footer headings with pagination values.
 *     tags:
 *      - Footer
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
 *         description: Footer object
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
let getFooterHeading = (req, res, next) => {
    return websitefooterManager
        .getFooterHeading(req.body)
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
 * /api/website_footer/delete_footer_heading/{heading_id}:
 *   delete:
 *     summary: delete Footer heading with id passed in path as parameter.
 *     tags:
 *      - Footer
 *     parameters:
 *        - in : path
 *          name: heading_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: Footer object
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
let deleteFooterHeading = (req, res, next) => {
    return websitefooterManager
        .deleteFooterHeading(req.params.heading_id)
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
    addFooterLinks: addFooterLinks,
    getFooterLinks: getFooterLinks,
    getFooterLinksDetails: getFooterLinksDetails,
    deleteFooterLinks: deleteFooterLinks,
    //heading
    addFooterHeading: addFooterHeading,
    getFooterHeading: getFooterHeading,
    getFooterHeadingDetails: getFooterHeadingDetails,
    deleteFooterHeading: deleteFooterHeading,


}