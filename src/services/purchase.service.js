import Ticket from '../models/ticket.model.js';
import { v4 as uuid } from 'uuid';

export const purchaseCart = async (cart, userEmail) => {
  let total = 0;

  cart.products.forEach(p => {
    if (p.product.stock >= p.quantity) {
      p.product.stock -= p.quantity;
      total += p.product.price * p.quantity;
      p.product.save();
    }
  });

  return Ticket.create({
    code: uuid(),
    amount: total,
    purchaser: userEmail
  });
};
