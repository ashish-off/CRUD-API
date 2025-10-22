const Product = require('../models/products.model.js');
const mongoose = require('mongoose');

// CREATE a product 
const postProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

// READ all items
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

// READ by id
const getProduct = async (req, res) => {
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
}

// update a product

const putProduct = async (req, res) => {
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
}

// delete a product

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: `Product with id ${id} not found` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { postProduct, getProducts, getProduct, putProduct, deleteProduct }