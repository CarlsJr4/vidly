const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

function validateRental(req) {
	const schema = Joi.object({
		movieId: Joi
			.string()
			.required(),
		customerId: Joi
			.string()
			.required()
	});
	return schema.validate(req.body)
};

const Rentals = mongoose.model('Rental', new mongoose.Schema({
	movie: {
		type: new mongoose.Schema({
			title: {
				type: String,
				trim: true,
				required: true
			},
			dailyRentalRate: {
				type: Number,
				required: true,
				min: 0,
				max: 255
			}
		}),
		required: true
	},
	customer: {
		type: customerSchema,
		required: true
	},
	timeOfRental: {
		type: Date,
		default: Date.now()
	},
	dateReturned: {
		type: Date
	}
}));

module.exports = {
	rentals: Rentals,
	validateRental
}
