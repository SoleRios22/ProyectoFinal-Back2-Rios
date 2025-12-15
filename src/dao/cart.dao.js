import Cart from '../models/cart.model.js';

export default {
  getById: id => Cart.findById(id).populate('products.product'),
  create: () => Cart.create({ products: [] }),
  update: (id, data) => Cart.findByIdAndUpdate(id, data)
};
