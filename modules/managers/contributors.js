'use strict';


let _ = require("lodash"),
       config = process.config.global_config,
       BadRequestError = require('../errors/badRequestError'),
       users = require('../models/user_register'),
       contributtors = require('../models/contributor'),
       admin = require('../models/admin'),
       ObjectId = require('mongoose').Types.ObjectId;


// for adding blogs
let addContributor = async (body) => {

       if (body._id) {
              let findData = { contributor: true }
              if (body.string === 'accept') {
                     // let saveContributor = await contributtors(data).save();
                     let confirmContributor = await contributtors
                            .updateOne({ _id: body._id }, { $set: findData })
                            .exec();

              } else {
                     let confirmContributor = await contributtors
                            .deleteOne({ _id: body._id })
                            .exec();

              }
       } else {
              let data = {

                     userId: body.userId,
                     Name: body.Name,
                     Email: body.Email,
                     instagramLink: body.instagramLink,
                     Message: body.Message,
                     additional: body.additional

              }

              let saveContributor = await contributtors(data).save();
              return saveContributor;
       }
}

let getContributtors = async () => {

       let findAll = await contributtors.aggregate([


              {
                     $lookup: {
                            from: "user_register",
                            let: { user_id: "$userId" },
                            pipeline: [
                                   {
                                          $match: {
                                                 $expr: { $eq: ["$_id", "$$user_id"] }
                                          }
                                   },
                                   { $project: { profileImage: 1, profileImage: 1 } }
                            ],
                            as: "profileImage"
                     }
              },



       ]).exec()

       findAll.forEach(element => {



              element.profileImage.forEach(element => {


                     element.profileImage = config.upload_folder + config.upload_entities.user_image_folder + element.profileImage;


              });
       });


       let find = await users.find()

       return findAll;
}














module.exports = {
       addContributor,
       getContributtors
}