// Task: Create a POST and GET request for rentals

// What will we need in a rental document?
// Movie title - Need movie title schema
// Customer that is renting - Need customer name schema
// Timestamp of rental

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { movieSchema } = require('../models/movies'); // Once we have the movie, we can fill in its subdocuments
const { customerSchema } = require('../models/customer');


function validateRental(req) {
	const schema = Joi.object({
		rentalId: Joi
			.string()
			.required(),
		customerId: Joi
			.string()
			.required(),
		timeOfRental: Joi
			.string()
			.required()
	});

	return schema.validate(req.body)
};

const Rentals = mongoose.model('Rental', new mongoose.Schema({
	movieId: {
		type: movieSchema,
		required: true
	},
	customerId: {
		type: customerSchema,
		required: true
	},
	timeOfRental: {
		type: Date,
		default: Date.now()
	}
}));

module.exports = {
	movies: Movies,
	validateRental
}
