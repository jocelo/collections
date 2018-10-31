const Image = require('../models/image.model');

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

exports.update = (req, res)=> {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details for collection update"
    });
  }
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

exports.findOne = (req, res) => {

}

exports.delete = (req, res) => {

}