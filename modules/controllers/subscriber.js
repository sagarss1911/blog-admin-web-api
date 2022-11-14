'use strict';

let SubscriberManager = require('../managers/subscriber');

/**
 * @swagger
 * /api/subscriber/get_all_subscriber:
 *   post:
 *     summary: Get All subscriber.
 *     tags:
 *      - subscriber
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
 *         description: subscriber object
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



let getAllSubscriber = (req, res, next) => {
    return SubscriberManager
        .getAllSubscriber(req.body)
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
 * /api/subscriber/remove_subscriber/{subscriber_id}:
 *   delete:
 *     summary: delete subscriber.
 *     tags:
 *      - subscriber
 *     parameters:
 *        - in : path
 *          name: subscriber_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: subscriber object
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

let removeSubscriber = (req, res, next) => {
    return SubscriberManager
        .removeSubscriber(req.params.subscriber_id)
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
 * /api/subscriber/add_subscriber:
 *   post:
 *     summary: Add or update subscriber in single API. If you want to update a subscriber, enter _id in the _id field or else leave it blank.
 *     tags:
 *      - subscriber
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               subscriberName:
 *                 type: string
 *                 example: xyz
 *               password:
 *                 type: string
 *                 example: xyz
 *               location:
 *                 type: string
 *                 example: xyz
 *               website:
 *                 type: string
 *                 example: xyz
 *               shortDescription:
 *                 type: string
 *                 example: xyz
 *               profileImage:
 *                 type: file
 *                 example: ""
 *               coverImage:
 *                 type: file
 *                 example: ""
 *               _id:
 *                 type: string
 *                 example: ""
 *            
 *     responses:
 *       200:
 *         description: subscriber object
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


let addSubscriber = (req, res, next) => {

    return SubscriberManager
        .addSubscriber(req)
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
 * /api/subscriber/get_subscriber/{subscriber_id}:
 *   get:
 *     summary: get subscriber.
 *     tags:
 *      - subscriber
 *     parameters:
 *        - in : path
 *          name: subscriber_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: subscriber object
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

let getSubscriber = (req, res, next) => {
    return SubscriberManager
        .getSubscriber(req.params.subscriber_id)
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
    addSubscriber: addSubscriber,
    getSubscriber: getSubscriber,

    getAllSubscriber: getAllSubscriber,
    removeSubscriber: removeSubscriber,


}