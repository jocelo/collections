const Collection = require('../models/collection.model');

exports.create = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Missing details for collection creation"
		});
	}

	// add an entry to the new Collection
	const collection = new Collection({
		name: req.body.name || "no_name",
		release_date: req.body.release_date || Date.now,
		favorite: false
	});

	collection.save()
		.then(data=>{
			res.send(data);
		})
		.catch(err=>{
			res.status(500).send({
				message: err.message || "Error while saving the collection."
			});
		});
}

exports.findAll = (req, res) => {
	Collection.find()
		.then(data=>{
			let result = data.map(col=>{
				return {
					id: col._id,
					name: col.name,
					favorite: col.favorite
				}
			});
			res.json(result);
		})
		.catch(err=>{
			res.status(500).send({
				message: err.message || "There was an error while retrieving all the Categories."
			});
		});
}