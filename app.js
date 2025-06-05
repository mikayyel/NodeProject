require('dotenv').config(); 
const express = require('express');
const app = express();
const pool = require('./db'); 
const { swaggerUi, swaggerSpec } = require('./swaggerConfig');

const userRoutes = require('./routes/users');

const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(require('./middleware/logger')); 

pool.query('SELECT NOW()')
  .then(result => console.log('Connected to DB. Current time:', result.rows[0].now))
  .catch(err => console.error('DB connection failed:', err));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});