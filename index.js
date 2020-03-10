const express = require('express');
// const Joi = require('@hapi/joi');

// FINAL STEP:
// Refactor the code to be more DRY

const app = express();
const port = 3000;

app.use(express.json());

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

	if (!req.body.title) {
		res.status(400).send("You must include the title of the genre.")
		return
	}

	const index = genres.indexOf(genre);
	genres.splice(index, 1, updatedGenre);

	res.send(genres[index]);
});


// DELETE request
app.delete('/api/genres/:id', (req, res) => {
	// DELETE should be pretty straightforward
	// Almost the same as PUT, but splice without replacing anything
	const id = req.params.id;
	const genre = genres.find(genre => genre.id.toString() === id);

	if (!genre) {
		res.status(404).send("Can't find the requested genre.")
		return
	}

	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.send(genres);
});


app.listen(port, () => {console.log(`Listening on port ${port}`)});
