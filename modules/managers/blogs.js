'use strict';


let _ = require("lodash"),
       config = process.config.global_config,
       BadRequestError = require('../errors/badRequestError'),
       blogModel = require('../models/add-blog'),
       ObjectId = require('mongoose').Types.ObjectId;

let addBlogs = async (req) => {

       let image;
       let Blog;
       let body = req.body.body ? JSON.parse(req.body.body) : req.body;

       let isAvailable = await blogModel
              .findOne({ slug: body.slug })
              .select()
              .lean()
              .exec();
       if (isAvailable && isAvailable._id != body._id) {
              throw new BadRequestError("Slug Aready Exist");
       }
       let blogData = {
              title: body.title,
              slug: body.slug,
              smallDiscription: body.smallDiscription,
              fullDiscription: body.fullDiscription,
              seoTitle: body.seoTitle,
              seoDescription: body.seoDescription,
              seoKeyword: body.seoKeyword,
              categoryIds: Array.isArray(body.categoryIds) ? body.categoryIds : [],
              highlightCategory: body.highlight,
              createdBy: body.createdBy,
              imageBy: body.imageBy,
              wordsBy: body.wordsBy,

       }
       if (!body._id) {
              if (!req.files.image || !req.files.image.length > 0) {
                     throw new BadRequestError('please choose image ');
              }
              blogData.image = req.files.image[0].filename

              Blog = await blogModel(blogData).save();
       }
       if (body._id) {

              if (req.files.image && req.files.image.length > 0) {
                     blogData.image = req.files.image[0].filename

              }
              Blog = await blogModel
                     .updateOne({ _id: body._id }, { $set: blogData })
                     .exec();

       }
       return Blog;
}

let getBlogs = async (id) => {

       let findData = { _id: ObjectId(id) };
       let allBlogs = await blogModel
              .aggregate([
                     { $match: findData }
              ])
              .exec()
       allBlogs.forEach(element => {
              element.image = config.upload_folder + config.upload_entities.blogs_images_folder + element.image;
       });
       return allBlogs[0];
}

let getAllBlogs = async (body) => {
       let limit = body.limit ? body.limit : 2,
              offset = body.page ? ((body.page - 1) * limit) : 0,
              findData = {};
       if (body.filters) {
              if (body.filters.searchtext) {
                     findData["$or"] = [
                            { title: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                            { slug: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                            { seoTitle: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                            { seoDescription: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                            { seoKeyword: { $regex: new RegExp(body.filters.searchtext, 'ig') } }
                     ]
              }
       }
       let allblogs = await blogModel.aggregate([
              { $match: findData },
              { $skip: offset },
              { $limit: limit },
              {
                     $lookup: {
                            from: "subscriber",
                            let: { createdBy_id: "$createdBy" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $eq: ["$_id", "$$createdBy_id"] }
                                          }
                                   },
                                   { $project: { subscriberName: 1 } }
                            ],
                            as: "createdBy"
                     }
              }, {
                     $lookup: {
                            from: "subscriber",
                            let: { imageBy_id: "$imageBy" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $eq: ["$_id", "$$imageBy_id"] }
                                          }
                                   },
                                   { $project: { subscriberName: 1 } }
                            ],
                            as: "imageBy"
                     }
              }, {
                     $lookup: {
                            from: "subscriber",
                            let: {
                                   wordsBy_id: "$wordsBy"
                            },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $eq: ["$_id", "$$wordsBy_id"] }
                                          }
                                   },
                                   { $project: { subscriberName: 1 } }
                            ],
                            as: "wordsBy"
                     }
              },
              {
                     $lookup: {
                            from: "category",
                            let: {
                                   category_id: "$categoryIds"
                            },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $in: ["$_id", "$$category_id"] }
                                          }
                                   },
                                   { $project: { categoryName: 1 } }
                            ],
                            as: "categoryIds"
                     }
              }
       ]).exec()


       allblogs.forEach(element => {
              element.image = config.upload_folder + config.upload_entities.blogs_images_folder + element.image;
       });

       let totalRecords = await blogModel.countDocuments(findData);
       let _result = { total_count: 0 };
       _result.slides = allblogs;
       _result.total_count = totalRecords;
       return _result;

}
// 

let removeBlog = async (id) => {


       await blogModel
              .deleteMany({ productid: ObjectId(id) })
              .lean()
              .exec();
       return await blogModel
              .deleteOne({ _id: ObjectId(id) })
              .lean()
              .exec();
}




module.exports = {
       addBlogs,
       getBlogs,
       getAllBlogs,
       removeBlog,




};