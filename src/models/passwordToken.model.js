import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  token: String,
  expiresAt: Date
});

export default mongoose.model('passwordTokens', schema);
