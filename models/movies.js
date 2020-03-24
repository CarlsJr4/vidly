// Task: Build an API to manage the list of movies
// Do all the CRUD stuff
// Feel free to copy/paste from your other files 

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { genres } = require('./genre');

function validateMovie(req) {
	const schema = Joi.object({
		title: Joi
			.string()
			.min(5)
			.max(50)
			.required(),
		genre: Joi
			.string()
			.min(5)
			.max(50)
			.required(),
		numberInStock: Joi
			.number()
			.required(),
		dailyRentalRate: Joi
			.number()
			.required()
	});

	return schema.validate(req.body)
};

const Movies = mongoose.model('Movie', new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	genre: {
		type: mongoose.Types.ObjectId,
		ref: genres,
		required: true
	},
	numberInStock: {
		type: Number,
		required: true
	},
	dailyRentalRate: {
		type: Number,
		required: true
	}
}));

module.exports = {
	movies: Movies,
	validateMovie
}