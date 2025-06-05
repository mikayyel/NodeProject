
# User Management REST API

## Overview

This project is a backend REST API for managing users, built with **Node.js**, **Express.js**, and **PostgreSQL**. It supports full **CRUD operations**, input **validation**, and uses **Docker** for easy PostgreSQL setup.

---

## Features

### CRUD Endpoints

- **GET /users** – Fetch all users
- **GET /users/:username** – Fetch a single user by username
- **POST /users** – Create a new user
- **PUT /users/:username** – Update a user completely (all fields required)
- **PATCH /users/:username** – Partially update a user (some fields optional)
- **DELETE /users/:username** – Delete a user

### Validation with `express-validator`

- Fields: `firstname`, `lastname`, `username`, `password`
- No spaces allowed in any fields
- Password must contain at least one number
- `PUT`: all fields required  
- `PATCH`: only provided fields validated

---

## Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **express-validator**
- **Docker** & **docker-compose**
- **Swagger** – API documentation
- **pg** – PostgreSQL client for Node.js

---

## Step-by-Step: Run the App Locally

### 1. Clone the Repository

```bash
git clone https://github.com/mikayyel/NodeProject.git
cd NodeProject
```

---

### 2. Install Node.js Dependencies

```bash
npm install
```

---

### 3. Set Up `.env` File

Copy the example file and fill in your actual PostgreSQL values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=your_database_name
```

You should replace yourSuperSecretKey with a secure, randomly generated string.
Generate it using:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
---

### 4. Start PostgreSQL via Docker

Make sure **Docker Desktop** is running, then:

```bash
docker-compose up -d
```

This starts PostgreSQL container with volume persistence.

```bash
docker cp init.sql my_postgres:/init.sql
```

---

### 5. Create PostgreSQL Table

Run the following to execute the SQL file and create the `users` table:

```bash
docker exec -it my_postgres psql -U myuser -d postgres -f /init.sql
```
replace myuser with your PostgreSQL username from .evn 

---

### 6. Start the Server

```bash
node app.js
```

> App should now be running at:  
> `http://localhost:3000`

---

### 7. API Documentation (Swagger)

Go to:

```
http://localhost:3000/api-docs
```

To view and test the API via Swagger UI.

---

## ⚠️ Important Notes

- Ensure PostgreSQL table is created before testing the API.

---

## Ready!

You're now fully set up to develop and test the app locally with PostgreSQL using Docker.
