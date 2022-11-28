'use strict';
let mongoose = require("../helpers/asf_mongodb"),
       Schema = mongoose.Schema;

let tempSchema = new Schema({
       userId: Schema.ObjectId,
       Name: { type: String },
       Email: { type: String },
       instagramLike: { type: String },
       additional: { type: String },
       Message: { type: String },
       contributor: { type: Boolean, default: 0 },
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'Contributors' });
let VIModel = mongoose.model("Contributors", tempSchema);
module.exports = VIModel;


