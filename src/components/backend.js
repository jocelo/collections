const serverUrl = 'http://localhost:8088/api';
const backend = {
	getAllCats: 		`${serverUrl}/categories/`,
	addCategory: 		`${serverUrl}/category/`,
	getCollections: `${serverUrl}/collections/`,
	collection: 		`${serverUrl}/collection`,
	addCollection: 	`${serverUrl}/collection/`,
	updateCollection:  	`${serverUrl}/collection/`,
	deleteCollection: 	`${serverUrl}/collection/`,
	addFollower: 		`${serverUrl}/follower/add`,
	removeFollower: `${serverUrl}/follower/remove`,
	getFollowers: 	`${serverUrl}/followers`,
	getDefaultUsersToFollow: `${serverUrl}/default`,
	getPictures: 		`${serverUrl}/pictures`,
	addPicture: 		`${serverUrl}/picture`,
	deletePicture: 	`${serverUrl}/picture/delete`
}

export default backend;