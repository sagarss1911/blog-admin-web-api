'use strict';


let _ = require("lodash"),
    config = process.config.global_config,
    BadRequestError = require('../errors/badRequestError'),

    CategoryModel = require('../models/category'),

    ObjectId = require('mongoose').Types.ObjectId;

//Add-Update Category in single API
let addCategory = async (body) => {

    let categoryData

    if (!body._id) {

        categoryData = {
            parentCategoryId: body.parentCategoryId,
            categoryName: body.categoryName,
            seoTitle: body.seoTitle,
            seoDescription: body.seoDescription,
            seoKeyword: body.seoKeyword,

        }

        return await CategoryModel(categoryData).save();

    }
    if (body._id) {

        let categoryDataUpdate = {
            parentCategoryId: body.parentCategoryId,
            categoryName: body.categoryName,
            seoTitle: body.seoTitle,
            seoDescription: body.seoDescription,
            seoKeyword: body.seoKeyword,
        }
        categoryData = await CategoryModel
            .updateOne({ _id: body._id }, { $set: categoryDataUpdate })
            .exec();
    }
    return categoryData;
}



//Get all categories list
let getAllCategory = async (body) => {
    let limit = body.limit ? body.limit : 10,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {

        if (body.filters.searchtext) {
            findData["$or"] = [
                { categoryName: { $regex: new RegExp(body.filters.searchtext, 'ig') } },

            ]
        }
    }

    let allCategory = await CategoryModel.aggregate(
        [
            { $match: findData },
            { $sort: { createdAt: -1 } },
            { $skip: offset },
            { $limit: limit },
            {
                $lookup: {
                    from: "category",
                    let: { parentCategoryId: "$parentCategoryId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$parentCategoryId"] }
                            }
                        },
                        { $project: { categoryName: 1 } }

                    ],

                    as: "parentCategory"
                }

            },
        ])
        .exec()



    let totalRecords = await CategoryModel.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.categoryList = allCategory;
    _result.total_count = totalRecords;
    return _result;
}



//Get a single category by _id
let getCategory = async (req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    let findData = { _id: ObjectId(body._id) };
    let allCategory = await CategoryModel.aggregate(
        [
            { $match: findData },

            {
                $lookup: {
                    from: "category",
                    let: { parentCategoryId: "$parentCategoryId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$parentCategoryId"] }
                            }
                        },
                        { $project: { categoryName: 1 } }

                    ],

                    as: "parentCategory"
                }

            },
        ])
        .exec()


    return allCategory;
}

//Delete category
let deleteCategory = async (_id) => {

    await CategoryModel
        .deleteMany({ _id: ObjectId(_id) })
        .lean()
        .exec();
    return await CategoryModel
        .deleteOne({ _id: ObjectId(_id) })
        .lean()
        .exec();
}


module.exports = {
    getAllCategory: getAllCategory,
    deleteCategory: deleteCategory,
    addCategory: addCategory,
    getCategory: getCategory,

};