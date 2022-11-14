'use strict';

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
    UsersModel = require('../models/admin');

let login = async (body) => {
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
    let user = await UsersModel
        .findOne({ email: body.email, password: md5(body.password) })
        .select()
        .lean()
        .exec();
    if (!user) {
        throw new BadRequestError("Either username or password is invalid");
    }
    let accessToken = md5(Date.now() + body.email);
    await UsersModel
        .updateOne({ _id: user._id }, { $set: { fpToken: accessToken, fpTokenCreatedAt: new Date() } })
        .exec();

    return {
        userId: user._id,
        accessToken: accessToken
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