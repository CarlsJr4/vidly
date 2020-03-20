// PROJECT: Refactor this app to utilize a local MongoDB server!
const express = require('express');
const genres = require('./routes/genres');

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

app.get('/', (req, res) => {
	res.send('Welcome to vidly!');
});

app.listen(port, () => {console.log(`Listening on port ${port}`)});



