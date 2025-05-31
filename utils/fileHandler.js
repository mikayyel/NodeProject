const fs = require('fs').promises;
const path = require('path');

const userFilePath = path.join(__dirname, '..', 'data', 'user.json');

// Read
const getUsersFromFile = async() => {
	try{
		const data = await fs.readFile(userFilePath, 'utf-8');
		return JSON.parse(data || []);
	}catch(error) {
		console.log(`Error reading users file: ${error}`);
		return [];
	};
};

// Write
const saveUsersToFile = async(users) => {
	try{
		await fs.writeFile(userFilePath, JSON.stringify	(users, null, 2), 'utf-8');
	}catch(error) {
		console.log(`Error saving users to file: ${error}`);
		throw error;
	};
};

module.exports = {
	getUsersFromFile,
	saveUsersToFile
};