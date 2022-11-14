let BadRequestError = require('../errors/badRequestError'),
    adminModel = require('../models/admin'),
    validator = require('validator'),
    mongoose = require("../helpers/asf_mongodb"),
    md5 = require('md5');


//ADD ADMIN: adding a new admin with all the required validations i.e email ,username  should be unique for every new admin
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




//fetching the admin list by aggregation on the related fields who id matches with pagination and sorting and if the body has an id fetches and returns the details of that user who's id matches and if the body has filter returns the filtered list.
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


//EDIT FOR ADMIN: updates the details for the user for the given id
let editUser = async (id, body) => {
    let updateData = {
        name: body.name,
        email: body.email,
        password: body.password,
        userName: body.userName,
        active: body.active
    };
    await adminModel
        .updateOne({ _id: id }, { $set: updateData })
        .lean()
        .exec();
}


//DELETE FOR ADMIN:delete the admin for the given id
let deleteUser = async (id) => {
    return await adminModel
        .deleteOne({ _id: id })
        .lean()
        .exec();
}

module.exports = {
    createUser: createUser,
    getUsersData: getUsersData,
    editUser: editUser,
    deleteUser: deleteUser
} 