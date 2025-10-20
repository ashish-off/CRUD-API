const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products.model.js')
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the node API' });
})

// CREATE a product 
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

// READ all items
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
})


// READ by id
app.get('/api/product/:id', async (req, res) => {
    const { id } = req.params;

    // not a 24-character hexadecimal string
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product id format' });
    }

    try {
        const product = await Product.findById(id);
        // upon returning null
        if (!product) {
            return res.status(404).json({ message: `Product with id ${id} not found` });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// update a product

app.put("/api/product/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: `Product with id ${id} not found` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

mongoose.connect('mongodb+srv://ashishsaud498_db_user:wyRUArsqXznQHyKz@backenddb.v6eba3w.mongodb.net/Node-API').then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('server is running at http://localhost:3000');

    })
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});