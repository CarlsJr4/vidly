// This routes module acts like its own mini-express app with its own routes
const express = require('express'); 
const router = express.Router();
const {genres, validateData} = require('../models/genre');

// Default GET route
router.get('/', async (req, res) => {
	const genres = await genres.find().sort('name');
	res.send(genres);
	}
);

// GET specific genre by ID
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const genres = await genres.find({_id: id});
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
		let newGenre = new genres({title: req.body.title});
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
	const {error} = validateData(req);
	if (error) return res.status(404).send(error.details[0].message);

	try {
		const id = req.params.id;
		const genre = await genres.findByIdAndUpdate(
			id, 
			{title: req.body.title},
			{new: true}
		);
		res.send(genre);
	}
	catch {
		res.status(404).send('The genre with the given ID was not found');
	}
});
		

// DELETE request
router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const genre = await genres.findByIdAndRemove(id);
		res.send(genre);
	}
	catch {
		res.status(404).send('The genre with the given ID was not found.');
	}
});

module.exports = router;