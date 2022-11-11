'use strict';


let _ = require("lodash"),
    config = process.config.global_config,
    BadRequestError = require('../errors/badRequestError'),

    CategoryModel = require('../models/category'),

    ObjectId = require('mongoose').Types.ObjectId;


let addCategory = async (body) => {
    console.log(body)
    let categoryData

    if (!body._id) {
        console.log(body._id, 'add');
        categoryData = {
            parentCategoryId: body.parentCategoryId,
            categoryName: body.categoryName,
            seoTitle: body.seoTitle,
            seoDescription: body.seoDescription,
            seoKeyword: body.seoKeyword,

        }

        let CategoryAdded = await CategoryModel(categoryData).save();

    }
    if (body._id) {
        console.log(body._id, 'update');
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

let getAllCategory = async (body) => {
    let limit = body.limit ? body.limit : 10,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        console.log(body)
        if (body.filters.searchtext) {
            findData["$or"] = [
                { categoryName: { $regex: new RegExp(body.filters.searchtext, 'ig') } },

            ]
        }
    }

    let allCategory = await CategoryModel.aggregate(
        [
            { $match: findData },
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
    console.log(allCategory)


    let totalRecords = await CategoryModel.countDocuments(findData);
    console.log(totalRecords)
    let _result = { total_count: 0 };
    _result.slides = allCategory;
    _result.total_count = totalRecords;
    return _result;
}




let getCategory = async (req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    let findData = { _id: ObjectId(body._id) };
    let allCategory = await CategoryModel.find(findData).select()
        .lean()
        .exec()
    console.log(allCategory, "data");
    return allCategory;
}


let deleteCategory = async (_id) => {
    console.log(_id)
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
    getAllCategory,
    deleteCategory,
    addCategory,
    getCategory,

};