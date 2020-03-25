const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { genreSchema } = require('./genre');

function validateMovie(req) {
	const schema = Joi.object({
		title: Joi
			.string()
			.min(5)
			.max(50)
			.required(),
		genreId: Joi
			.string()
			.required(),
		numberInStock: Joi
			.number()
			.min(0)
			.max(255)
			.required(),
		dailyRentalRate: Joi
			.number()
			.min(0)
			.max(255)
			.required()
	});

	return schema.validate(req.body)
};

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true
	},
	genre: {
		type: genreSchema,
		required: true
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 255
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 255
	}
})

const Movies = mongoose.model('Movie', movieSchema);

module.exports = {
	movies: Movies,
	movieSchema,
	validateMovie
}