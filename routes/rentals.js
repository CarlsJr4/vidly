const express = require('express');
const { rentals, validateRental } = require('../models/rentals');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const { customer } = require('../models/customer');
const { movies } = require('../models/movies');
const router = express.Router();

Fawn.init(mongoose);

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

	// Why can I decrement number in stock despite having validation that prevents stock to be less than 0?
	// Maybe focus on this later and just do the tuts
	try {
		new Fawn.Task()
			.save('rentals', rental)
			.update('movies', {_id: retrievedMovie._id}, {
				$inc: { numberInStock: -1 }
			})
			.run();
			
			res.send(rental);
	} catch(ex) {
		res.status(500).send('Internal server error.')
	}

});


module.exports = router;