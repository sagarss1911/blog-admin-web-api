'use strict';

let UserManager = require('../managers/user_register');

let userRegister = (req, res, next) => {
    return UserManager
        .userRegister(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let updateUser = (req, res, next) => {
    return UserManager
        .updateUser(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getUser = (req, res, next) => {
    return UserManager
        .getUser(req.user)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllUser = (req, res, next) => {
    return UserManager
        .getAllUser(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let updatePassword = (req, res, next) => {
    return UserManager
        .updatePassword(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let removeUser = (req, res, next) => {
    return UserManager
        .removeUser(req.params.user_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let userRegisterContactUs = (req, res, next) => {
    return UserManager
        .userRegisterContactUs(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getContactUsDetail = (req, res, next) => {
    return UserManager
        .getContactUsDetail(req.body)
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
    userRegister: userRegister,
    updateUser: updateUser,
    getUser: getUser,
    getAllUser: getAllUser,
    updatePassword: updatePassword,
    removeUser: removeUser,
    userRegisterContactUs: userRegisterContactUs,
    getContactUsDetail: getContactUsDetail
}