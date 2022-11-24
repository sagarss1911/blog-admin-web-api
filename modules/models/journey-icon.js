'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;


const journeyiconSchema = mongoose.Schema({
    image: { type: String },

    journeyTag: { type: String, required: true },
    journeyText: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'journeyicon' });

module.exports = mongoose.model('journeyicon', journeyiconSchema)