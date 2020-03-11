const express = require('express');
const Joi = require('@hapi/joi');

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


function validateData(req) {
	const schema = Joi.object({
		title: Joi.string()
			.min(3)
			.required()
	});

	return schema.validate(req.body);
}

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

	const {error} = validateData(req);
	if (error) return res.send(`Error: ${error.details[0].message}`);

	const index = genres.indexOf(genre);
	genres.splice(index, 1, updatedGenre);

	res.send(genres[index]);
});


// DELETE request
app.delete('/api/genres/:id', (req, res) => {
	const id = req.params.id;
	const genre = genres.find(genre => genre.id.toString() === id);

	if (!genre) return res.status(404).send("Can't find the requested genre.");

	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.send(genres);
});


app.listen(port, () => {console.log(`Listening on port ${port}`)});
