import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
    immutable: true,
  },
});

userSchema.index({ email: 1 });

export const User = mongoose.model('users', userSchema);
