const { validationResult } = require('express-validator');
const {
	getAllUsers,
	getUserByUsername,
	saveUser,
	updateUserByUsername,
	patchUserByUsername,
	deleteUserByUsername
} = require('../models/userModel');

// Get Users
const getUsers = async(req, res) => { 
	try{
		const users = await getAllUsers();
		console.log('Loaded users:', users);
		return res.status(200).json(users);
	}catch(error) {
		console.error(`Error fetching users ${error}`);
		return res.status(500).json({ error: 'Failed to load users' });
	};
};

// Get User
const getUser = async(req, res) => {
	try{
		const user = await getUserByUsername(req.params.username);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		};

		return res.status(200).json(user);
	}catch(error){
		console.error(`Error fetching user ${error}`);
		return res.status(500).json({ error: 'Failed to load user' });
	};
};

// Create user
const createUser = async(req, res) => {
	const { username } = req.body;
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	};

	try{
		const isExist = await getUserByUsername(username);

		if(isExist) {
			return res.status(409).json({ error: 'User already exist' });
		};

		await saveUser(req.body);

		return res.status(201).json({ message: 'User created successfully!' });
	}catch(error) {
		console.error(`Error creating user: ${error.message}`);
		return res.status(500).json({ error: 'Failed to create user' });
	}
};

// Update user 
const updateUser = async(req, res) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	};

	try {
		const currentUsername = req.params.username;
		const newUsername = req.body.username;

		const users = await getAllUsers();

		const existingUser = users.find(user => user.username === currentUsername);
		if (!existingUser) {
			return res.status(404).json({ error: 'User not found' });
		};

		if (newUsername && newUsername !== currentUsername) {
			const duplicateUser = users.find(user => user.username === newUsername);
			if (duplicateUser) {
				return res.status(409).json({ error: 'Username already exists' });
			};
		};

		await updateUserByUsername(currentUsername, req.body);
		return res.status(200).json({ message: 'User updated successfully!' });
	}catch(error) {
		console.error(`Error updating user: ${error.message}`);
		return res.status(500).json({ error: 'Failed to update user' });
	};
};

// Patch user
const patchUser = async(req, res) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	};

	try{
		const isExist = await getUserByUsername(req.params.username);

		if(!isExist) {
			return res.status(404).json({ error: 'User not found' });
		};

		if(req.body.username) {
			const isUsernameExist = await getUserByUsername(req.body.username);

			if(isUsernameExist) {
				return res.status(409).json({ error: 'Username already exist' });
			};
		};

		await patchUserByUsername(req.params.username, req.body);
		return res.status(200).json({ message: 'User updated successfully!' });
	}catch(error) {
		console.error(`Error updating user: ${error.message}`);
		return res.status(500).json({ error: 'Failed to update user' });
	};
};

const deleteUser = async(req, res) => {
	try{
		const isExist = await getUserByUsername(req.params.username);

		if(!isExist) {
			return res.status(404).json({ error: 'User not found' });
		};

		deleteUserByUsername(req.params.username);

		return res.status(200).json({ message: 'User deleted successfully' });
	} catch(error) {
		console.log(`Error deleting user: ${error.message}`);
		return res.status(500).json({error: 'Failed to delete user'});
	};
};

module.exports = {
	getUsers, 
	getUser,
	createUser,
	updateUser,
	patchUser,
	deleteUser
};