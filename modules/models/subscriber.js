'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    subscriberName: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: true },
    coverImage: { type: String, required: true },
    shortDescription: { type: String },
    location: { type: String, required: true },
    website: { type: String, required: true },
    facebookLink: { type: String },
    twitterLink: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'subscriber' });
let VIModel = mongoose.model("subscriber", tempSchema);
module.exports = VIModel;


