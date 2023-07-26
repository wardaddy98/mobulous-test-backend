import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const productSchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },

  name: {
    type: String,
  },

  originalPrice: {
    type: Number,
  },

  discountedPrice: {
    type: Number,
  },
});

export const Product = mongoose.model('products', productSchema);
