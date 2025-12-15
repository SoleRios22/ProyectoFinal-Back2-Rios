import userRepo from '../repositories/user.repository.js';
import cartRepo from '../repositories/cart.repository.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from '../config/jwt.js';

export const registerUser = async (req,res) => {
  const { email, password, first_name, last_name } = req.body;
  const exists = await userRepo.getUserByEmail(email);
  if (exists) return res.status(400).json({ error:'Usuario existente' });

  const cart = await cartRepo.create();
  await userRepo.createUser({
    email,
    first_name,
    last_name,
    password: hashPassword(password),
    cart: cart._id
  });

  res.redirect('/api/sessions/login');
};

export const loginUser = async (req,res) => {
  const { email, password } = req.body;
  const user = await userRepo.getUserByEmail(email);
  if (!user || !comparePassword(password, user.password))
    return res.status(401).json({ error:'Credenciales inválidas' });

  const token = generateToken(user);
  res.json({ token });
};
