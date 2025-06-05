const pool = require('../db');

// Get All USers
const getAllUsers = async() => {
	const result = await pool.query('SELECT * FROM users');
	return result.rows;
};

// Get User By Username
const getUserByUsername = async(username) => {
	const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	return result.rows[0];
};

// Create A New USer
const saveUser = async(user) => {
	const { firstname, lastname, username, password } = user;
	await pool.query(
		'INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)',
		[firstname, lastname, username, password]
	);
};

// Update User (method => put)
const updateUserByUsername = async(oldUsername, newData) => {
	const { firstname, lastname, username, password } = newData;
	await pool.query(
		'UPDATE users SET firstname = $1, lastname = $2, username = $3, password = $4 WHERE username = $5',
		[firstname, lastname, username, password, oldUsername]
	);
};

// Update User (Method => patch)
const patchUserByUsername = async(username, newData) => {
	const fields = Object.keys(newData);                  
  const values = Object.values(newData);                

  const setClause = fields                              
    .map((field, index) => `${field} = $${index + 1}`)
    .join(', ');

  const query = `UPDATE users SET ${setClause} WHERE username = $${fields.length + 1}`; 

  await pool.query(query, [...values, username]);
};

// Delete user
const deleteUserByUsername = async(username) => {
	await pool.query('DELETE FROM users WHERE username = $1', [username]);
};

module.exports = {
	getAllUsers,
	getUserByUsername,
	saveUser,
	updateUserByUsername,
	patchUserByUsername,
	deleteUserByUsername
};