// 'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    name: { type: String },
    slug: { type: String },
    image: { type: String },
    seotitle: { type: String },
    option_images: { type: Array },
    seodescription: { type: String },
    seokeyword: { type: String },
    videolink: { type: String },
    collections: [Schema.ObjectId],
    category: [Schema.ObjectId],
    parentcollection: { type: Schema.ObjectId },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'product' });
let VIModel = mongoose.model("product", tempSchema);
module.exports = VIModel;



// const placeSchema = mongoose.Schema({
//     image: { type: String },
//     mapImage: { type: String },
//     placeName: { type: String, required: true },
//     seoTitle: { type: String, required: true },
//     seoDescription: { type: String, required: true },
//     seoKeyword: { type: String, required: true },
//     active: { type: Boolean, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('places', placeSchema)