import { Router } from 'express';
import passport from 'passport';
import { registerUser, loginUser } from '../services/auth.service.js';
import { userToDTO } from '../services/dto.service.js';

const router = Router();

router.get('/login', (req,res)=>res.render('login'));
router.get('/register', (req,res)=>res.render('register'));

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/current',
  passport.authenticate('current',{session:false}),
  (req,res)=>res.json({ user: userToDTO(req.user) })
);

export default router;
