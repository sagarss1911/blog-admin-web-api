'use strict';


let _ = require("lodash"),
    config = process.config.global_config,

    SubscriberModal = require('../models/subscriber'),

    BadRequestError = require('../errors/badRequestError'),
    ProductModel = require('../models/product'),
    ProductCategoryModel = require('../models/product_category'),
    ProductOptionsModal = require('../models/product_options'),
    ObjectId = require('mongoose').Types.ObjectId;




let addSubscriber = async (req) => {
    let profileImage;
    let coverImage;
    let subscriberData;
    let subscriber;
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    if (!body.subscriberName || !body.password || !body.website) {
        throw new BadRequestError('please fill all the details');
    }

    if (!body._id) {
        if (!req.files.profileImage || !req.files.profileImage.length > 0 || !req.files.coverImage || !req.files.coverImage.length > 0) {
            throw new BadRequestError('Please select profile image');
        }
        profileImage = req.files.profileImage[0].filename
        coverImage = req.files.coverImage[0].filename
        subscriberData = {
            subscriberName: body.subscriberName,
            password: body.password,
            shortDescription: body.shortDescription,
            location: body.location,
            website: body.website,
            facebookLink: body.facebookLink,
            twitterLink: body.twitterLink,
            profileImage: profileImage,
            coverImage: coverImage
        }
        subscriber = await SubscriberModal(subscriberData).save();
        return subscriber
    }

    if (body._id) {
        if (req.files.profileImage && req.files.profileImage.length > 0) {
            profileImage = req.files.profileImage[0].filename

            subscriberData = {
                subscriberName: body.subscriberName,
                password: body.password,
                shortDescription: body.shortDescription,
                location: body.location,
                website: body.website,
                facebookLink: body.facebookLink,
                twitterLink: body.twitterLink,
                profileImage: profileImage,
                updatedAt: Date.now()
            }

        } else if (req.files.coverImage && req.files.coverImage.length > 0) {
            coverImage = req.files.coverImage[0].filename

            subscriberData = {
                subscriberName: body.subscriberName,
                password: body.password,
                shortDescription: body.shortDescription,
                location: body.location,
                website: body.website,
                facebookLink: body.facebookLink,
                twitterLink: body.twitterLink,
                coverImage: coverImage,
                updatedAt: Date.now()
            }
        }
        else if (!req.files.profileImage || !req.files.profileImage.length > 0 || !req.files.coverImage || !req.files.coverImage.length > 0) {
            subscriberData = {
                subscriberName: body.subscriberName,
                password: body.password,
                shortDescription: body.shortDescription,
                location: body.location,
                website: body.website,
                facebookLink: body.facebookLink,
                twitterLink: body.twitterLink,
                updatedAt: Date.now()
            }
        }

        subscriber = await SubscriberModal
            .updateOne({ _id: body._id }, { $set: subscriberData })
            .exec();
        return subscriber;
    }
    return subscriber;
}




let getSubscriber = async (body) => {
    let findData = { _id: ObjectId(body._id) };

    let allProduct = await SubscriberModal.aggregate([
        { $match: findData },
        {
            $lookup: {
                from: "product_option",
                let: { product_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$productid", "$$product_id"] }
                        }
                    },
                    { $project: { name: 1, selectedcolor: 1, selectedthickness: 1, selectedlength: 1, selectedmaterial: 1, image: 1 } }
                ],
                as: "colors"
            }
        }
    ])
        .exec()

    allProduct.forEach(element => {
        element.profileImage = config.upload_folder + config.upload_entities.subscriber_image_folder + element.profileImage;
        element.coverImage = config.upload_folder + config.upload_entities.subscriber_image_folder + element.coverImage;
    });

    let option_images = []

    if (allProduct[0].option_images && allProduct[0].option_images.length > 0) {
        allProduct[0].option_images.forEach(element => {
            option_images.push({ image: config.upload_folder + config.upload_entities.subscriber_image_folder + element, baseimage: element })
        });
    }
    allProduct[0].option_images = option_images;
    allProduct[0].colors.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.subscriber_image_folder + element.image;

    });


    return allProduct[0];
}




let getAllSubscriber = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { subscriberName: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { location: { $regex: new RegExp(body.filters.searchtext, 'ig') } },

                // {slug: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
            ]
        }
    }
    let allProduct = await SubscriberModal.aggregate([
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
                    { $project: { _id: 0, name: 1 } }
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
                    { $project: { _id: 0, name: 1 } }
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
    ])
        .exec()

    allProduct.forEach(element => {
        element.profileImage = config.upload_folder + config.upload_entities.subscriber_image_folder + element.profileImage;
        element.coverImage = config.upload_folder + config.upload_entities.subscriber_image_folder + element.coverImage;
    });

    let totalRecords = await SubscriberModal.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.slides = allProduct;
    _result.total_count = totalRecords;
    return _result;
}



let removeSubscriber = async (id) => {


    // await ProductOptionsModal
    //     .deleteMany({ productid: ObjectId(id) })
    //     .lean()
    //     .exec();
    return await SubscriberModal
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}

module.exports = {
    addSubscriber,
    getSubscriber,

    getAllSubscriber,
    removeSubscriber,
};