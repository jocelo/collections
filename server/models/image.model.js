const mongoose = require('mongoose');

const ImageModelSchema = mongoose.Schema({
  id: Number,
  collection_id: String,
  user_id: Number,
  public_id: String
}, {
  timestamps: true
});

module.exports = mongoose.model('ImageModelSchema', ImageModelSchema);