'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    mission: { type: String, required: true },
    aim: { type: String, required: true },
    firstTitle: { type: String, required: true },
    firstDescription: { type: String, required: true },
    contributorPara1: { type: String, required: true },
    contributorPara2: { type: String, required: true },
    secondTitle: { type: String, required: true },
    firstColumn: { type: String, required: true },
    secondColumn: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'aboutus' });
let VIModel = mongoose.model("aboutus", tempSchema);
module.exports = VIModel;


