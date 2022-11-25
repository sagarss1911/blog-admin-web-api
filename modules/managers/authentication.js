'use strict';

const { userRegister } = require("../controllers/user_register");

let _ = require("lodash"),
    helpers = require('../helpers/helpers'),
    BadRequestError = require('../errors/badRequestError'),
    AccessDeniedError = require('../errors/accessDeniedError'),
    md5 = require('md5'),
    ejs = require('ejs'),
    fs = require('fs'),
    path = require('path'),
    config = process.config.global_config,
    validator = require('validator'),
    UsersModel = require('../models/admin'),
    UserRegisterModal = require('../models/user_register');


let login = async (body) => {
    let userId;;
    if (!body) {
        throw new BadRequestError('Request body comes empty');
    }

    ['email', 'password'].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });

    if (!validator.isEmail(body.email)) {
        throw new BadRequestError("Email is invalid");
    }
    let admin = await UsersModel
        .findOne({ email: body.email, password: md5(body.password) })
        .select()
        .lean()
        .exec();
    let user = await UserRegisterModal
        .findOne({ email: body.email, password: md5(body.password) })
        .select()
        .lean()
        .exec();
    if (!user && !admin) {
        throw new BadRequestError("Either username or password is invalid");
    }
    let accessToken = md5(Date.now() + body.email);
    if (admin) {
        await UsersModel
            .updateOne({ _id: admin._id }, { $set: { fpToken: accessToken, fpTokenCreatedAt: new Date() } })
            .exec();
        userId = admin._id
    }
    if (user) {
        await UserRegisterModal
            .updateOne({ _id: user._id }, { $set: { fpToken: accessToken, fpTokenCreatedAt: new Date() } })
            .exec();
        userId = user._id
    }
    return {
        userId: userId,
        accessToken: accessToken,
        admin: admin,
        user: user
    };
}


let logOut = async (user) => {
    let upUser = await UsersModel.update({ fpToken: "" }, { where: { id: user.id } });
    return { msg: "logout success" };
}

module.exports = {
    login: login,
    logOut: logOut
};