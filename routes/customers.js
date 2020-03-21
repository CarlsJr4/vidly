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


// Default GET route
router.get('/', async (req, res) => {
	const customers = await Customers.find();
	res.send(customers);
});


//  Search for customer by ID
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	// Define customer here so the try catch block can read it
	let customer

	try {
	customer = await Customers.find({_id: id});
	}
	catch (err) {
		if (!customer) return res.status(404).send(`Customer with ID ${id} was not found.`);
		res.send(err);
	}

	res.send(customer);
});


// POST request
router.post('/', async (req, res) => {
	// Here, we are letting Joi handle our errors
	const { error } = validateData(req);
	if (error) return res.status(400).send(error.details[0].message);

	let customer = new Customers({
		name: req.body.name, 
		phone: req.body.phone,
		isGold: req.body.isGold
	});

	customer = await customer.save();
	res.send(customer);
});


// PUT request
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	// Initialize variable here so try/catch blocks can access it
	let updatedCustomer;

	// Initial request validation
	const { error } = validateData(req);
	if (error) return res.status(400).send(error.details[0].message);

	try {
		updatedCustomer = await Customers.findByIdAndUpdate(id, {
			name: req.body.name,
			phone: req.body.phone,
			isGold: req.body.isGold
		},
		{new: true});
		res.send(updatedCustomer);
	}
	catch (err) {
		if (!updatedCustomer) return res.status(404).send(`Customer with ID ${id} was not found`);
		res.send(err)
	}
});


// DELETE request 
router.delete('/:id', async (req, res) => {
	let customer;
	const id = req.params.id;
	try {
		customer = await Customers.findByIdAndRemove(id);
		res.send(customer);
	}
	catch (err) {
		if (!customer) return res.status(404).send(`The customer with the ID ${id} was not found.`);
	}
});

module.exports = router;