import User from '../models/user.model.js';

export default {
  getByEmail: email => User.findOne({ email }),
  getById: id => User.findById(id),
  create: data => User.create(data),
  updatePassword: (id, password, lastPasswords) =>
    User.findByIdAndUpdate(id, { password, lastPasswords })
};
