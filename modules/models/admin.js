'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
    createdBy: Schema.ObjectId,
    fpToken: { type: String },
    fpTokenCreatedAt: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    canBeEdited: { type: Boolean, default: true }
}, { versionKey: false, collection: 'admin' });

module.exports = mongoose.model("admin", adminSchema);




