'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    cardDescription: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'aboutuscards' });
let VIModel = mongoose.model("aboutuscards", tempSchema);
module.exports = VIModel;


