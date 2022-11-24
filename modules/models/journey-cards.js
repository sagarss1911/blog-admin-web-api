'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    cardDescription: { type: String, required: true },
    cardTitle: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'journeycards' });
let VIModel = mongoose.model("journeycards", tempSchema);
module.exports = VIModel;


