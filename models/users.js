const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 5,
		maxlength: 50,
		required: true
	},
	email: {
		type: String,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		minlength: 8,
		maxlength: 1024,
		required: true
	},
	isAdmin: {
		type: Boolean,
	}
});

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
	return token;
}

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(8).max(255).required(),
	})
	return schema.validate(user.body);
}

const Users = mongoose.model('user', userSchema);

module.exports = {
	users: Users,
	validateUser
}
