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
const app = express();
const port = 3000;

// How should we define this array? What fields should we use?
// According to placeholder JSON, should have an ID and title?
let genres = [
	{"id": 1, "title": "Horror"},
	{"id": 2, "title": "Action"},
	{"id": 3, "title": "Sci-Fi"},
	{"id": 4, "title": "Horror"},
	{"id": 5, "title": "Horror"}
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
		res.status(404).send('Genre does not exist');
		return
	}
	res.send(genre);
});

app.listen(port, () => {console.log(`Listening on port ${port}`)});

// Build a route
// Have the route return all the genres
// Have a route return a specific genre
	// Call using the ID, should return an object