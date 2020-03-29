module.exports = function asyncMiddleware(handler) {
	return async function(req, res, next) { 
		try {
			// This part will vary by route handler
			await handler(req, res); // We have to use await here because the callback does async work
		}
		catch(ex) {
			next(ex);
		}
	}
}