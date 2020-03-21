const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

// Schema and model
const Customers = mongoose.model('Customer', 
	new mongoose.Schema({
		isGold: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			minlength: 2,
			maxlength: 50,
			required: true
		}, 
		phone: {
			type: String,
			required: true
		}
	})
);

// PUT and POST validation
function validateData(customer) {
	const schema = Joi.object({
		name: Joi
			.string()
			.min(2)
			.max(50)
			.required(),
		phone: Joi
			.string()
			.required(),
		isGold: Joi
			.boolean()
	});
	return schema.validate(customer.body);
}

module.exports = {
	customer: Customers,
	validateData
}