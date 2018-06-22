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
    category: req.body.category || '',
    release_date: req.body.release_date,
    favorite: false
  });

  collection.save()
  .then(data=>{
    res.send({
      id: data._id,
      name: data.name,
      desc: data.desc,
      category_name: data.category,
      favorite: data.favorite
    });
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message || "Error while saving the collection."
    });
  });
}

exports.update = (req, res)=> {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details for collection update"
    });
  }

  Collection.findByIdAndUpdate(req.params.collId, {
    name: req.body.name,
    desc: req.body.desc,
    release_date: req.body.release_date,
    category: req.body.category
  }, {new: true})
  .then(coll=>{
    if (!coll) {
      return res.status(404).send({
        message: `Collection not found with id ${req.params.collId}`
      });
    }
    res.send(coll);
  })
  .catch(err=>{
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Collection not found with id: ${req.params.collId}`
      });
    }
    return res.status(500).send({
      message: `There was an error while attempting to update the Collection with id: ${req.params.collId}`
    });
  });
}

exports.findAll = (req, res) => {
  Collection.find()
  .then(data=>{
    const distinctValues = [...new Set( data.map(item=>item.category) )];
    const resData = distinctValues.map(category=>({
        category_name: category,
        data: data.filter(element=>element.category === category).map(coll=>({
          id: coll._id,
          name: coll.name,
          desc: coll.desc,
          category_name: coll.category,
          favorite: coll.favorite,
          release_date: coll.release_date
        }))
      }
    ));

    res.json(resData);
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
      name: data.name || '',
      desc: data.desc || '',
      category_name: data.category,
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