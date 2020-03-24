const express = require('express');
const { movies, validateMovie } = require('../models/movies');
const { genres } = require('../models/genre');
const router = express.Router();

// Default GET route
router.get('/', async (req, res) => {
	const allMovies = await movies.find();
	res.send(allMovies);
});


//  Search for movies by ID
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	// Define movies here so the try catch block can read it
	let movies;

	try {
	movies = await movies.find({_id: id});
	}
	catch (err) {
		if (!movies) return res.status(404).send(`The movie with ID ${id} was not found.`);
		res.send(err);
	}

	res.send(movies);
});


// POST request
router.post('/', async (req, res) => {
	const { error } = validateMovie(req);
	if (error) return res.status(400).send(error.details[0].message);

	// Work on this part tomorrow!
	// POST request is not working
	let movie = new movies({
		title: req.body.title, 
		genre: new genres({ title: req.body.genre }), // Create a new instance of the model as a subdocument 
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate
	});

	movie = await movie.save();
	res.send(movie);
});


// PUT request
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	// Initialize variable here so try/catch blocks can access it
	let updatedCustomer;

	// Initial request validation
	const { error } = validateMovie(req);
	if (error) return res.status(400).send(error.details[0].message);

	try {
		updatedCustomer = await movies.findByIdAndUpdate(id, {
			name: req.body.name,
			phone: req.body.phone,
			isGold: req.body.isGold
		},
		{new: true});
		res.send(updatedCustomer);
	}
	catch (err) {
		if (!updatedCustomer) return res.status(404).send(`The movie with ID ${id} was not found`);
		res.send(err)
	}
});


// DELETE request 
router.delete('/:id', async (req, res) => {
	let movies;
	const id = req.params.id;
	try {
		movies = await movies.findByIdAndRemove(id);
		res.send(movies);
	}
	catch (err) {
		if (!movies) return res.status(404).send(`The movie with the ID ${id} was not found.`);
	}
});


module.exports = router;