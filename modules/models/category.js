'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    parentCategoryId: Schema.ObjectId,
    categoryName: { type: String },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeyword: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'category' });

let VIModel = mongoose.model("category", tempSchema);
module.exports = VIModel;


