'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    explore: { type: String, required: true },
    exploreDescription: { type: String, required: true },
    community: { type: String, required: true },
    communityDescription: { type: String, required: true },
    about: { type: String, required: true },
    aboutDescription: { type: String, required: true },
    store: { type: String, required: true },
    storeDescription: { type: String, required: true },
    follow: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'footerHeading' });
let VIModel = mongoose.model("footerHeading", tempSchema);
module.exports = VIModel;


