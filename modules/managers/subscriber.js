'use strict';


let _ = require("lodash"),
    config = process.config.global_config,

    SubscriberModal = require('../models/subscriber'),

    BadRequestError = require('../errors/badRequestError'),

    ObjectId = require('mongoose').Types.ObjectId;


// Add-Update subscriber

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
            throw new BadRequestError('Please select image');
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
        if (req.files.profileImage && req.files.profileImage.length > 0) {
            profileImage = req.files.profileImage[0].filename
            subscriberData.profileImage = profileImage
        }
        if (req.files.coverImage && req.files.coverImage.length > 0) {
            coverImage = req.files.coverImage[0].filename
            subscriberData.coverImage = coverImage
        }

        subscriber = await SubscriberModal
            .updateOne({ _id: body._id }, { $set: subscriberData })
            .exec();
    }
    return subscriber;

}

//Get Subscriber by _id
let getSubscriber = async (id) => {
    let findData = { _id: ObjectId(id) };

    let allSubscriber = await SubscriberModal.aggregate([
        { $match: findData },

    ])
        .exec()

    allSubscriber.forEach(element => {
        element.profileImage = config.upload_folder + config.upload_entities.subscriber_image_folder + element.profileImage;
        element.coverImage = config.upload_folder + config.upload_entities.subscriber_image_folder + element.coverImage;
    });

    return allSubscriber[0];
}


//Get all subscribers list
let getAllSubscriber = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { subscriberName: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { location: { $regex: new RegExp(body.filters.searchtext, 'ig') } },


            ]
        }
    }
    let allSubscriber = await SubscriberModal.find(findData)
        .sort({ createdAt: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()




    allSubscriber.forEach(element => {
        element.profileImage = config.upload_folder + config.upload_entities.subscriber_image_folder + element.profileImage;
        element.coverImage = config.upload_folder + config.upload_entities.subscriber_image_folder + element.coverImage;
    });

    let totalRecords = await SubscriberModal.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.subscriberList = allSubscriber;
    _result.total_count = totalRecords;
    return _result;
}


//Delete subscriber
let removeSubscriber = async (id) => {
    return await SubscriberModal
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}

module.exports = {
    addSubscriber: addSubscriber,
    getSubscriber: getSubscriber,

    getAllSubscriber: getAllSubscriber,
    removeSubscriber: removeSubscriber,
};