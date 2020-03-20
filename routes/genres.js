// This routes module acts like its own mini-express app with its own routes

// Import mongoose
const mongoose = require('mongoose');

const express = require('express'); 
const Joi = require('@hapi/joi');
const router = express.Router();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vidly', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// Listen for successful connection or failure
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('Connected to vidly database...')});

// Create a database schema (define data types)
const genreSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	}
});

// Compile your schema into a model where documents are derived from
const Genres = mongoose.model('Genre', genreSchema);


// Default GET route
router.get('/', (req, res) => {
	Genres.find((err, genres) => {
		if (err) return res.send(err);
		res.send(genres);
	});
});


// GET specific genre by ID
router.get('/:id', (req, res) => {
	const id = req.params.id;
	Genres.find({_id: id}, (err, data) => {
		if (err) res.send(err);
		res.send(data);
	});
});


// POST request
router.post('/', (req, res) => {
	const newGenre = new Genres({title: req.body.title});
	newGenre.save((err, data) => {
		if (err) res.send(err);
		res.send(data);
	});
});


// PUT request
router.put('/:id', (req, res) => {
	const id = req.params.id;
	Genres.findByIdAndUpdate(id, {title: req.body.title});
});
		

// DELETE request
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	const genre = genres.find(genre => genre.id.toString() === id);

	if (!genre) return res.status(404).send("Can't find the requested genre.");

	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.send(genres);
});

module.exports = router;