const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AppDataSource } = require('../data-source');
const userRepository = AppDataSource.getRepository('User');

const registerUser = async(req, res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { firstname, lastname, username, password } = req.body;

	try{
		const existingUser = await userRepository.findOne({where: {username}});

		if(existingUser) {
			return res.status(409).json({ error: 'Username already exist' });
		};

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = userRepository.create({
			firstname, 
			lastname, 
			username, 
			password: hashedPassword
		});

		await userRepository.save(newUser);

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
		const userResult = await userRepository.findOne({where: {username}});

		if(!userResult) return res.status(401).json({ error: 'Invalid credentials' });

		const user = userResult;

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