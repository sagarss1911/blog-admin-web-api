'use strict';
let journeyManager = require('../managers/journey');


/**
 * @swagger
 * /api/JourneyIcon/get_all_JourneyIcon:
 *   post:
 *     summary: Get All JourneyIcons.
 *     tags:
 *      - Journey
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
 *         description: JourneyIcons object
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
let getAllJourneyIcon = (req, res, next) => {
    return journeyManager
        .getAllJourneyIcon(req.body)
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
 * /api/JourneyIcon/remove_JourneyIcon/{JourneyIcon_id}:
 *   delete:
 *     summary: delete JourneyIcon.
 *     tags:
 *      - Journey
 *     parameters:
 *        - in : path
 *          name: JourneyIcon_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: JourneyIcon object
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
let removeJourneyIcon = (req, res, next) => {
    return journeyManager
        .removeJourneyIcon(req.params.icon_id)
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
 * /api/JourneyIcon/add_JourneyIcons:
 *   post:
 *     summary: Add or update JourneyIcon in one API. if you want to update a JourneyIcon , add the id of that JourneyIcon in id field or else keep it empty
 *     tags:
 *      - Journey
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               seoDescription:
 *                 type: string
 *                 example: xyz
 *               seoKeyword:
 *                 type: string
 *                 example: xyz
 *               image:
 *                 type: file
 *                 example: ""
 *               mapImage:
 *                 type: file
 *                 example: ""
 *               active:
 *                 type: boolean
 *                 example: 0
 *               feature:
 *                 type: boolean
 *                 example: 0
 *               _id:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: JourneyIcon object
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
let addJourneyIcon = (req, res, next) => {
    return journeyManager
        .addJourneyIcon(req)
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
 * /api/JourneyIcon/get_JourneyIcon/{JourneyIcon_id}:
 *   get:
 *     summary: get JourneyIcon.
 *     tags:
 *      - Journey
 *     parameters:
 *        - in : path
 *          name: JourneyIcon_id
 *     schema:
 *        typ   e:string
 *           required:true
 *     responses:
 *       200:
 *         description: JourneyIcon object
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
let getJourneyIcon = (req, res, next) => {
    return journeyManager
        .getJourneyIcon(req.params.id)
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
 * /api/journey/get_journey_cards_details:
 *   post:
 *     summary: get Journey Card cards with pagination and filter
 *     tags:
 *      - Journey
 *     responses:
 *       200:
 *         description: Journey Card card object
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
let getJourneyCardsDetails = (req, res, next) => {
    return journeyManager
        .getJourneyCardsDetails(req.body)
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
 * /api/journey/add_journey:
 *   post:
 *     summary: Add or update Journey Card card in one API. if you want to update a Journey , add the id of that object in id field or else keep it empty
 *     tags:
 *      - Journey
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
let addJourneyCard = (req, res, next) => {
    return journeyManager
        .addJourneyCard(req.body)
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
 * /api/journey/get_journey_cards/{Journey_id}:
 *   get:
 *     summary: get Journey.
 *     tags:
 *      - Journey
 *     parameters:
 *        - in : path
 *          name: Journey_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: Journey Card object
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
let getJourneyCard = (req, res, next) => {
    return journeyManager
        .getJourneyCard(req.params.card_id)
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
 * /api/journey/delete_journey_cards/{Journey_id}:
 *   delete:
 *     summary: delete Journey Card.
 *     tags:
 *      - Journey
 *     parameters:
 *        - in : path
 *          name: Journey_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: Journey Card object
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
let deleteJourneyCard = (req, res, next) => {
    return journeyManager
        .deleteJourneyCard(req.params.card_id)
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
    addJourneyIcon: addJourneyIcon,
    getAllJourneyIcon: getAllJourneyIcon,
    removeJourneyIcon: removeJourneyIcon,
    getJourneyIcon: getJourneyIcon,
    //cards api
    addJourneyCard: addJourneyCard,
    deleteJourneyCard: deleteJourneyCard,
    getJourneyCard: getJourneyCard,
    getJourneyCardsDetails: getJourneyCardsDetails,
}