const express = require('express');
const router = express.Router();
const {users, validateUser} = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../middleware/auth');

// Client doesn't send ID to server, we get ID from the JWT
router.get('/me', auth, async (req, res) => {
	// The user object comes from the decoded JWT, which is stored in the req object
	const user = await users.findById(req.user._id).select('-password');
	res.send(user);
})

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
	
	const token = newUser.generateAuthToken();
	res.header('x-auth-token', token).send(_.pick(newUser, ['_id', 'name', 'email']));
});          

module.exports = router; 