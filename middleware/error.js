module.exports = function(err, req, res, next) {
	console.error(`Something failed: ${err.message}`);
	res.status(500).send('Something failed!')
}