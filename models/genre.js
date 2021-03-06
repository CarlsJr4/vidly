const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const putDebug = require('debug')('app:putDebug');

const genreSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	}
});

const Genres = mongoose.model('Genre', genreSchema);

function validateData(req) {
	const schema = Joi.object({
		title: Joi.string()
			.min(5)
			.max(50)
			.required()
	});
	putDebug(req.body);

	return schema.validate(req.body);
}

module.exports = {
	genres: Genres,
	genreSchema,
	validateData
}
