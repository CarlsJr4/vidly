// Build the customers API
// What we need:
const express = require('express');
const router = express.Router();

//  Route: vidly/api/customers. Need to build the routes for this.
router.get('/', (req, res) => {
	res.send('Here are vidlys customers!.');
});
//  Search for customer by ID

// Schema, model, class 
// CRUD operations
// Validation

// NOTE: The name doesn't matter because we import the whole module anyways
module.exports = router;