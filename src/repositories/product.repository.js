import productDAO from '../dao/product.dao.js';

export default {
  getAll: () => productDAO.getAll(),
  create: data => productDAO.create(data),
  update: (id, data) => productDAO.update(id, data),
  delete: id => productDAO.delete(id),
  getById: id => productDAO.getById(id)
};
