import cartDAO from '../dao/cart.dao.js';

export default {
  getById: id => cartDAO.getById(id),
  create: () => cartDAO.create(),
  update: (id, data) => cartDAO.update(id, data)
};
