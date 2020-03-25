// TASK: Build 2 endpoints
// POST /api/rentals
// GET /api/rentals

const express = require('express');
const { movies, validateMovie } = require('../models/movies');
const { genres } = require('../models/genre');
const router = express.Router();

// Default GET route
router.get('/', async (req, res) => {
	const allMovies = await movies.find();
	res.send(allMovies);
});


// POST request
router.post('/', async (req, res) => {
	const { error } = validateMovie(req);
	if (error) return res.status(400).send(error.details[0].message);
	let genre;

	// So we can ensure that the client sends a valid genre ID
	try {
		genre = await genres.findById(req.body.genreId);
	}
	catch {
		if (!genre) return res.status(400).send('Invalid genre.')
	}

	let movie = new movies({
		title: req.body.title, 
		genre: {
			_id: genre._id,
			title: genre.title
		}, 
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate
	});

	movie = await movie.save();
	res.send(movie);
});


module.exports = router;