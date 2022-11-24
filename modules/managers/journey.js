'use strict';
let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    JourneyIconModal = require('../models/journey-icon'),
    JourneyCardModal = require('../models/journey-cards'),
    ObjectId = require('mongoose').Types.ObjectId;


//ADD-UPDATE ADMIN :If the body contains id it updates the place else adds a new place
let addJourneyIcon = async (req) => {
    let image,
        JourneyIconData,
        JourneyIcon;
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    if (!body.journeyText || !body.journeyTag) {
        throw new BadRequestError('please fill all the details');
    }
    if (!body._id) {
        if (!req.files.image || !req.files.image.length > 0) {
            throw new BadRequestError('please choose image for JourneyIcon ');
        }
        image = req.files.image[0].filename
        JourneyIconData = {
            journeyText: body.journeyText,
            journeyTag: body.journeyTag,
            image: image
        }
        JourneyIcon = await JourneyIconModal(JourneyIconData).save();
    }
    if (body._id) {
        JourneyIconData = {
            journeyText: body.journeyText,
            journeyTag: body.journeyTag,
            updatedAt: Date.now()
        }
        if (req.files.image && req.files.image.length > 0) {
            image = req.files.image[0].filename
            JourneyIconData.image = image
        }

        JourneyIcon = await JourneyIconModal
            .updateOne({ _id: body._id }, { $set: JourneyIconData })
            .exec();
    }
    JourneyIcon.image = config.upload_folder + config.upload_entities.JourneyIcon_image_folder + JourneyIcon.image;
    return JourneyIcon;
}


//GET JourneyIcon: fetches the list of JourneyIcons with limit and offset and if the body has filter returns the filtered list. 
let getAllJourneyIcon = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { journeyText: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { journeyTag: { $regex: new RegExp(body.filters.searchtext, 'ig') } },

            ]
        }
    }
    let allJourneyIcons = await JourneyIconModal
        .find(findData)
        .sort({ createdAt: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()

    allJourneyIcons.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.JourneyIcon_image_folder + element.image;
    });
    let totalRecords = await JourneyIconModal.countDocuments(findData);
    let _result = { total_count: 0 };
    _result.JourneyIcons = allJourneyIcons;
    _result.total_count = totalRecords;
    return _result;
}


//GET A SINGLE JourneyIcon: fetches the details of the JourneyIcon for the id given
let getJourneyIcon = async (id) => {
    let findData = { _id: ObjectId(id) };
    let allJourneyIcon = await JourneyIconModal.aggregate([
        { $match: findData }
    ]).exec()

    allJourneyIcon.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.JourneyIcon_image_folder + element.image;
    });
    return allJourneyIcon[0];
}


//DELETE A JourneyIcon:Deletes the JourneyIcon for the id given 
let removeJourneyIcon = async (icon_id) => {
    return await JourneyIconModal
        .deleteOne({ _id: icon_id })
        .lean()
        .exec();
}



//CARDS API
//ADD-UPDATE CARDS :If the body contains id it updates the card else adds a new card.

let addJourneyCard = async (body) => {
    let JourneyData,
        Journey;
    if (!body.cardDescription || !body.cardTitle) {
        throw new BadRequestError(" card Description is required");
    }
    if (!body._id) {
        JourneyData = {
            cardDescription: body.cardDescription,
            cardTitle: body.cardTitle,
        }
        Journey = await JourneyCardModal(JourneyData).save();
    }
    if (body._id) {
        JourneyData = {
            cardDescription: body.cardDescription,
            cardTitle: body.cardTitle,
            updatedAt: Date.now()
        }
        Journey = await JourneyCardModal
            .updateOne({ _id: body._id }, { $set: JourneyData })
            .exec();
    }

    return Journey;
}


//GET card: fetches the list of cards with limit and offset and if the body has filter returns the filtered list. 
let getJourneyCardsDetails = async (body) => {
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
    let allCards = await JourneyCardModal
        .find(findData)
        .sort({ createdAt: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()
    let totalRecords = await JourneyCardModal.countDocuments(findData);
    let Journey = { total_count: 0 };
    Journey.cards = allCards;
    Journey.total_count = totalRecords;
    return Journey
}


//get card: fetches the details of the card for the id given
let getJourneyCard = async (card_id) => {
    let findData = { _id: ObjectId(card_id) };
    let Journey = await JourneyCardModal.aggregate([
        { $match: findData }
    ]).exec()
    return Journey[0];
}


//DELETE A CARD:Deletes the card for the id given 
let deleteJourneyCard = async (card_id) => {
    return await JourneyCardModal
        .deleteOne({ _id: card_id })
        .lean()
        .exec();
}
module.exports = {
    addJourneyIcon: addJourneyIcon,
    getAllJourneyIcon: getAllJourneyIcon,
    removeJourneyIcon: removeJourneyIcon,
    getJourneyIcon: getJourneyIcon,
    //cards api
    addJourneyCard: addJourneyCard,
    deleteJourneyCard: deleteJourneyCard,
    getJourneyCard: getJourneyCard,
    getJourneyCardsDetails: getJourneyCardsDetails,
};