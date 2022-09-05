const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
