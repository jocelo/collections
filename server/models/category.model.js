const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
	id: Number,
	title: String,
	active: {type: Boolean, default: true}
}, {
	timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);