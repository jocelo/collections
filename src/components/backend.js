const backend = {
	getAllCats: 'http://localhost:8000/categories/',
	addCategory: 'http://localhost:8000/category/',
	getCollections: 'http://localhost:8000/collections/',
	getCollection: 'http://localhost:8000/collection/',
	addCollection: 'http://localhost:8000/collection/',
	updateCollection:  'http://localhost:8000/collection/',
	deleteCollection: 'http://localhost:8000/collection/'
}

/*
const backend = {
	getAllCats: 'https://fathomless-river-72860.herokuapp.com/categories/',
	addCategory: 'http://localhost:8088/api/category',
	getCollections: 'https://fathomless-river-72860.herokuapp.com/collections/',
	getCollection: 'http://localhost:8088/api/collection',
	addCollection: 'http://localhost:8088/api/collection',
	updateCollection:  'http://localhost:8088/api/collection',
	deleteCollection: 'http://localhost:8088/api/collection'
}

*/

export default backend;