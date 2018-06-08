const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
	id: Number,
	title: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);