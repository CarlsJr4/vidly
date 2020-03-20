// Build the customers API
// What we need:
const express = require('express');
const mongoose = require('mongoose');
// const Joi = require('@hapi/joi');

const router = express.Router();

// Schema and model
const Customers = mongoose.model('Customer', 
	new mongoose.Schema({
		isGold: Boolean,
		name: String, 
		phone: String
	})
);

//  Route: vidly/api/customers. Need to build the routes for this.
router.get('/', (req, res) => {
	res.send('Here are vidlys customers!.');
});

//  Search for customer by ID
router.get('/:id', (req, res) => {
	res.send(`This is customer: ${req.params.id}`);
});

// POST request
router.post('/', async (req, res) => {
	// To save to DB we need a new instance of the model
	const customer = new Customers({
		name: req.body.name, 
		phone: req.body.phone,
		isGold: req.body.isGold
	});
	// Returns a promise
	const savedCustomer = await customer.save();
	res.send(savedCustomer);
});

// PUT request

// DELETE request 

// Schema, model, class 
// CRUD operations
// Validation

// NOTE: The name doesn't matter because we import the whole module anyways
module.exports = router;