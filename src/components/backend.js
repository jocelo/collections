const serverUrl = 'http://localhost:8088/api';
const backend = {
	getAllCats: 'http://localhost:8088/api/categories/',
	addCategory: 'http://localhost:8088/api/category/',
	getCollections: 'http://localhost:8088/api/collections/',
	collection: 'http://localhost:8088/api/collection',
	addCollection: 'http://localhost:8088/api/collection/',
	updateCollection:  'http://localhost:8088/api/collection/',
	deleteCollection: 'http://localhost:8088/api/collection/',
	addFollower: `${serverUrl}/follower/add`,
	removeFollower: `${serverUrl}/follower/remove`,
	getFollowers: `${serverUrl}/followers`,
	getDefaultUsersToFollow: `${serverUrl}/default`,
	getPictures: `${serverUrl}/pictures`,
	addPicture: `${serverUrl}/picture`,
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