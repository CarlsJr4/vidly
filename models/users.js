const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 5,
		maxlength: 50,
		required: true
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		minlength: 8,
		required: true
	}
});

const Users = userSchema.model('user', userSchema);

module.exports = {
	users: Users
}
