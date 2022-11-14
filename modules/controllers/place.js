'use strict';
let PlaceManager = require('../managers/place');


/**
 * @swagger
 * /api/place/get_all_place:
 *   post:
 *     summary: Get All places.
 *     tags:
 *      - Place
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
 *         description: places object
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
let getAllPlace = (req, res, next) => {
    return PlaceManager
        .getAllPlace(req.body)
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
 * /api/place/remove_place/{place_id}:
 *   delete:
 *     summary: delete place.
 *     tags:
 *      - Place
 *     parameters:
 *        - in : path
 *          name: place_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: place object
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
let removePlace = (req, res, next) => {
    return PlaceManager
        .removePlace(req.params.place_id)
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
 * /api/place/add_places:
 *   post:
 *     summary: Add or update Place in one API. if you want to update a place , add the id of that place in id field or else keep it empty
 *     tags:
 *      - Place
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               placeName:
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
 *               image:
 *                 type: file
 *                 example: ""
 *               mapImage:
 *                 type: file
 *                 example: ""
 *               active:
 *                 type: boolean
 *                 example: 0
 *               _id:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: place object
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
let addPlace = (req, res, next) => {
    return PlaceManager
        .addPlace(req)
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
 * /api/place/get_place/{place_id}:
 *   get:
 *     summary: get place.
 *     tags:
 *      - Place
 *     parameters:
 *        - in : path
 *          name: place_id
 *     schema:
 *        typ   e:string
 *           required:true
 *     responses:
 *       200:
 *         description: place object
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
let getPlace = (req, res, next) => {
    return PlaceManager
        .getPlace(req.params.id)
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
    getAllPlace: getAllPlace,
    removePlace: removePlace,
    addPlace: addPlace,
    getPlace: getPlace,
}