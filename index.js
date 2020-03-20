// PROJECT: Refactor this app to utilize a local MongoDB server!
// What if we move all this Mongoose stuff to where data is actually processed?
const express = require('express');
const genres = require('./routes/genres');
// Import mongoose
const mongoose = require('mongoose');

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


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vidly', {useNewUrlParser: true, useUnifiedTopology: true});

// Listen for successful connection or failure
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('Connected to vidly database...')});

// Create a database schema (define data types)
// NOTE: _id is assigned by default by Mongoose
const genreSchema = new mongoose.Schema({
	title: String
});

// Compile your schema into a model where documents are derived from
const Genre = mongoose.model('Genre', genreSchema);

// Now, we need to create new documents using Mongoose's CRUD methods
// Genre.find({title: "Aliens"}, (err, arr) => {console.log(arr)});

// Export this model so we can call methods on it
// Why can't I call methods on the exported Genre?
// Do I just have to call all my methods here?
module.exports = Genre;

// Create a test document and save it to MongoDB
// const genre = new Genre({title: "Aliens"});
// genre.save().then(genre => {console.log(genre)});





