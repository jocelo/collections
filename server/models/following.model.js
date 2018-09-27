const mongoose = require('mongoose');

const FollowPerson = mongoose.Schema({
	id: Number,
	user_id: Number,
	following_user_id: Number,
}, {
	timestamp: true
});

module.exports = mongoose.model('FollowingModel', FollowPerson);