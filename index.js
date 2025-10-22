const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const route = require('./Routes/products.route.js');
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/products', route)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the node API' });
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('server is running at http://localhost:3000');

    })
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});