const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

// Import mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vidly', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// Listen for successful connection or failure
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('Connected to vidly database...')});

// Use Express to define routes
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

app.get('/', (req, res) => {
	res.send('Welcome to vidly!');
});

app.listen(port, () => {console.log(`Listening on port ${port}`)});



