const express = require('express');
const router = express.Router();
const users = require('../models/users');

router.post('/', async (req, res) => {
	// POST a new user to the database
	const newUser = new users({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	await newUser.save();
	res.send(newUser);
})

module.exports = router;