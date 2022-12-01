'use strict';
let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    headerMainheadingModel = require('../models/headerMainheading'),
    headerSubheadingModel = require('../models/headerSubheading'),
    ObjectId = require('mongoose').Types.ObjectId;



//header main headings
let addHeaderMainheading = async (req) => {
    let websiteData,
        websiteHeadingData;
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    ['heading'].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });
    websiteData = {

        heading: body.heading,
    }
    if (!body._id) {
        websiteHeadingData = await headerMainheadingModel(websiteData).save();
    }
    if (body._id) {
        websiteData.updatedAt = Date.now()
        websiteHeadingData = await headerMainheadingModel
            .updateOne({ _id: body._id }, { $set: websiteData })
            .exec();
    }
    return websiteHeadingData;
}

let getHeader = async (header_id) => {
    let websiteHeader = await headerMainheadingModel
        .find({ _id: header_id })
        .lean()
        .exec()
    return websiteHeader;
}


let getAllMainHeader = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { heading: { $regex: new RegExp(body.filters.searchtext, 'ig') } },

            ]
        }
    }
    let websiteHeader = await headerMainheadingModel
        .find(findData)
        .sort({ createdAt: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()


    let totalRecords = await headerMainheadingModel.countDocuments(findData);
    let _result = { total_count: 0 };
    _result.websiteHeader = websiteHeader;
    _result.total_count = totalRecords;
    return _result;

}


let deleteHeader = async (header_id) => {
    return await headerMainheadingModel
        .deleteOne({ _id: header_id })
        .lean()
        .exec();
}

////////////////////////////////////////////////////////

let addHeaderSubHeading = async (req) => {
    let websiteData,
        websiteHeadingData;
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    ['subHeading', 'description'].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });
    websiteData = {
        subHeading: body.subHeading,
        description: body.description,
        mainheading: body.mainheading,
    }
    if (!body._id) {
        websiteHeadingData = await headerSubheadingModel(websiteData).save();
    }
    if (body._id) {
        websiteData.updatedAt = Date.now()
        websiteHeadingData = await headerSubheadingModel
            .updateOne({ _id: body._id }, { $set: websiteData })
            .exec();
    }
    return websiteHeadingData;
}

let getSubHeader = async (subheader_id) => {

    let subHeader = await headerSubheadingModel
        .find({ _id: subheader_id })
        .lean()
        .exec()
    return subHeader;
}


let getAllSubHeader = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { subHeading: { $regex: new RegExp(body.filters.searchtext, 'ig') } },

            ]
        }
    }
    let subHeader = await headerSubheadingModel
        .find(findData)
        .sort({ createdAt: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()


    let totalRecords = await headerSubheadingModel.countDocuments(findData);
    let _result = { total_count: 0 };
    _result.subHeader = subHeader;
    _result.total_count = totalRecords;
    return _result;

}


let deleteSubHeader = async (subheader_id) => {
    return await headerSubheadingModel
        .deleteOne({ _id: subheader_id })
        .lean()
        .exec();
}


// schema:

// country: id, name
// state: id, name, countryId

// db.getCollection('state').aggregate([
//     {
//         $lookup: {
//             from: "country", //jis table me tumhe data find karna hain
//             let: { countryId: "$countryId" }, //tumhare table me reference key kya hain wo "" ke ander jayega and wo value uske aage wale ko assign hoga in this case  countryId
//             pipeline: [
//                 {
//                     $match: {
//                         $expr: { $eq: ["$_id", "$$countryId"] }  // equal check karna hain _id parent table ka id,$$tumhara local variable
//                     }
//                 },
//                 { $project: { name: 1 } } // fields you want to show
//             ],
//             as: "parentCountry" // tag in which you want data
//         }
//     }
// ])



//Get all categories list
let getMainHeader = async (body) => {
    let mainHeader = await headerMainheadingModel.aggregate(
        [
            {
                $lookup: {
                    from: "headerMainheadingModel",
                    let: { myid: "$mainheading" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$myid"] }
                            }
                        },
                        { $project: { _id: 1 } }
                    ],
                    as: "mainheading"
                }
            },
        ])
        .exec()


    return mainHeader;
}


module.exports = {
    addHeaderSubHeading: addHeaderSubHeading,
    getSubHeader: getSubHeader,
    getAllSubHeader: getAllSubHeader,
    deleteSubHeader: deleteSubHeader,


    //main header
    addHeaderMainheading: addHeaderMainheading,
    getHeader: getHeader,
    getAllMainHeader: getAllMainHeader,
    deleteHeader: deleteHeader,
    getMainHeader: getMainHeader

};