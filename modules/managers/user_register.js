'use strict';


let _ = require("lodash"),
    config = process.config.global_config,
    nodemailer = require("nodemailer"),

    contactUsModal = require('../models/contactus'),

    envr = require('dotenv').config(),

    UserRegisterModal = require('../models/user_register'),

    UsersModal = require('../models/admin'),

    BadRequestError = require('../errors/badRequestError'),

    ObjectId = require('mongoose').Types.ObjectId,

    md5 = require('md5');




let userRegister = async (body) => {
    ['email', 'password', 'userName'].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });
    let findEmail = await UserRegisterModal.findOne({ email: body.email })
    if (findEmail) { throw new BadRequestError("Email Already Exists!") }
    let findUserName = await UserRegisterModal.findOne({ userName: body.userName })
    if (findUserName) { throw new BadRequestError("UserName Already Exists!") }
    let newUser = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        userName: body.userName,
        password: md5(body.password),
    };
    return await UserRegisterModal(newUser).save()

}



let updateUser = async (req) => {
    let profileImage;
    let coverImage;
    let updateData;
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;

    updateData = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        userName: body.userName,
        location: body.location,
        shortBio: body.shortBio,
        maptiaWeekly: body.maptiaWeekly,
        yourStories: body.yourStories,
        maptiaUpdates: body.maptiaUpdates,
    }
    if (req.files.profileImage && req.files.profileImage.length > 0) {
        profileImage = req.files.profileImage[0].filename
        updateData.profileImage = profileImage
    }
    if (req.files.coverImage && req.files.coverImage.length > 0) {
        coverImage = req.files.coverImage[0].filename
        updateData.coverImage = coverImage
    }
    updateData = await UserRegisterModal.updateOne({ fpToken: body.token }, { $set: updateData })

        .exec();
    return updateData[0];

}

let getUser = async (user) => {
    let findData = { _id: user._id };
    // let allUsers = await UsersModal.find(findData).exec()
    let allUsers = await UserRegisterModal.find(findData).exec();

    allUsers.forEach(element => {
        element.profileImage = config.upload_folder + config.upload_entities.user_image_folder + element.profileImage;
        element.coverImage = config.upload_folder + config.upload_entities.user_image_folder + element.coverImage;
    });
    let totalRecords = await UserRegisterModal.countDocuments(findData);
    let _result = { total_count: 0 };
    _result.userList = allUsers;
    _result.total_count = totalRecords;
    return _result;

}

let getAllUser = async (body) => {

    let findData = {};
    let allUsers = await UserRegisterModal.find(findData)
        .exec()
    allUsers.forEach(element => {
        element.profileImage = config.upload_folder + config.upload_entities.user_image_folder + element.profileImage;
        element.coverImage = config.upload_folder + config.upload_entities.user_image_folder + element.coverImage;;

    });
    let totalRecords = await UserRegisterModal.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.userList = allUsers;
    _result.total_count = totalRecords;
    return _result;
}



let updatePassword = async (body) => {
    let findData = await UserRegisterModal.find({ email: body.email, password: body.oldPassword })
    let updateData;
    if (findData) {

        updateData = {

            password: md5(body.newPassword)
        }
    } else {
        throw new BadRequestError("Wrong password");
    }
    let updateData1 = await UserRegisterModal.updateOne({ _id: body.id }, { $set: updateData })

        .exec();
    return updateData[0];

}

//Delete User
let removeUser = async (user_id) => {
    return await UserRegisterModal
        .deleteOne({ _id: ObjectId(user_id) })
        .lean()
        .exec();
}

// user-contactus
let userRegisterContactUs = async (body) => {
    let email = process.env.userEmail;
    let pass = process.env.userPass;
    let admin = process.env.RecieverEmail;

    ['email', 'firstName'].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });
    let newUser = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,

    };
    let newContactUs = await contactUsModal(newUser).save();
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass: pass
        },
        tls: {
            rejectUnauthorized: false,
        }
    })
    let mailOption = {
        from: email,
        to: admin,
        subject: "Contact Us request",
        text: "hello you have got a new request"
    }
    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("email sent successfully" + info.response);
        }
    })
    return newContactUs;
}

let getContactUsDetail = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { firstName: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { lastName: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { email: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
            ]
        }
    }
    let allContactUsUser = await contactUsModal
        .find(findData)
        .sort({ createdAt: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()
    let totalRecords = await contactUsModal.countDocuments(findData);
    let _result = { total_count: 0 };
    _result.users = allContactUsUser;
    _result.total_count = totalRecords;
    return _result;
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