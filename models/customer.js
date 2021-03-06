const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const customerSchema = new mongoose.Schema({
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
});

const Customers = mongoose.model('Customer', customerSchema);

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
	customerSchema,
	validateData
}