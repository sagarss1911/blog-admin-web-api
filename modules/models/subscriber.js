'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    subscriberName: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    coverImage: { type: String },
    shortDescription: { type: String },
    location: { type: String },
    website: { type: String, required: true },
    facebookLink: { type: String, required: true },
    twitterLink: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'subscriber' });
let VIModel = mongoose.model("subscriber", tempSchema);
module.exports = VIModel;


