'use strict';
let manager = require('../managers/admin-users')


/**
 * @swagger
 * /api/admin_user/add_user:
 *   post:
 *     summary: Add Admin.
 *     tags:
 *      - Admin
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: xyz
 *               email:
 *                 type: string
 *                 example: xyz
 *               userName:
 *                 type: string
 *                 example: xyz
 *               password:
 *                 type: string
 *                 example: xyz
 *               active:
 *                 type: boolean
 *                 example: 0
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
let createUser = async (req, res, next) => {
    return manager
        .createUser(req.user, req.body)
        .then((data) => {
            let result = {
                status: 200,
                data: data,
            };
            return res.json(result);
        })
        .catch(next);
};


/**
 * @swagger
 * /api/admin_user/get_users_list:
 *   post:
 *     summary: Get the list of all the admins and if you want fetch particular admin detail send the id of the admin in the body
 *     tags:
 *      - Admin
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
 *               _id:
 *                 type: string
 *                 example: ""
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
let getUsersData = (req, res, next) => {
    return manager
        .getUsersData(req.user, req.body)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}


/**
 * @swagger
 * /api/admin_user/edit_user/{id}:
 *   put:
 *     summary: update admin.
 *     tags:
 *      - Admin
 *     parameters:
 *        - in : path
 *          name: id
 *     schema:
 *        type:string
 *           required:true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: xyz
 *               email:
 *                 type: string
 *                 example: xyz
 *               userName:
 *                 type: string
 *                 example: xyz
 *               password:
 *                 type: string
 *                 example: xyz
 *               active:
 *                 type: boolean
 *                 example: 0
 *     responses:
 *       200:
 *         description: admin object
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
let editUser = (req, res, next) => {
    return manager
        .editUser(req.params.id, req.body)
        .then(data => {
            return res.json({
                data: data
            });
        })
        .catch(next);
}


/**
 * @swagger
 * /api/admin_user/delete_user/{admin_id}:
 *   delete:
 *     summary: delete Admin.
 *     tags:
 *      - Admin
 *     parameters:
 *        - in : path
 *          name: admin_id
 *     schema:
 *        type:string
 *           required:true
 *     responses:
 *       200:
 *         description: admin object
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
let deleteUser = (req, res, next) => {
    return manager
        .deleteUser(req.params.id)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}


module.exports = {
    createUser: createUser,
    getUsersData: getUsersData,
    editUser: editUser,
    deleteUser: deleteUser,
}