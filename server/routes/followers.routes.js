module.exports = app => {
	const followers = require('../controllers/following.controller');

	app.get('/api/followers', followers.getFollowers);

	app.get('/api/default', followers.getDefaultUsers);

	app.post('/api/addFollower', followers.addFollower);

	// app.get('/api/following', followers.getListFollowingPeople);
	
	// app.post('/api/follow', followers.addFollow);
}