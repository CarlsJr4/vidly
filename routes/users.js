const express = require('express');
const router = express.Router();
const {users, validateUser} = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.post('/', async (req, res) => {
	// Validate the submitted user object
	const {error} = validateUser(req);
	if (error) return res.status(400).send(error.details[0].message);

	// Determine if user exists
	let user = await users.findOne(_.pick(req.body, ['email']));
	if (user) return res.status(400).send('User already registered.')

	const newUser = new users(_.pick(req.body, ['name', 'email', 'password']));

	// Encrypt the user's password
	const salt = await bcrypt.genSalt(10);
	newUser.password = await bcrypt.hash(newUser.password, salt);

	try {
		await newUser.save();
	} 
	catch(err) {
		return res.send(err);
	}
	
	res.send(newUser);
})

module.exports = router; 