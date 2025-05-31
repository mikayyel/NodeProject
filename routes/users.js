const express = require('express');
const userRoutes = express.Router();
const {
	getUsers, 
	getUser, 
	createUser, 
	updateUser, 
	patchUser, 
	deleteUser
} = require('../controllers/userController');
const {
	createUserValidation,
	updateUserValidation,
	patchUserValidation
} = require('../validators/userValidators');

userRoutes.get('/', getUsers);
userRoutes.get('/:username', getUser);
userRoutes.post('/', createUserValidation, createUser);
userRoutes.put('/:username', updateUserValidation, updateUser);
userRoutes.patch('/:username', patchUserValidation, patchUser);
userRoutes.delete('/:username', deleteUser);

module.exports = userRoutes