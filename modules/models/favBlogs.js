'use strict';
let mongoose = require("../helpers/asf_mongodb"),
       Schema = mongoose.Schema;

let tempSchema = new Schema({

       blogId: Schema.ObjectId,
       userId: Schema.ObjectId,
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'favBlogs' });
let VIModel = mongoose.model("favBlogs", tempSchema);
module.exports = VIModel;


