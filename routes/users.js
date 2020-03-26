const express = require('express');
const router = express.Router();
const users = require('../models/users');

router.post('/', async (req, res) => {
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