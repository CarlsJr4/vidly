const express = require('express');
const { rentals, validateRental } = require('../models/rentals');
const { customer } = require('../models/customer');
const { movies } = require('../models/movies');
const router = express.Router();

// Default GET route
router.get('/', async (req, res) => {
	const allRentals = await rentals.find();
	res.send(allRentals);
});


// POST request
router.post('/', async (req, res) => {
	const { error } = validateRental(req);
	if (error) return res.status(400).send(error.details[0].message);
	let retrievedMovie, retrievedCustomer;

	try {
		retrievedMovie = await movies.findById(req.body.movieId);
		retrievedCustomer = await customer.findById(req.body.customerId);
	}
	catch {
		if (!retrievedCustomer || !retrievedMovie) return res.status(400).send('Invalid ID.')
	}

	// How to make it so that we can selectively populate whichever properties we want?
	let rental = new rentals({
		movie: retrievedMovie,
		customer: retrievedCustomer, 
	});

	rental = await rental.save();
	res.send(rental);
});


module.exports = router;