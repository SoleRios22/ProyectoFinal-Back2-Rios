import { Router } from 'express';
import productRepo from '../repositories/product.repository.js';
import { auth } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

router.post('/', auth, authorize('admin'), async (req,res)=>{
  res.json(await productRepo.create(req.body));
});

router.put('/:id', auth, authorize('admin'), async (req,res)=>{
  res.json(await productRepo.update(req.params.id, req.body));
});

router.delete('/:id', auth, authorize('admin'), async (req,res)=>{
  res.json(await productRepo.delete(req.params.id));
});

export default router;
