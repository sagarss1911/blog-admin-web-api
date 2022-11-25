'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    userName: { type: String },
    password: { type: String },
    profileImage: { type: String },
    coverImage: { type: String },
    shortBio: { type: String },
    location: { type: String },
    fpToken: { type: String },
    fpTokenCreatedAt: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'user_register' });

let VIModel = mongoose.model("user_register", tempSchema);
module.exports = VIModel;
