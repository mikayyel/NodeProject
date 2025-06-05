const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db');

const registerUser = async(req, res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { firstname, lastname, username, password } = req.body;

	try{
		const existingUser = await pool.query(
			'SELECT * FROM users WHERE username = $1',
			[username]
		);

		if(existingUser.rows.length > 0) {
			return res.status(409).json({ error: 'Username already exist' });
		};

		const hashedPassword = await bcrypt.hash(password, 10);

		await pool.query(
			'INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)',
			[firstname, lastname, username, hashedPassword]
		);

		return res.status(201).json({ message: 'User registered successfully' });
	}catch(error) {
		console.log('Registered error', error);
		return res.status(500).json({ error: 'Server error during registration' });
	};
};

const logInUser = async(req, res) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { username, password } = req.body;

	try{
		const userResult = await pool.query(
			'SELECT * FROM users WHERE username = $1',
			[username]
		);

		if(userResult.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

		const user = userResult.rows[0];

		const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

		const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during login' });
  }
}

module.exports = {
	registerUser,
	logInUser
};