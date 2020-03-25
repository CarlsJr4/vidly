const express = require('express');
const { rentals, validateRental } = require('../models/movies');
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

	let rental = new rentals({
		movie: {
			_id: retrievedMovie._id,
			title: retrievedMovie.title
		},
		customer: {
			_id: rental._id,
			title: rental.title
		}, 
	});

	rental = await rental.save();
	res.send(rental);
});


module.exports = router;