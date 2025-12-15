import { Router } from 'express';
import crypto from 'crypto';
import userRepo from '../repositories/user.repository.js';
import PasswordToken from '../models/passwordToken.model.js';
import { sendRecoveryMail } from '../services/mail.service.js';
import { hashPassword } from '../utils/bcrypt.js';

const router = Router();

router.post('/recover', async (req,res)=>{
  const user = await userRepo.getUserByEmail(req.body.email);
  if (!user) return res.json({ ok:true });

  const token = crypto.randomBytes(20).toString('hex');
  await PasswordToken.create({
    userId: user._id,
    token,
    expiresAt: Date.now() + 3600000
  });

  await sendRecoveryMail(user.email, token);
  res.json({ ok:true });
});

router.post('/reset/:token', async (req,res)=>{
  const record = await PasswordToken.findOne({ token: req.params.token });
  if (!record || record.expiresAt < Date.now())
    return res.status(400).json({ error:'Token inválido' });

  const user = await userRepo.getUserById(record.userId);
  const newHash = hashPassword(req.body.password);

  if (user.lastPasswords?.includes(newHash))
    return res.status(400).json({ error:'No repetir contraseña' });

  await userRepo.updatePassword(user._id, newHash, [...user.lastPasswords, user.password]);
  await record.deleteOne();
  res.redirect('/api/sessions/login');
});

export default router;
