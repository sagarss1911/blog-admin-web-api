'use strict';


let _ = require("lodash"),
       config = process.config.global_config,
       BadRequestError = require('../errors/badRequestError'),
       blogModel = require('../models/add-blog'),
       favBlogs = require('../models/favBlogs'),
       bookMark = require('../models/bookmark'),
       admin = require('../models/admin'),
       ObjectId = require('mongoose').Types.ObjectId;


// for adding blogs
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
              feature: body.feature

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
// get blog by Id
let getBlogs = async (id) => {

       let findData = { _id: ObjectId(id) };
       let allBlogs = await blogModel
              .aggregate([
                     { $match: findData },

                     {
                            $lookup: {
                                   from: "user_register",
                                   let: { createdBy_id: "$createdBy" },
                                   pipeline: [
                                          {
                                                 $match: {
                                                        $expr: { $eq: ["$_id", "$$createdBy_id"] }
                                                 }
                                          },
                                          { $project: { firstName: 1, lastName: 1, profileImage: 1 } }
                                   ],
                                   as: "createdBy"
                            }
                     }, {
                            $lookup: {
                                   from: "user_register",
                                   let: { imageBy_id: "$imageBy" },
                                   pipeline: [
                                          {
                                                 $match: {
                                                        $expr: { $eq: ["$_id", "$$imageBy_id"] }
                                                 }
                                          },
                                          { $project: { firstName: 1, lastName: 1, profileImage: 1 } }
                                   ],
                                   as: "imageBy"
                            }
                     }, {
                            $lookup: {
                                   from: "user_register",
                                   let: {
                                          wordsBy_id: "$wordsBy"
                                   },
                                   pipeline: [
                                          {
                                                 $match: {
                                                        $expr: { $eq: ["$_id", "$$wordsBy_id"] }
                                                 }
                                          },
                                          { $project: { firstName: 1, lastName: 1, profileImage: 1 } }
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
                     },


              ])
              .exec()
       allBlogs.forEach(element => {
              // mainBlog imge
              element.image = config.upload_folder + config.upload_entities.blogs_images_folder + element.image;

              // blog wordsBy user Image
              element.wordsBy.forEach(element => {
                     element.profileImage = config.upload_folder + config.upload_entities.user_image_folder + element.profileImage;
              });

              // blog bublished user Image
              element.createdBy.forEach(element => {
                     element.profileImage = config.upload_folder + config.upload_entities.user_image_folder + element.profileImage;
              });

              // blog imageBy user Image
              element.imageBy.forEach(element => {
                     element.profileImage = config.upload_folder + config.upload_entities.user_image_folder + element.profileImage;
              });

       });
       return allBlogs[0];
}

// get all blogs
let getAllBlogs = async (body) => {


       let findblog = await favBlogs.find({ userId: ObjectId(body.userId) })









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
                            from: "user_register",
                            let: { createdBy_id: "$createdBy" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $eq: ["$_id", "$$createdBy_id"] }
                                          }
                                   },
                                   { $project: { firstName: 1, lastName: 1 } }
                            ],
                            as: "createdBy"
                     }
              }, {
                     $lookup: {
                            from: "user_register",
                            let: { imageBy_id: "$imageBy" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $eq: ["$_id", "$$imageBy_id"] }
                                          }
                                   },
                                   { $project: { firstName: 1, lastName: 1 } }
                            ],
                            as: "imageBy"
                     }
              }, {
                     $lookup: {
                            from: "user_register",
                            let: {
                                   wordsBy_id: "$wordsBy"
                            },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $eq: ["$_id", "$$wordsBy_id"] }
                                          }
                                   },
                                   { $project: { firstName: 1, lastName: 1 } }
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
              },
              {
                     $lookup: {
                            from: "bookMark",
                            let: {
                                   blog_id: new ObjectId(body.userId)
                            },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $eq: ["$userId", "$$blog_id"] }
                                          }
                                   },
                                   { $project: { blogId: 1, checked: 1, userId: 1 } }
                            ],
                            as: "bookmark"
                     }
              },
              {
                     $lookup: {
                            from: "favBlogs",
                            let: {
                                   blog_id: new ObjectId(body.userId)
                            },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $eq: ["$userId", "$$blog_id"] }
                                          }
                                   },
                                   { $project: { blogId: 1, checked: 1, userId: 1 } }
                            ],
                            as: "favBlog"
                     },

              },



       ]).exec()




       allblogs.forEach(element => {

              element.image = config.upload_folder + config.upload_entities.blogs_images_folder + element.image;


       });


       let allblog = await favBlogs.aggregate([
              // { $match: findData 
              { "$unwind": "$blogId" },
              {
                     "$group": {
                            "_id": "$blogId",
                            "count": { "$sum": 1 }

                     }
              },
              { "$sort": { "count": -1 } },
              { "$limit": 1 },

       ])



       let data = []

       let coutId;
       allblog.forEach(element => {


              coutId = element._id
       })
       let mainBlog = await blogModel.find({ _id: coutId })

       mainBlog.forEach(element => {
              element.image = config.upload_folder + config.upload_entities.blogs_images_folder + element.image;


       });




       let totalRecords = await blogModel.countDocuments(findData);
       let _result = { total_count: 0 };
       _result.slides = allblogs;
       _result.favBlog = findblog;
       _result.mainBlog = mainBlog
       _result.total_count = totalRecords;
       return _result;

}
// 

// delete bloge 
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

// add to fav
let addToFav = async (body) => {


       let Blog;

       let findblog = await favBlogs.findOne({ blogId: ObjectId(body.blogId), userId: ObjectId(body.userId) })



       if (findblog) {
              let Blog = await favBlogs
                     .deleteMany({ blogId: ObjectId(body.blogId), userId: ObjectId(body.userId) })
                     .lean()
                     .exec();


              return Blog, "removed";
       }
       else {
              let blogData = {
                     blogId: body.blogId,
                     userId: body.userId,

              }
              Blog = await favBlogs(blogData).save();

              return Blog, "added";
       }










}
// add to blog
let addBookmark = async (body) => {




       let Blog;

       let findblog = await bookMark.findOne({ blogId: ObjectId(body.blogId), userId: ObjectId(body.userId) })



       if (findblog) {
              let Blog = await bookMark
                     .deleteMany({ blogId: ObjectId(body.blogId), userId: ObjectId(body.userId) })
                     .lean()
                     .exec();

              return Blog, "removed";
       }
       else if (!findblog) {
              let blogData = {
                     blogId: body.blogId,
                     userId: body.userId,

              }
              Blog = await bookMark(blogData).save();
              return Blog, "added";
       }
}


// get all fav
let getFavBlogs = async (id) => {

       let findblog = await favBlogs.find({ userId: ObjectId(id) })

       let blogid = []
       findblog.forEach(element => {
              blogid.push(element.blogId)



       });

       let allblogs = await favBlogs.aggregate([
              // { $match: findData 




              {

                     $lookup: {
                            from: "addBlogs",
                            let: { blog_id: blogid },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $in: ["$_id", "$$blog_id"] }
                                          }
                                          // $expr: { $in: ["$_id", "$$category_id"] }
                                   },
                                   { $project: { _id: 1, title: 1, image: 1, createdAt: 1 } }
                            ],
                            as: "blogId"
                     }
              },


       ]).exec()


       let data = []

       allblogs.forEach(element => {



              element.blogId.forEach(element => {


                     element.image = config.upload_folder + config.upload_entities.blogs_images_folder + element.image;


              });
       });
       let blogerId = []

       let _result = { total_count: 0 };
       _result.slides = allblogs[0];

       return _result;
       // return allblogs;


}
// get all bookmarks
let getbookMarkBlogs = async (id) => {

       let findblog = await bookMark.find({ userId: ObjectId(id) })

       let blogid = []
       findblog.forEach(element => {
              blogid.push(element.blogId)



       });


       let allblogs = await bookMark.aggregate([





              {
                     $lookup: {
                            from: "addBlogs",
                            let: { blog_id: blogid },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $in: ["$_id", "$$blog_id"] }
                                          }
                                   },
                                   { $project: { _id: 1, title: 1, image: 1, createdAt: 1 } }
                            ],
                            as: "blogId"
                     }



              },


       ]).exec()



       allblogs.forEach(element => {


              element.blogId.forEach(element => {
                     element.image = config.upload_folder + config.upload_entities.blogs_images_folder + element.image;


              });
       });
       let blogerId = []

       let _result = { total_count: 0 };
       _result.slider = allblogs[0];

       return _result;



}

// for search
let search = async (body) => {


       let findblog = await favBlogs.find({ userId: ObjectId(body.userId) })



       let findData = {};
       if (body.filters) {
              if (body.filters.searchtext) {
                     findData["$or"] = [
                            { title: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                            { slug: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                            { seoTitle: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                            { seoDescription: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                            { seoKeyword: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                            { highlightCategory: { $regex: new RegExp(body.filters.searchtext, 'ig') } },

                     ]


                     let allblogs = await blogModel.aggregate([
                            { $match: findData },


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
                            },
                            {
                                   $lookup: {
                                          from: "bookMark",
                                          let: {
                                                 blog_id: "$_id"
                                          },
                                          pipeline: [
                                                 {
                                                        $match: {
                                                               $expr: { $eq: ["$blogId", "$$blog_id"] }
                                                        }
                                                 },
                                                 { $project: { blogId: 1, checked: 1, userId: 1 } }
                                          ],
                                          as: "bookmark"
                                   }
                            },
                            {
                                   $lookup: {
                                          from: "favBlogs",
                                          let: {
                                                 blog_id: "$_id"
                                          },
                                          pipeline: [
                                                 {
                                                        $match: {
                                                               $expr: { $eq: ["$blogId", "$$blog_id"] }
                                                        }
                                                 },
                                                 { $project: { blogId: 1, checked: 1, userId: 1 } }
                                          ],
                                          as: "favBlog"
                                   }
                            }



                     ]).exec()


                     allblogs.forEach(element => {

                            element.image = config.upload_folder + config.upload_entities.blogs_images_folder + element.image;


                     });
                     if (allblogs.length > 0) {

                            let totalRecords = await blogModel.countDocuments(findData);
                            let _result = { total_count: 0 };
                            _result.slides = allblogs;
                            _result.favBlog = findblog;
                            _result.total_count = totalRecords;
                            return _result;
                     } else {
                            throw new BadRequestError("Not found");
                     }
              }

              //      
       }



}


module.exports = {
       addBlogs,
       getBlogs,
       getAllBlogs,
       removeBlog,
       addToFav,
       addBookmark,
       getFavBlogs,
       getbookMarkBlogs,
       search



};



