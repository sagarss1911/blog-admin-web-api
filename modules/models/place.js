// 'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;


const placeSchema = mongoose.Schema({
    image: { type: String },
    mapImage: { type: String },
    placeName: { type: String, required: true },
    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true },
    seoKeyword: { type: String, required: true },
    active: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('places', placeSchema)