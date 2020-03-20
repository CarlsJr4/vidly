// This routes module acts like its own mini-express app with its own routes

// Import mongoose
const mongoose = require('mongoose');

const express = require('express'); 
const Joi = require('@hapi/joi');
const router = express.Router();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vidly', {useNewUrlParser: true, useUnifiedTopology: true});

// Listen for successful connection or failure
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('Connected to vidly database...')});

// Create a database schema (define data types)
const genreSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 20
	}
});

// Compile your schema into a model where documents are derived from
const Genres = mongoose.model('Genre', genreSchema);

// Now, we need to create new documents using Mongoose's CRUD methods
// Genre.find({title: "Aliens"}, (err, arr) => {console.log(arr)});

// Create a test document and save it to MongoDB
// const genre = new Genres({title: "Sci-Fi"});
// genre.save().then(genre => {console.log(genre)});

function validateData(req) {
	const schema = Joi.object({
		title: Joi.string()
			.min(3)
			.required()
	});

	return schema.validate(req.body);
}

// Default GET route
router.get('/', (req, res) => {
	Genres.find((err, genres) => {
		if (err) return console.error(err);
		console.log(genres);
		res.send(genres);
	});
});

// GET specific genre by ID
router.get('/:id', (req, res) => {
	const id = req.params.id;
	Genres.find({_id: id}, (err, data) => {
		if (err) console.err(err);
		console.log(data);
		res.send(data);
	});
});


// POST request
router.post('/', (req, res) => {
	const newId = genres.length + 1; 
	// Need this to validate the sent title
	const {error} = validateData(req);
	if (error) return res.send(`Error: ${error.details[0].message}`);

	genres.push({
		"id": newId,
		"title": req.body.title
	});

	// Need to return the posted genre.
	const genre = genres.find(genre => genre.title === req.body.title);
	res.send(genre);
});


// PUT request
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const genre = genres.find(genre => genre.id.toString() === id);

	
	if (!genre) {
		res.status(404).send("Can't find the requested genre.")
		return
	}
	
	const updatedGenre = {
		"id": req.params.id,
		"title": req.body.title
	}

	const {error} = validateData(req);
	if (error) return res.send(`Error: ${error.details[0].message}`);

	const index = genres.indexOf(genre);
	genres.splice(index, 1, updatedGenre);

	res.send(genres[index]);
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