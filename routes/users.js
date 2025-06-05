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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Failed to load users
 */
userRoutes.get('/', getUsers);

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Get a user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 *       500: 
 *         description: Failed to load user
 */
userRoutes.get('/:username', getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstname, lastname, username, password]
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation or duplicate error
 *       409:
 *         description: User already exist
 *       500: 
 *         description: Failed to create user
 */
userRoutes.post('/', createUserValidation, createUser);

/**
 * @swagger
 * /users/{username}:
 *   put:
 *     summary: Fully update a user
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstname, lastname, username, password]
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400: 
 *         description: Validation or duplicate error
 *       404:
 *         description: User not found
 *       409: 
 *         description: User already exist
 *       500: 
 *         description: Failed to update user
 */
userRoutes.put('/:username', updateUserValidation, updateUser);

/**
 * @swagger
 * /users/{username}:
 *   patch:
 *     summary: Partially update a user
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400: 
 *         description: Validation or duplicate error
 *       404:
 *         description: User not found
 *       409: 
 *         description: User already exist
 *       500: 
 *         description: Failed to update user
 */
userRoutes.patch('/:username', patchUserValidation, patchUser);

/**
 * @swagger
 * /users/{username}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */
userRoutes.delete('/:username', deleteUser);

module.exports = userRoutes