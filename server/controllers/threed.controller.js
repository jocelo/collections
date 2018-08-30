const ThreeDModel = require('../models/threed.model');

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details for images model creation"
    });
  }

  // add an entry to the Images collection
  const threeDModel = new ThreeDModel({
    collection_id: req.body.collId
  });

  threeDModel.save()
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message || "Error while saving the 3D model."
    });
  });
}

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details for 3d model update"
    });
  }

  console.log('req.body', req.body);
  console.log('req.params', req.params);

  /*
  ThreeDModel.findByIdAndUpdate(req.params.collId, {
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
  */
}