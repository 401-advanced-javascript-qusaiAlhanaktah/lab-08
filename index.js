'use strict';

const mongoose = require('mongoose');
const server = require('./src/server.js');

const MONOGDB_CATEGORIES_URI = 'mongodb://localhost:27017/categories-db';
const MONOGDB_PRODUCTS_URI = 'mongodb://localhost:27017/products-db';

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
  mongoose.connect(MONOGDB_CATEGORIES_URI, mongooseOptions);
  mongoose.connect(MONOGDB_PRODUCTS_URI, mongooseOptions);

server.start();