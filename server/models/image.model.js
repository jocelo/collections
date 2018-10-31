const mongoose = require('mongoose');

const ImageModel = mongoose.Schema({
  id: Number,
  collection_id: String,
  user_id: Number,
  public_id: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Image', ImageModel);