'use strict';
let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    footerLinksModel = require('../models/website_footer_links'),
    footerHeadingModel = require('../models/footerHeading'),
    ObjectId = require('mongoose').Types.ObjectId;

let addFooterLinks = async (req) => {
    let websiteData,
        websiteLinkData;
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    ['linkName', 'link',].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });
    websiteData = {
        linkName: body.linkName,
        link: body.link,

    }
    if (!body._id) {
        websiteLinkData = await footerLinksModel(websiteData).save();
    }
    if (body._id) {
        websiteData.updatedAt = Date.now()
        websiteLinkData = await footerLinksModel
            .updateOne({ _id: body._id }, { $set: websiteData })
            .exec();
    }
    return websiteLinkData;
}


let getFooterLinksDetails = async (Link_id) => {
    let websiteLink = await footerLinksModel
        .find({ _id: Link_id })
        .lean()
        .exec()
    return websiteLink;
}


let getFooterLinks = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { linkName: { $regex: new RegExp(body.filters.searchtext, 'ig') } },

            ]
        }
    }
    let websiteLinks = await footerLinksModel
        .find(findData)
        .sort({ createdAt: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()


    let totalRecords = await footerLinksModel.countDocuments(findData);
    let _result = { total_count: 0 };
    _result.websiteLinks = websiteLinks;
    _result.total_count = totalRecords;
    return _result;

}


let deleteFooterLinks = async (Link_id) => {
    return await footerLinksModel
        .deleteOne({ _id: Link_id })
        .lean()
        .exec();
}


//footer headings
let addFooterHeading = async (req) => {
    let websiteData,
        websiteHeadingData;
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    ['explore', 'exploreDescription', 'community', 'communityDescription', 'about', 'aboutDescription', 'store', 'storeDescription', 'follow'].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });
    websiteData = {
        explore: body.explore,
        exploreDescription: body.exploreDescription,
        community: body.community,
        communityDescription: body.communityDescription,
        about: body.about,
        aboutDescription: body.aboutDescription,
        store: body.store,
        storeDescription: body.storeDescription,
        follow: body.follow,

    }
    if (!body._id) {
        websiteHeadingData = await footerHeadingModel(websiteData).save();
    }
    if (body._id) {
        websiteData.updatedAt = Date.now()
        websiteHeadingData = await footerHeadingModel
            .updateOne({ _id: body._id }, { $set: websiteData })
            .exec();
    }
    return websiteHeadingData;
}


let getFooterHeadingDetails = async (heading_id) => {
    let websiteHeadings = await footerHeadingModel
        .find({ _id: heading_id })
        .lean()
        .exec()
    return websiteHeadings;
}


let getFooterHeading = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { explore: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { follow: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { store: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { community: { $regex: new RegExp(body.filters.searchtext, 'ig') } },

            ]
        }
    }
    let footerHeadings = await footerHeadingModel
        .find(findData)
        .sort({ createdAt: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()


    let totalRecords = await footerHeadingModel.countDocuments(findData);
    let _result = { total_count: 0 };
    _result.footerHeadings = footerHeadings;
    _result.total_count = totalRecords;
    return _result;

}


let deleteFooterHeading = async (heading_id) => {
    return await footerHeadingModel
        .deleteOne({ _id: heading_id })
        .lean()
        .exec();
}


module.exports = {
    addFooterLinks: addFooterLinks,
    getFooterLinks: getFooterLinks,
    getFooterLinksDetails: getFooterLinksDetails,
    deleteFooterLinks: deleteFooterLinks,
    addFooterHeading: addFooterHeading,
    getFooterHeading: getFooterHeading,
    getFooterHeadingDetails: getFooterHeadingDetails,
    deleteFooterHeading: deleteFooterHeading,


};