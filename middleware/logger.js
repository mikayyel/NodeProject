const middlewareForConsoles = (req, res, next) => {
	const date = new Date().toISOString();

	console.log(`${req.path} ${req.method} ${date}`);

	next();
};

module.exports = middlewareForConsoles;