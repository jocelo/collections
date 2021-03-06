const mongoose = require('mongoose');

const CollectionSchema = mongoose.Schema({
	id: Number,
	name: String,
	desc: String,
	category: String,
	release_date: { type: Date, default: Date.now },
	favorite: Boolean
}, {
	timestamps: true
});

module.exports = mongoose.model('Collection', CollectionSchema);