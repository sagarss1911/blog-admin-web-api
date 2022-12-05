'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'contactus' });

let VIModel = mongoose.model("contactus", tempSchema);
module.exports = VIModel;
