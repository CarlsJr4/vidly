const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {users, validateUser} = require('../models/users');

router.post('/', async (req, res) => {
	// Validate the submitted user object
	const {error} = validateUser(req);
	if (error) return res.status(400).send(error.details[0].message);

	// Validate that the user doesn't already exist
	// Not allowing additional users?
	let user = await users.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered.')

	const newUser = new users({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	try {
		await newUser.save();
	} 
	catch(err) {
		return res.send(err);
	}
	
	res.send(newUser);
})

module.exports = router;