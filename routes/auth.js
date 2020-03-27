const express = require('express');
const router = express.Router();
const {users} = require('../models/users');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.post('/', async (req, res) => {
	// Validate the submitted user object
	const {error} = validate(req);
	if (error) return res.status(400).send(error.details[0].message);

	// Determine if user exists
	let user = await users.findOne(_.pick(req.body, ['email']));
	if (!user) return res.status(400).send('Invalid email or password.');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password');

	res.send(true);
});

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(8).max(255).required(),
	})
	return schema.validate(req.body);
}

module.exports = router; 