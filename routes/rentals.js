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

	let rental = new rentals({
		movie: {
			_id: retrievedMovie._id,
			title: retrievedMovie.title,
			dailyRentalRate: retrievedMovie.dailyRentalRate
		},
		customer: retrievedCustomer, 
	});

	// Need to update other documents to reflect changes from renting
	try {
		retrievedMovie.numberInStock-- 
		await retrievedMovie.save()
	} catch {
		return res.status(400).send('The requested movie is out of stock.')
	};

	rental = await rental.save();
	res.send(rental);
});


module.exports = router;