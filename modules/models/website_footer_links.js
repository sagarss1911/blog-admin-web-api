'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    linkName: { type: String, required: true },
    link: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'websitelinks' });
let VIModel = mongoose.model("websitelinks", tempSchema);
module.exports = VIModel;


