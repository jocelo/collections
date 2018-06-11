module.exports = app =>{
	const categories = require('../controllers/category.controller');

	app.post('/api/category', categories.create);

	app.get('/api/categories', categories.findAll);

	app.get('/api/category/:catID', categories.findOne);

	app.put('/api/category/:catID', categories.update);

	app.delete('/api/category/:catID', categories.delete);
};