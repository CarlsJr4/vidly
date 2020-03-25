const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { movieSchema } = require('../models/movies'); 
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
	movie: {
		type: movieSchema,
		required: true
	},
	customer: {
		type: customerSchema,
		required: true
	},
	timeOfRental: {
		type: Date,
		default: Date.now()
	}
}));

module.exports = {
	rentals: Rentals,
	validateRental
}
