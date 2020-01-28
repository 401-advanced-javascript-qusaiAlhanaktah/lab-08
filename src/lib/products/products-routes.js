'use strict';

const express = require('express');
const products = require('./products-model.js');

const router = express.Router();

router.get('/products', getProducts);
router.post('/products', addProducts);
router.put('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts);

function getProducts(req, res, next) {
    products.get()
        .then(data => {
            res.status(200).json(data);
        }).catch(next);
}
function addProducts(req, res, next) {
    products.create(req.body)
        .then(data => {
            res.status(201).json(data);
        })
}
function updateProducts(req, res, next) {
    products.update(req.body._id, req.body)
        .then(data => {
            res.status(200).json(data);
        })
}
function deleteProducts(req, res, next) {
    console.log('req body delete:', req.body);
    products.delete(req.params._id)
        .then(data => {
            res.status(200).json(data);
        });
}
module.exports = router;