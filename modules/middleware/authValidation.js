'use strict';

const admin = require("../models/admin");

let _ = require("lodash"),
	UnauthorizedError = require('../errors/unauthorizedError'),
	AccessDeniedError = require('../errors/accessDeniedError'),
	config = process.config.global_config,
	UsersModel = require('../models/admin'),
	UserRegisterModal = require('../models/user_register')


let verifyToken = async (req, res, next) => {
	let token = req.get('x-auth-token');
	if (!token) {
		return res.json({
			status: 400,
			data: { msg: "You are not authorized." }
		});

	}
	let user;
	user = await UsersModel
		.findOne({ fpToken: token })
		.select()
		.lean()
		.exec();

	if (!user) {
		return res.json({
			status: 400,
			data: { msg: "You are not authorized." }
		})
	} else {
		req.user = {
			_id: user._id,
			email: user.email
		};
		next();
	}
}
let verifyAPIKey = async (req, res, next) => {
	let APIkey = req.get('x-api-key');
	if (!APIkey || APIkey != config.api_key) {
		return res.json({
			status: 400,
			data: { msg: "You are not authorized." }
		});

	}
	next();
}





let verifyUserToken = async (req, res, next) => {
	let token = req.get('x-auth-token');
	if (!token) {
		return res.json({
			status: 400,
			data: { msg: "You are not authorized." }
		});

	}
	let user;
	user = await UsersModel
		.findOne({ fpToken: token })
		.select()
		.lean()
		.exec();
	user = await UserRegisterModal
		.findOne({ fpToken: token })
		.select()
		.lean()
		.exec();

	if (!user) {
		return res.json({
			status: 400,
			data: { msg: "You are not authorized." }
		})
	} else {
		req.user = {
			_id: user._id,
			email: user.email
		};
		next();
	}
}
let verifyUserAPIKey = async (req, res, next) => {
	let APIkey = req.get('x-api-key');
	if (!APIkey || APIkey != config.api_key) {
		return res.json({
			status: 400,
			data: { msg: "You are not authorized." }
		});

	}
	next();
}



let verifyUserByIdToken = async (req, res, next) => {
	let token = req.get('x-auth-token');
	if (!token) {
		return res.json({
			status: 400,
			data: { msg: "You are not authorized." }
		});

	}
	let user = await UsersModel
		.findOne({ fpToken: token })
		.select()
		.lean()
		.exec();
	let admin = await UserRegisterModal
		.findOne({ fpToken: token })
		.select()
		.lean()
		.exec();
	if (!user && !admin) {
		return res.json({
			status: 400,
			data: { msg: "You are not authorized." }
		})
	} else {
		if (user) {
			req.user = {
				_id: user._id,
				email: user.email
			};
		}
		if (admin) {
			req.user = {
				_id: admin._id,
				email: admin.email
			};
		}
		next();
	}
}
let verifyUserByIdAPIKey = async (req, res, next) => {
	let APIkey = req.get('x-api-key');
	if (!APIkey || APIkey != config.api_key) {
		return res.json({
			status: 400,
			data: { msg: "You are not authorized." }
		});

	}
	next();
}


module.exports = {
	verifyToken,
	verifyAPIKey,
	verifyUserToken,
	verifyUserAPIKey,
	verifyUserByIdToken,
	verifyUserByIdAPIKey
}