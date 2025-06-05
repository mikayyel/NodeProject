const { body } = require('express-validator');

const registerUserValidation = [
		body('firstname')
		.notEmpty().withMessage('Firstname is required')
		.custom(value => {
			if(/\s/.test(value)) {
				throw new Error('Firstname must not contain spaces');
			};

			return true;
		}),
	body('lastname')
		.notEmpty().withMessage('Lastname is required')
		.custom(value => {
			if(/\s/.test(value)) {
				throw new Error('Lastname must not contain spaces');
			};

			return true;
		}),
	body('username')
		.notEmpty().withMessage('Username is required')
		.custom(value => {
			if(/\s/.test(value)) {
				throw new Error('Username must not contain spaces');
			};

			return true;
		}),
	body('password')
		.notEmpty().withMessage('Password is required')
		.custom(value => {
			if(/\s/.test(value)) {
				throw new Error('Password must not contain spaces');
			};

			if(!/\d/.test(value)) {
				throw new Error('Password must contain a number');
			};

			return true;
		}),
];

const logInUserValidation = [
	body('username')
		.notEmpty().withMessage('Username is required'),
	body('password')
		.notEmpty().withMessage('Password is required')
];

module.exports = {
	registerUserValidation,
	logInUserValidation
};