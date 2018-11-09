const Image = require('../models/image.model');
const mongoose = require('mongoose');

exports.add = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details for image creation"
    });
  }

  // add an entry to the new Collection
  const image = new Image({
    collection_id: req.body.collection || '',
    user_id: 1,
    public_id: req.body.public_id,
  });

  image.save()
  .then(data=>{
    res.send({
      id: data._id,
      collection_id: data.collection_id,
      public_id: data.public_id
    });
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message || "Error while saving the image."
    });
  });
}

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details for collection update"
    });
  }
}

exports.delete = (req, res) => {
  console.log('about to delete this item');
  if (!req.body) {
    return res.status(400).send({
      message: "ID sent for image deletion is not correct"
    });
  }

  Image.findOneAndDelete(req.body.imageId, function(err, img){
    if (err) return res.status(500).send(err);
    
    return res.status(200).send({
      message: `Image ${req.body.imageId} delete succesfully` 
    })
  })

  // console.log('ths was deleted!!!', req.body.imageId, img);
}

exports.getAll = (req, res) => {
  console.log('get all by user id');
  console.log('body:', req.params);

  Image.find()
  .then(data=>{
    res.json(data);
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message || "There was an error while retrieving all the images."
    });
  });
}
