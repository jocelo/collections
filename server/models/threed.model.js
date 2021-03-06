const mongoose = require('mongoose');

const Image3DModelSchema = mongoose.Schema({
  id: Number,
  collection_id: Number,
  front_img: { data: Buffer, contentType: String },
  back_img: { data: Buffer, contentType: String },
  left_img: { data: Buffer, contentType: String },
  right_img: { data: Buffer, contentType: String },
  top_img: { data: Buffer, contentType: String },
  bottom_img: { data: Buffer, contentType: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Image3DModelSchema', Image3DModelSchema);