module.exports = app =>{
	const categories = require('../controllers/category.controller');

	app.post('/category', categories.create);

	app.get('/categories', categories.findAll);

	app.get('/category/:catID', categories.findOne);

	app.put('/category/:catID', categories.update);

	app.delete('/category/:catID', categories.delete);
};