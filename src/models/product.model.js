const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: false,
  },
}, 
{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;