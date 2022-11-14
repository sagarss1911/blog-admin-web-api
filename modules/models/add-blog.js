'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({

    title: { type: String },
    slug: { type: String },
    smallDiscription: { type: String },
    fullDiscription: { type: String },
    image: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeyword: { type: String },
    categoryIds: [Schema.ObjectId],
    highlightCategory: { type: String },
    createdBy: Schema.ObjectId,
    imageBy: Schema.ObjectId,
    wordsBy: Schema.ObjectId,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'addBlogs' });
let VIModel = mongoose.model("addBlogs", tempSchema);
module.exports = VIModel;


