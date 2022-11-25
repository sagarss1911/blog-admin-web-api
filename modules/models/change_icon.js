'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;


const iconSchema = mongoose.Schema({
    image: { type: String },
    logoImage: { type: String },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'change_icon' });

module.exports = mongoose.model('change_icon', iconSchema)