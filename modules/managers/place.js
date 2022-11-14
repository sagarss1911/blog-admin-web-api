'use strict';
let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    PlaceModal = require('../models/place'),
    ObjectId = require('mongoose').Types.ObjectId;


//ADD-UPDATE ADMIN :If the body contains id it updates the place else adds a new place
let addPlace = async (req) => {
    let image,
        mapImage,
        placeData,
        Place;
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    if (!body.placeName || !body.seoTitle || !body.seoDescription || !body.seoKeyword) {
        throw new BadRequestError('please fill all the details');
    }
    if (!body._id) {
        if (!req.files.image || !req.files.image.length > 0 || !req.files.mapImage || !req.files.mapImage.length > 0) {
            throw new BadRequestError('please choose image for both place and Map image');
        }
        image = req.files.image[0].filename
        mapImage = req.files.mapImage[0].filename
        placeData = {
            placeName: body.placeName,
            seoTitle: body.seoTitle,
            seoDescription: body.seoDescription,
            seoKeyword: body.seoKeyword,
            active: body.active,
            image: image,
            mapImage: mapImage
        }
        Place = await PlaceModal(placeData).save();
    }
    if (body._id) {
        placeData = {
            placeName: body.placeName,
            seoTitle: body.seoTitle,
            seoDescription: body.seoDescription,
            seoKeyword: body.seoKeyword,
            active: body.active,
            updatedAt: Date.now()
        }
        if (req.files.image && req.files.image.length > 0) {
            image = req.files.image[0].filename
            placeData.image = image
        }
        if (req.files.mapImage && req.files.mapImage.length > 0) {
            mapImage = req.files.mapImage[0].filename
            placeData.mapImage = mapImage
        }
        Place = await PlaceModal
            .updateOne({ _id: body._id }, { $set: placeData })
            .exec();
    }
    return Place;
}


//GET PLACE: fetches the list of places with limit and offset and if the body has filter returns the filtered list. 
let getAllPlace = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { placeName: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { seoTitle: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { seoDescription: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { seoKeyword: { $regex: new RegExp(body.filters.searchtext, 'ig') } }
            ]
        }
    }
    let allPlaces = await PlaceModal
        .find(findData)
        .sort({ createdAt: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()

    allPlaces.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.place_image_folder + element.image;
        element.mapImage = config.upload_folder + config.upload_entities.place_image_folder + element.mapImage;
    });
    let totalRecords = await PlaceModal.countDocuments(findData);
    let _result = { total_count: 0 };
    _result.places = allPlaces;
    _result.total_count = totalRecords;
    return _result;
}


//GET A SINGLE PLACE: fetches the details of the place for the id given
let getPlace = async (id) => {
    let findData = { _id: ObjectId(id) };
    let allPlace = await PlaceModal.aggregate([
        { $match: findData }
    ]).exec()

    allPlace.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.place_image_folder + element.image;
        element.mapImage = config.upload_folder + config.upload_entities.place_image_folder + element.mapImage;
    });
    return allPlace[0];
}


//DELETE A PLACE:Deletes the place for the id given 
let removePlace = async (place_id) => {
    return await PlaceModal
        .deleteOne({ _id: place_id })
        .lean()
        .exec();
}


module.exports = {
    getAllPlace: getAllPlace,
    removePlace: removePlace,
    addPlace: addPlace,
    getPlace: getPlace,
};