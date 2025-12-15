import Product from '../models/product.model.js';

export default {
  getAll: () => Product.find(),
  create: data => Product.create(data),
  update: (id, data) => Product.findByIdAndUpdate(id, data),
  delete: id => Product.findByIdAndDelete(id),
  getById: id => Product.findById(id)
};
