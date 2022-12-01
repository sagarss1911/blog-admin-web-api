'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    subHeading: { type: String, required: true },
    mainheading: Schema.ObjectId,
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'headerSubheading' });
let VIModel = mongoose.model("headerSubheading", tempSchema);
module.exports = VIModel;


