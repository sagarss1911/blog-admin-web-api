const multer = require('multer')

const mime_type = {
	"application/msword": "doc",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": 'docx',
	"text/plain": 'txt',
	"application/pdf": 'pdf',
	"application/rtf": 'rtf',
	"image/png": "png",
	"image/jpg": 'jpg',
	"image/jpeg": 'jpg',
	"image/gif": 'gif',
	"application/vnd.ms-excel": "csv",

}
'use strict';
let config = process.config.global_config;

let uploadPlaceImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.place_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadSubscriberImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.subscriber_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadBlogs = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.blogs_images_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

module.exports = { uploadPlaceImage, uploadSubscriberImage, uploadBlogs }