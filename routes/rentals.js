const express = require('express');
const { rentals, validateRental } = require('../models/rentals');
const { customer } = require('../models/customer');
const { movies } = require('../models/movies');
const router = express.Router();

// Default GET route
router.get('/', async (req, res) => {
	const allRentals = await rentals
		.find()
		.sort('timeOfRental');
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
		if (!retrievedCustomer) {
			return res.status(400).send('Invalid customer ID.')
		} else {
			return res.status(400).send('Invalid movie ID.')
		}
	}

	// How to make it so that we can selectively populate whichever properties we want?
	// We have to design a simpler customer schema to override the default one
	let rental = new rentals({
		movie: {
			_id: retrievedMovie._id,
			title: retrievedMovie.title,
			dailyRentalRate: retrievedMovie.dailyRentalRate
		},
		customer: retrievedCustomer, 
	});

	rental = await rental.save();
	res.send(rental);
});


module.exports = router;