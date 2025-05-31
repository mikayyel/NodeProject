# User Management REST API

## Overview

This project is a backend REST API for managing users, built with **Node.js** and **Express.js**, and storing data in a local `users.json` file (simulating a database). It supports full **CRUD operations**, input **validation**, and a modular structure for clean, maintainable code.

## Features

### CRUD Operations
- **GET /users** – Fetch all users
- **GET /users/:username** – Fetch a single user by username
- **POST /users** – Create a new user
- **PUT /users/:username** – Update a user completely (all fields required)
- **PATCH /users/:username** – Partially update a user (some fields optional)
- **(DELETE /users/:username)** – (Commented out, but ready to implement)

### Validation with `express-validator`
- Required fields: `firstname`, `lastname`, `username`, `password`
- No spaces allowed in any fields
- Password must include at least one number
- For `PUT`, all fields are required; for `PATCH`, only provided fields are validated

### File-Based Data Persistence
- User data is stored in a local `users.json` file
- Handled with a utility file (`userModel.js`) to read, write, and manipulate JSON data

## Core Technologies Used
- **Node.js**
- **Express.js**
- **express-validator**
- **fs/promises** – File handling with async/await
- **Postman** – API testing
