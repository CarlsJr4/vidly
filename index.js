// Prompt: Vidly is an imaginary service for renting movies
// Build the back-end for managing the list of genres
// http://vidly.com/api/genres

// Endpoint for all genres
// CRUD genres (GET, POST, PUT, DELETE)
// Create a fake database object here. An array
// Create routes here and route handlers
// Input validation
// Returned data should be in JSON format (i.e. {"userId": 1, "id": 1})
// Remember that some values might need to be parsed (i.e. parseInt(string));

const express = require('express');
const Joi = require('@hapi/joi');

const app = express();
const port = 3000;

app.use(express.json());

// How should we define this array? What fields should we use?
// According to placeholder JSON, should have an ID and title?
let genres = [
	{"id": 1, "title": "Horror"},
	{"id": 2, "title": "Action"},
	{"id": 3, "title": "Sci-Fi"},
	{"id": 4, "title": "Romance"},
	{"id": 5, "title": "Thriller"}
];

app.get('/', (req, res) => {
	res.send('Welcome to vidly!');
});


app.get('/api/genres', (req, res) => {
	res.send(genres);
});


app.get('/api/genres/:id', (req, res) => {
	const id = req.params.id;
	const genre = genres.find(genre => genre.id.toString() === id);
	// Returns error and ends function if route doesnt exist
	if (!genre) {
		res.status(404).send('404 error. The genre you searched for does not exist.');
		return
	}
	res.send(genre);
});


// POST request
app.post('/api/genres/', (req, res) => {
	const newId = genres.length + 1; // Normally, the database creates this ID for you. This code could cause bugs in real life.
	// Need a way to authenticate that the data was sent correctly
	if (!req.body.title || req.body.title.length <= 3) {
		res.send('Must specify title or have title be longer than 3 characters.');
		return
	}
	genres.push({
		"id": newId,
		"title": req.body.title
	});

	// Need to return the posted genre.
	const genre = genres.find(genre => genre.title === req.body.title);
	res.send(genre);
});


// PUT request
app.put('/api/genres/:id', (req, res) => {
	// For a put request, we are updating data on the server
	// We need to specify the ID and the new title
	// Use an array method to directly update this array 
	res.send('PUT request sent');
})


app.listen(port, () => {console.log(`Listening on port ${port}`)});

// Build a route
// Have the route return all the genres
// Have a route return a specific genre
	// Call using the ID, should return an object
// Now, create POST, PUT, DELETE requests