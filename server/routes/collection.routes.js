module.exports = app =>{
	const collections = require('../controllers/collection.controller');

	app.get('/api/collections', collections.findAll);

	app.post('/api/collection', collections.create);
};