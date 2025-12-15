import userDAO from '../dao/user.dao.js';

export default {
  getUserByEmail: email => userDAO.getByEmail(email),
  createUser: data => userDAO.create(data),
  getUserById: id => userDAO.getById(id),
  updatePassword: (id, password, lastPasswords) =>
    userDAO.updatePassword(id, password, lastPasswords)
};
