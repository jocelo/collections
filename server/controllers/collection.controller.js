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
    desc: req.body.description || '',
    release_date: req.body.release_date,
    favorite: false
  });

  console.log('collection taht is goig to be saved:', collection);

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
    res.json(data.map(col=>{
      return {
        id: col._id,
        name: col.name,
        desc: col.desc || '',
        favorite: col.favorite
      }
    }));
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message || "There was an error while retrieving all the Collections."
    });
  });
}

exports.findOne = (req, res) => {
  Collection.findById(req.params.collId)
  .then(data=>{
    res.json({
      id: data._id,
      name: data.name,
      desc: data.desc,
      release_date: data.release_date,
      favorite: data.favorite
    });
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message || "There was an error while retrieving the Collection."
    });
  });
}

exports.delete = (req, res) => {
  Collection.findByIdAndRemove(req.params.collId)
  .then(cat=>{
    if (!cat) {
      return res.status(404).send({
        message: `Collection not found with id ${collId}`
      });
    }
    res.send({
      status: 200,
      message: 'Collection deleted successfully!'
    });
  })
  .catch(err=>{
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: `Collection not found with id: ${req.params.collId}`
      });
    }
    return res.status(500).send({
      message: `There was an error while attempting to delete the Collection with id: ${req.params.collId}`
    });
  });
}