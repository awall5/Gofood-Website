const express = require('express');
const mongoDB = require('./db');
const cors = require('cors');
const app = express();

async function startServer() {
  await mongoDB(); // Wait for the MongoDB connection and data fetch

  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.options('*', cors());

  app.use(express.json());
  app.use('/api', require('./Routes/CreateUser'));
  app.use('/api', require('./Routes/DisplayData'));

  app.get('/', (req, res) => {
    res.send('Server is up and running!');
  });

  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
}

startServer();
