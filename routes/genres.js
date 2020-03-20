// This routes module acts like its own mini-express app with its own routes
const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

function validateData(req) {
	const schema = Joi.object({
		title: Joi.string()
			.min(3)
			.required()
	});

	return schema.validate(req.body);
}

// Compile your schema into a model where documents are derived from
const Genres = mongoose.model('Genre', new mongoose.Schema({
		title: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50
		}
	})
);

// Default GET route
router.get('/', async (req, res) => {
	const genres = await Genres.find().sort('name');
	res.send(genres);
	}
);

// GET specific genre by ID
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const genres = await Genres.find({_id: id});
		res.send(genres);
	}
	catch {
		res.status(404).send('The genre with the given ID was not found.')
	}
});


// POST request
router.post('/', async (req, res) => {
	// This returns the actual document. We can call the variable to save to DB.
	try {
		let newGenre = new Genres({title: req.body.title});
		// This returns a fulfilled promise so we can send it to the client
		newGenre = await newGenre.save();
		res.send(newGenre);
	}
	catch (err) {
		res.send(err.errors.title.message);
	}
});


// PUT request
router.put('/:id', async (req, res) => {
	// We need to validate the data to send before sending it to the DB
	const {error} = validateData(req.body);
	if (error) return res.status(404).send(error.details[0].message);

	const id = req.params.id;
	const genre = await Genres.findByIdAndUpdate(
		id, 
		{title: req.body.title},
		{new: true}
	);

	if (!genre) return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);
});
		

// DELETE request
router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const genre = await Genres.findByIdAndRemove(id);
		res.send(genre);
	}
	catch {
		res.status(404).send('The genre with the given ID was not found.');
	}
});

module.exports = router;