'use strict';
let aboutUsManager = require('../managers/abouts-us');

/**
 * @swagger
 * /api/about_us/get_about_us_details:
 *   get:
 *     summary: get About us.
 *     tags:
 *      - About Us
 *     responses:
 *       200:
 *         description: about us object
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
let getAboutUsDetails = (req, res, next) => {
    return aboutUsManager
        .getAboutUsDetails(req.body)
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
 * /api/about_us/add_about_us:
 *   post:
 *     summary: Add or update About us in one API. if you want to update a Aboutus , add the id of that object in id field or else keep it empty
 *     tags:
 *      - About Us
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               mission:
 *                 type: string
 *                 example: xyz
 *               aim:
 *                 type: string
 *                 example: xyz
 *               firstDescription:
 *                 type: string
 *                 example: xyz 
 *               firstTitle:
 *                 type: string
 *                 example: xyz
 *               firstColumn:
 *                 type: string
 *                 example: xyz
 *               secondColumn:
 *                 type: string
 *                 example: xyz
 *               contributorPara1:
 *                 type: string
 *                 example: xyz
 *               contributorPara2:
 *                 type: string
 *                 example: xyz
 *               secondTitle:
 *                 type: string
 *                 example: xyz
 *               image:
 *                 type: file
 *                 example: ""
 *               _id:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: AboutUs object
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
let addAboutUs = (req, res, next) => {
    return aboutUsManager
        .addAboutUs(req)
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
 * /api/about_us/get_about_us:
 *   get:
 *     summary: get Aboutus.
 *     tags:
 *      - About Us
 *     responses:
 *       200:
 *         description: about us object
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
let getAboutUs = (req, res, next) => {
    return aboutUsManager
        .getAboutUs()
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
 * /api/about_us/delete_about_us/{aboutUs_id}:
 *   delete:
 *     summary: delete About Us.
 *     tags:
 *      - About Us
 *     parameters:
 *        - in : path
 *          name: aboutUs_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: About Us object
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
let deleteAboutUs = (req, res, next) => {
    return aboutUsManager
        .deleteAboutUs(req.params.aboutUs_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}




// cards


/**
 * @swagger
 * /api/about_us/get_about_us_cards_details:
 *   post:
 *     summary: get About us cards with pagination and filter
 *     tags:
 *      - About Us
 *     responses:
 *       200:
 *         description: about us card object
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
let getAboutUsCardsDetails = (req, res, next) => {
    return aboutUsManager
        .getAboutUsCardsDetails(req.body)
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
 * /api/about_us/add_about_us:
 *   post:
 *     summary: Add or update About us card in one API. if you want to update a Aboutus , add the id of that object in id field or else keep it empty
 *     tags:
 *      - About Us
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cardDescription:
 *                 type: string
 *                 example: xyz 
 *     responses:
 *       200:
 *         description: card object
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
let addAboutUsCards = (req, res, next) => {
    return aboutUsManager
        .addAboutUsCards(req.body)
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
 * /api/about_us/get_about_us_cards/{aboutUs_id}:
 *   get:
 *     summary: get Aboutus.
 *     tags:
 *      - About Us
 *     parameters:
 *        - in : path
 *          name: aboutUs_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: about us object
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
let getAboutUsCard = (req, res, next) => {
    return aboutUsManager
        .getAboutUsCard(req.params.aboutUs_id)
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
 * /api/about_us/delete_about_us_cards/{aboutUs_id}:
 *   delete:
 *     summary: delete About Us.
 *     tags:
 *      - About Us
 *     parameters:
 *        - in : path
 *          name: aboutUs_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: About Us object
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
let deleteAboutUsCard = (req, res, next) => {
    return aboutUsManager
        .deleteAboutUsCard(req.params.aboutUs_id)
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
    addAboutUs: addAboutUs,
    getAboutUs: getAboutUs,
    getAboutUsDetails: getAboutUsDetails,
    deleteAboutUs: deleteAboutUs,
    //cards api
    addAboutUsCards: addAboutUsCards,
    deleteAboutUsCard: deleteAboutUsCard,
    getAboutUsCard: getAboutUsCard,
    getAboutUsCardsDetails: getAboutUsCardsDetails,


}