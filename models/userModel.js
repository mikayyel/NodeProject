const {getUsersFromFile, saveUsersToFile} = require('../utils/fileHandler');

// Get user
const getUserByUsername = async(username) => {
	try{	
		const users = await getUsersFromFile();
		const foundUser = users.find(user => user.username === username);
		return foundUser || null;
	}catch(error) {
		console.log(`Error reading user from file: ${error}`);
		return null;
	};
};

// Save user
const saveUser = async(newUser) => {
	try{
		const users = await getUsersFromFile();
		users.push(newUser);
		await saveUsersToFile(users);
		return newUser;
	}catch(error) {
		console.log(`Error saving user to file ${error}`);
		throw error;
	};
};

// Update user (method => put)
const updateUserByUsername = async(username, updatedUser) => {
	try{	
		const users = await getUsersFromFile();
		const newUsers = users.map(user => user.username === username ? updatedUser : user);
		await saveUsersToFile(newUsers);

		return updatedUser;
	}catch(error){
		console.log(`Error updating user ${error}`);
		throw error;
	};
};

// Update user (method => patch)
const patchUserByUsername = async(username, patchData) => {
	const users = await getUsersFromFile();
	const newUsers = users.map(user => user.username === username ? {...user, ...patchData} : user);
	await saveUsersToFile(newUsers);
};

const deleteUserByUsername = async(username) => {
	const users = await getUsersFromFile();
	const newUsers = users.filter(user => user.username !== username);
	await saveUsersToFile(newUsers);
};

module.exports = {
	getUsersFromFile,
	getUserByUsername,
	saveUser,
	updateUserByUsername,
	patchUserByUsername,
	deleteUserByUsername
};