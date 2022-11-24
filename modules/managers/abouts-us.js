'use strict';
let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    AboutUsModal = require('../models/abouts-us'),
    AboutUsCardModal = require('../models/about-us-cards'),
    ObjectId = require('mongoose').Types.ObjectId;

//ADD-UPDATE ABOUT US :If the body contains id it updates the place else adds a new place
let addAboutUs = async (req) => {
    let image,
        aboutUsData,
        AboutUs;
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    ['mission', 'aim', 'firstTitle', 'firstDescription', 'contributorPara1', 'contributorPara2', 'secondTitle', 'firstColumn', 'secondColumn'].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });
    if (!body._id) {
        let findAboutUs = await AboutUsModal.findOne({})
        if (findAboutUs) { throw new BadRequestError(" About-Us Already Exists! Delete the old entry for new entry") }
        if (!req.files.image || !req.files.image.length > 0) {
            throw new BadRequestError('please choose image');
        }
        image = req.files.image[0].filename
        aboutUsData = {
            mission: body.mission,
            aim: body.aim,
            firstTitle: body.firstTitle,
            firstDescription: body.firstDescription,
            contributorPara1: body.contributorPara1,
            contributorPara2: body.contributorPara2,
            secondTitle: body.secondTitle,
            firstColumn: body.firstColumn,
            secondColumn: body.secondColumn,
            image: image,
        }
        AboutUs = await AboutUsModal(aboutUsData).save();
    }
    if (body._id) {
        aboutUsData = {
            mission: body.mission,
            aim: body.aim,
            firstTitle: body.firstTitle,
            firstDescription: body.firstDescription,
            contributorPara1: body.contributorPara1,
            contributorPara2: body.contributorPara2,
            secondTitle: body.secondTitle,
            firstColumn: body.firstColumn,
            secondColumn: body.secondColumn,
            updatedAt: Date.now()
        }
        if (req.files.image && req.files.image.length > 0) {
            image = req.files.image[0].filename
            aboutUsData.image = image
        }

        AboutUs = await AboutUsModal
            .updateOne({ _id: body._id }, { $set: aboutUsData })
            .exec();
    }
    return AboutUs;
}

//GET ABOUTUS: fetches the  ABOUST US page
let getAboutUsDetails = async (body) => {
    let aboutUs = await AboutUsModal
        .find({})
        .lean()
        .exec()

    aboutUs.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.aboutUs_image_folder + element.image;
    });
    return aboutUs;
}


//GET : fetches the details of the aboutus page
let getAboutUs = async () => {
    let aboutUs = await AboutUsModal.find({});
    aboutUs.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.aboutUs_image_folder + element.image;
    });
    return aboutUs[0];
}

//DELETE:Deletes the about us for the id given 
let deleteAboutUs = async (aboutUs_id) => {
    return await AboutUsModal
        .deleteOne({ _id: aboutUs_id })
        .lean()
        .exec();
}

//CARDS API
//ADD-UPDATE CARDS :If the body contains id it updates the card else adds a new card.

let addAboutUsCards = async (body) => {
    let aboutUsData,
        AboutUs;
    if (!body.cardDescription) {
        throw new BadRequestError(" card Description is required");
    }
    if (!body._id) {
        aboutUsData = {
            cardDescription: body.cardDescription,
        }
        AboutUs = await AboutUsCardModal(aboutUsData).save();
    }
    if (body._id) {
        aboutUsData = {
            cardDescription: body.cardDescription,
            updatedAt: Date.now()
        }
        AboutUs = await AboutUsCardModal
            .updateOne({ _id: body._id }, { $set: aboutUsData })
            .exec();
    }
    return AboutUs;
}


//GET card: fetches the list of cards with limit and offset and if the body has filter returns the filtered list. 
let getAboutUsCardsDetails = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { cardDescription: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
            ]
        }
    }
    let allCards = await AboutUsCardModal
        .find(findData)
        .sort({ createdAt: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()
    let totalRecords = await AboutUsCardModal.countDocuments(findData);
    let aboutUs = { total_count: 0 };
    aboutUs.cards = allCards;
    aboutUs.total_count = totalRecords;
    return aboutUs
}


//get card: fetches the details of the card for the id given
let getAboutUsCard = async (aboutUs_id) => {
    let findData = { _id: ObjectId(aboutUs_id) };
    let aboutUs = await AboutUsCardModal.aggregate([
        { $match: findData }
    ]).exec()
    return aboutUs[0];
}


//DELETE A CARD:Deletes the card for the id given 
let deleteAboutUsCard = async (aboutUs_id) => {
    return await AboutUsCardModal
        .deleteOne({ _id: aboutUs_id })
        .lean()
        .exec();
}
module.exports = {
    addAboutUs: addAboutUs,
    getAboutUs: getAboutUs,
    getAboutUsDetails: getAboutUsDetails,
    deleteAboutUs: deleteAboutUs,
    // cards api
    addAboutUsCards: addAboutUsCards,
    deleteAboutUsCard: deleteAboutUsCard,
    getAboutUsCard: getAboutUsCard,
    getAboutUsCardsDetails: getAboutUsCardsDetails,

};