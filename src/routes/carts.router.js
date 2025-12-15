import { Router } from 'express';
import cartRepo from '../repositories/cart.repository.js';
import { auth } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { purchaseCart } from '../services/purchase.service.js';

const router = Router();

router.post('/:cid/purchase', auth, authorize('user'), async (req,res)=>{
  const cart = await cartRepo.getById(req.params.cid);
  const ticket = await purchaseCart(cart, req.user.email);
  res.json(ticket);
});

export default router;
