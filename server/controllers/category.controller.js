const Category = require('../models/category.model');

exports.create = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Category details cannot be empty"
		});
	}

	// create a new category
	const category = new Category({
		title: req.body.title || "Untitled category"
	});

	category.save()
		.then(data=>{
			res.send(data)
		})
		.catch(err=>{
			res.status(500).send({
				message: err.message || "There was an error while creating the Category."
			});
		});
}

exports.findAll = (req, res) => {
	Category.find()
		.then(cats=>{
			res.send(cats.map(cat=>{
				return {
					id: cat._id,
					title: cat.title
				}
			}))
		})
		.catch(err=>{
			res.status(500).send({
				message: err.message || "There was an error while retrieving all the Categories."
			});
		});
}

exports.findOne = (req, res) => {
	Category.findById(req.params.catID)
		.then(cat=>{
			if (!cat) {
				return res.status(404).send({
					message: `Category not found with id: ${req.params.catID}`
				});
			}
			res.send(cat);
		})
		.catch(err=>{
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: `Category not found with id: ${req.params.catID}`
				});
			}
			return res.status(500).send({
				message: `There was an error while retrieving the Category with id: ${req.params.catID}`
			});
		});
}

exports.update = (req, res) => {
	if(!req.body.content) {
		return res.status(400).send({
			message: "Category content cannot be empty."
		});
	}

	Category.findByIdAndUpdate(req.params.catID, {
		title: req.params.title
	}, {new: true})
	.then(cat=>{
		if (!cat) {
			return res.status(404).send({
				message: `Category not found with id ${catID}`
			});
		}
		res.send(cat);
	})
	.catch(err=>{
		if (err.kind === 'ObjectId') {
			return res.status(404).send({
				message: `Category not found with id: ${req.params.catID}`
			});
		}
		return res.status(500).send({
			message: `There was an error while attempting to update the Category with id: ${req.params.catID}`
		});
	});
}

exports.delete = (req, res) => {
	Category.findByIdAndRemove(req.params.catID)
		.then(cat=>{
			if (!cat) {
				return res.status(404).send({
					message: `Category not found with id ${catID}`
				});
			}
			res.send({
				message: 'Category delete successfully!'
			});
		})
		.catch(err=>{
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: `Category not found with id: ${req.params.catID}`
				});
			}
			return res.status(500).send({
				message: `There was an error while attempting to delete the Category with id: ${req.params.catID}`
			});
		});
}