let BadRequestError = require('../errors/badRequestError'),
    adminModel = require('../models/admin'),
    validator = require('validator'),
    mongoose = require("../helpers/asf_mongodb"),
    md5 = require('md5');

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
    let user = await adminModel
        .findOne({ email: body.email, password: md5(body.password) })
        .select()
        .lean()
        .exec();
    if (!user) {
        throw new BadRequestError("Either username or password is invalid");
    }
    await adminModel.updateOne({ _id: user._id }, { "$set": { active: true } })
    let accessToken = md5(Date.now() + body.email);
    await adminModel
        .updateOne({ _id: user._id }, { $set: { fpToken: accessToken, fpTokenCreatedAt: new Date() } })
        .exec();

    return {
        userId: user._id,
        accessToken: accessToken
    };
}

let createUser = async (user, body) => {
    let createdByuser = user._id;
    ['name', 'email', 'password', 'userName'].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });
    let findEmail = await adminModel.findOne({ email: body.email })
    if (findEmail) { throw new BadRequestError("Email Already Exists!") }
    let findUserName = await adminModel.findOne({ userName: body.userName })
    if (findUserName) { throw new BadRequestError("UserName Already Exists!") }
    let newUser = {
        name: body.name,
        email: body.email,
        userName: body.userName,
        password: md5(body.password),
        active: body.active,
        createdBy: createdByuser,
    };
    return await adminModel(newUser).save()
};

let getUsersData = async (admin, body) => {
    if (body._id) {
        let userList = await adminModel.findById({ _id: body._id })
        return userList
    }
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { name: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { userName: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { email: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
            ]
        }
    }

    let userList = await adminModel.aggregate(
        [{ $match: findData },
        { $sort: { createdAt: -1 } },
        { $skip: offset },
        { $limit: limit },
        {
            $lookup: {
                from: "admin",
                let: { createdBy: "$createdBy" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$_id", "$$createdBy"] }
                        }
                    },
                    { $project: { name: 1 } }
                ],
                as: "creator"
            }
        }
        ]
    ).exec()
    let totalRecords = await adminModel.countDocuments(findData);
    let _result = { total_count: 0 };
    _result.adminList = userList;
    _result.total_count = totalRecords;
    return _result;
}


let editUser = async (id, body) => {
    let updateData = {};
    let optionalFiled = ['name', 'email', 'password', 'userName', "active"];
    let isAvailable = await adminModel
        .find({ _id: id })
        .select()
        .lean()
        .exec();
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });
    await adminModel
        .updateOne({ _id: id }, { $set: updateData })
        .exec();
}

let deleteUser = async (id) => {
    return await adminModel
        .deleteOne({ _id: id })
        .lean()
        .exec();
}

module.exports = {
    createUser,
    getUsersData,
    editUser,
    deleteUser,
    login
} 