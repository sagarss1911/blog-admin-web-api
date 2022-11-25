'use strict';
let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    ChangeIconModal = require('../models/change_icon'),
    ObjectId = require('mongoose').Types.ObjectId;

let addIcon = async (req) => {
    let image,
        logoImage,
        iconData,
        Icon;
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;

    let checklogo = await ChangeIconModal.find()

    // if (checklogo != '') {
    //     throw new BadRequestError("Cant have multiple logos")

    // }

    if (!body._id) {
        let findEmail = await ChangeIconModal.findOne()
        if (findEmail) { throw new BadRequestError("Email Already Exists!") }
        if (!req.files.image || !req.files.image.length > 0 || !req.files.logoImage || !req.files.logoImage.length > 0) {
            throw new BadRequestError('please choose image for both place and logo image');
        }
        image = req.files.image[0].filename
        logoImage = req.files.logoImage[0].filename
        iconData = {
            image: image,
            logoImage: logoImage
        }

        Icon = await ChangeIconModal(iconData).save();
    }
    if (body._id) {

        iconData = {

            updatedAt: Date.now()
        }
        if (req.files.image && req.files.image.length > 0) {
            image = req.files.image[0].filename
            iconData.image = image
        }
        if (req.files.logoImage && req.files.logoImage.length > 0) {
            logoImage = req.files.logoImage[0].filename
            iconData.logoImage = logoImage
        }
        Icon = await ChangeIconModal
            .updateOne({ _id: body._id }, { $set: iconData })
            .exec();
    }
    return Icon;
}



//Get all icon list
let getAllIcons = async (body) => {

    let findData = {};
    let allImages = await ChangeIconModal.find(findData)
        .exec()
    allImages.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.icon_image_folder + element.image;
        element.logoImage = config.upload_folder + config.upload_entities.icon_image_folder + element.logoImage;

    });

    let totalRecords = await ChangeIconModal.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.subscriberList = allImages;
    _result.total_count = totalRecords;
    return _result;
}


let getIcon = async () => {
    let allImages = await ChangeIconModal.find().exec()

    allImages.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.icon_image_folder + element.image;
        element.logoImage = config.upload_folder + config.upload_entities.icon_image_folder + element.logoImage;
    });

    return allImages[0];
}


let getIconById = async (id) => {
    let findData = { _id: ObjectId(id) };

    let allImages = await ChangeIconModal.aggregate([
        { $match: findData },

    ])
        .exec()

    allImages.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.icon_image_folder + element.image;
        element.logoImage = config.upload_folder + config.upload_entities.icon_image_folder + element.logoImage;
    });

    return allImages[0];
}
module.exports = {
    getAllIcons: getAllIcons,
    // removePlace: removePlace,
    addIcon: addIcon,
    getIcon: getIcon,
    getIconById: getIconById
}