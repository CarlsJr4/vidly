// PROJECT: Refactor this app to utilize a local MongoDB server!
const express = require('express');
const genres = require('./routes/genres');

// Use Express to define routes
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use('/api/genres', genres);

app.get('/', (req, res) => {
	res.send('Welcome to vidly!');
});

app.listen(port, () => {console.log(`Listening on port ${port}`)});



