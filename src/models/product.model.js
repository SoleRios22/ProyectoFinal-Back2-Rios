import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String
});

export default mongoose.model('products', schema);
