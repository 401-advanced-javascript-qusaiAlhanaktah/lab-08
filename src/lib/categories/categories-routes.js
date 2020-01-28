'use strict';

const express = require('express');
const categories = require('./categories-model.js');

const router = express.Router();

router.get('/categories', getCategories);
router.post('/categories', addCategories);
router.put('/categories/:id', updateCategories);
router.delete('/categories/:id', deleteCategories);

function getCategories(req, res, next) {
    categories.get()
        .then(data => {
            res.status(200).json(data);
        }).catch(next);
}
function addCategories(req, res, next) {
    categories.create(req.body)
    .then(data=>{
        res.status(201).json(data);
    })
}
function updateCategories(req,res,next){
    categories.update(req.body._id, req.body)
    .then(data=>{
        res.status(200).json(data);
        })
}    

function deleteCategories(req,res,next){
    categories.delete(req.params._id)
    .then(data=>{
        res.status(200).json(data);
        })
}
module.exports = router;