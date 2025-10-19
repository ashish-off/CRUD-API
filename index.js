const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World');
})

mongoose.connect('mongodb+srv://ashishsaud498_db_user:wyRUArsqXznQHyKz@backenddb.v6eba3w.mongodb.net/Node-API').then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('server is running at http://localhost:3000');
        
    })
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});