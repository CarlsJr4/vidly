// PROJECT: Refactor this app to utilize a local MongoDB server!

const express = require('express');

// To use the new routes, we first need to import the router
const genres = require('./routes/genres');

const app = express();
const port = 3000;

// Because we don't provide a path, the app uses a built-in middleware function
app.use(express.json());

// Then, we need to specify it as middleware in our app
// Specify the route as middleware. app.use(path, callback)
// Our exported router object acts like a callback function?
app.use('/api/genres', genres);

app.get('/', (req, res) => {
	res.send('Welcome to vidly!');
});


app.listen(port, () => {console.log(`Listening on port ${port}`)});
