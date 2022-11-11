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


let getBlogs = async (body) => {
       let findData = { _id: ObjectId(body._id) };
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
       let allblogs = await blogModel.find(findData)
              .sort({ createdAt: -1 })
              .collation({ 'locale': 'en' })
              .skip(offset)
              .limit(limit)
              .select()
              .lean()
              .exec()


       allblogs.forEach(element => {
              element.image = config.upload_folder + config.upload_entities.blogs_images_folder + element.image;
       });

       let totalRecords = await blogModel.countDocuments(findData);
       let _result = { total_count: 0 };
       _result.slides = allblogs;
       _result.total_count = totalRecords;
       console.log(_result)
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
// yess mine
let getAllProductForWebsite = async (body) => {
       let limit = body.limit ? body.limit : 9,
              offset = body.page ? ((body.page - 1) * limit) : 0
       let _result = { total_count: 0 };
       let isAvailable = await ProductCategoryModel
              .findOne({ slug: body.slug })
              .select()
              .lean()
              .exec();
       if (!isAvailable) {
              throw new BadRequestError("Slug not exist");
       }

       let findData = { category: { $in: [ObjectId(isAvailable._id)] } };
       let colorfilter = {}

       let thicknessfilter = {}
       let wearfilter = {}
       let sizesfilter = {}
       if (body.filters) {
              if (body.filters.collection != "all") {
                     findData['collections'] = { $in: [ObjectId(body.filters.collection)] };
              }
              if (body.filters.floor != "all") {
                     findData['category'] = { $in: [ObjectId(body.filters.floor)] };
              }
              if (body.filters.color != "all") {
                     colorfilter = { $in: [body.filters.color, "$selectedcolor"] }
              }
              if (body.filters.thickness != "all") {
                     thicknessfilter = { $in: [body.filters.thickness, "$selectedthickness"] }
              }
              if (body.filters.wear != "all") {
                     wearfilter = { $in: [body.filters.wear, "$selectedwearlayer"] }
              }
              if (body.filters.sizes != "all") {
                     sizesfilter = { $in: [body.filters.sizes, "$selectedsize"] }
              }
       }
       let allProduct = await blogModel.aggregate([
              { $match: findData },
              { $skip: offset },
              { $limit: limit },
              {
                     $lookup: {
                            from: "product_category",
                            let: { category_ids: "$category" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $in: ["$_id", "$$category_ids"] }
                                          }
                                   },
                                   { $project: { _id: 0, name: 1, slug: 1 } }
                            ],
                            as: "category"
                     }
              }, {
                     $lookup: {
                            from: "collection",
                            let: { collection_ids: "$collections" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $in: ["$_id", "$$collection_ids"] }
                                          }
                                   },
                                   { $project: { _id: 1, name: 1 } }
                            ],
                            as: "collections"
                     }
              }
              , {
                     $lookup: {
                            from: "product_option",
                            let: { master_product_id: "$_id" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: {
                                                        $and: [
                                                               { $eq: ["$productid", "$$master_product_id"] },
                                                               colorfilter, thicknessfilter, wearfilter, sizesfilter
                                                        ]
                                                 }
                                          }

                                   },
                            ],
                            as: "products"
                     }
              }
       ]).exec()

       allProduct = allProduct.filter(ra => ra.products.length > 0);
       allProduct = allProduct.slice(offset, offset + limit);

       let allProductCount = await blogModel.aggregate([
              { $match: findData },
              {
                     $lookup: {
                            from: "product_category",
                            let: { category_ids: "$category" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $in: ["$_id", "$$category_ids"] }
                                          }
                                   },
                                   { $project: { _id: 0, name: 1, slug: 1 } }
                            ],
                            as: "category"
                     }
              }, {
                     $lookup: {
                            from: "collection",
                            let: { collection_ids: "$collections" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $in: ["$_id", "$$collection_ids"] }
                                          }
                                   },
                                   { $project: { _id: 1, name: 1 } }
                            ],
                            as: "collections"
                     }
              }
              , {
                     $lookup: {
                            from: "product_option",
                            let: { master_product_id: "$_id" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $eq: ["$productid", "$$master_product_id"] }
                                          }
                                   },
                            ],
                            as: "products"
                     }
              }
       ]).exec()
       allProductCount = allProductCount.filter(ra => ra.products.length > 0);

       allProduct.forEach(element => {
              element.image = config.upload_folder + config.upload_entities.product_image_folder + element.image;
              element.products.forEach(element1 => {
                     element1.image = config.upload_folder + config.upload_entities.product_option_image_folder + element1.image;
              });
       });





       _result = { total_count: 0 };
       _result.slides = allProduct;
       _result.colections = isAvailable.selectedCollection;
       _result.total_count = allProductCount.length;
       let allCollections = [];

       allProductCount.forEach(element1 => {
              element1.collections.forEach(collection => {
                     allCollections.push({ _id: collection._id.toString(), name: collection.name.toString() });
              });
       });
       let colors = [];

       let thickness = [];
       let lengths = [];
       allProductCount.forEach(element1 => {
              element1.products.forEach(pr => {
                     pr.selectedcolor.forEach(color => {
                            colors.push(color.toString());
                     });
                     pr.selectedlength.forEach(ln => {
                            lengths.push(ln.toString());
                     });
                     pr.selectedthickness.forEach(th => {
                            thickness.push(th.toString());
                     });
              });
       });
       colors = _.uniqBy(colors);
       thickness = _.uniqBy(thickness);
       lengths = _.uniqBy(lengths);

       allCollections = _.uniqBy(allCollections, '_id');
       _result.filtercollections = allCollections;
       _result.filtercolor = colors;
       _result.filterlength = lengths;
       _result.filterthickness = thickness;
       return _result;
}

let getAllSubProductForWebsite = async (body) => {

       let getAllProductOptions = await ProductOptionsModal
              .findOne({ slug: body.slug })
              .sort({ created_at: -1 })
              .collation({ 'locale': 'en' })
              .select()
              .lean()
              .exec();
       if (!getAllProductOptions) {
              throw new BadRequestError("Not Found");
       }
       let getSimilarProduct = await ProductOptionsModal
              .find({ productid: ObjectId(getAllProductOptions.productid), slug: { $ne: getAllProductOptions.slug } })
              .select()
              .lean()
              .exec()
       let images = [];
       for (var x in getAllProductOptions.option_images) {
              images.push({ image: config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + getAllProductOptions.option_images[x] })
       }
       getSimilarProduct.forEach(element => {
              element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + element.image;
       });
       delete getAllProductOptions.option_images
       getAllProductOptions.option_images = images;
       return { getAllProductOptions, getSimilarProduct };
}






module.exports = {
       addBlogs,
       getBlogs,
       getAllBlogs,
       removeBlog,
       //Website
       getAllProductForWebsite,
       getAllSubProductForWebsite,
       // getAllSearchedProduct,


};