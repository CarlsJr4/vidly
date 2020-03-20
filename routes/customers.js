// Build the customers API
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const router = express.Router();

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
		name: Joi.string()
			.min(2)
			.max(50)
			.required(),
		phone: Joi.string()
			.required(),
		isGold: Joi.boolean()
	});

	return schema.validate(customer.body);
}

//  Route: vidly/api/customers. Need to build the routes for this.
router.get('/', async (req, res) => {
	const customers = await Customers.find();
	res.send(customers);
});

//  Search for customer by ID
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const customer = await Customers.find({_id: id});
		res.send(customer);
	}
	catch {
		res.send(`Could not find customer with id ${id}`)
	}
});

// POST request
router.post('/', async (req, res) => {
	// Here, we are letting Joi handle our errors
	const { error } = validateData(req);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = new Customers({
		name: req.body.name, 
		phone: req.body.phone,
		isGold: req.body.isGold
	});

	const savedCustomer = await customer.save();
	res.send(savedCustomer);
});

// PUT request
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const { error } = validateData(req);
	if (error) return res.status(400).send(error.details[0].message);

	try {
		// Returns a query object
		let updatedCustomer = await Customers.findByIdAndUpdate(id, {
			// Will this only update the fields we want to update?
			// We could use the || operator incase the field doesn't exist?
			name: req.body.name,
			phone: req.body.phone,
			isGold: req.body.isGold
		},
		{new: true});
		res.send(updatedCustomer);
	}
	catch (err) {
		res.send(err)
	}
});

// DELETE request 
router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const customer = await Customers.findByIdAndRemove(id);
		res.send(customer);
	}
	catch {
		res.status(404).send('The customer with the given ID was not found.');
	}
});

module.exports = router;