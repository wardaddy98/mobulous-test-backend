import _ from 'lodash';
import { Product } from '../../models/product.model.js';
import { handleResponse } from '../../utils/handleResponse.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}, { __v: 0 }).lean();

    return handleResponse(res, {
      type: 'SUCCESS',
      message: 'Products loaded successfully',
      body: {
        products,
      },
    });
  } catch (err) {
    return handleResponse(res, {
      type: 'ERROR',
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const payload = req.body;

    await Product.create(payload);

    return handleResponse(res, {
      type: 'SUCCESS',
      message: 'Product added successfully',
    });
  } catch (err) {
    return handleResponse(res, {
      type: 'ERROR',
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const payload = req.body;

    const product = await Product.findById(productId).lean();

    if (_.isEmpty(product)) {
      return handleResponse(res, {
        type: 'BAD_REQUEST',
        message: 'Product does not exist',
      });
    }

    await Product.updateOne({ _id: productId }, { $set: payload });

    return handleResponse(res, {
      type: 'SUCCESS',
      message: 'Product updated successfully',
    });
  } catch (err) {
    return handleResponse(res, {
      type: 'ERROR',
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).lean();

    if (_.isEmpty(product)) {
      return handleResponse(res, {
        type: 'BAD_REQUEST',
        message: 'Product does not exist',
      });
    }

    await Product.deleteOne({ _id: productId });

    return handleResponse(res, {
      type: 'SUCCESS',
      message: 'Product deleted successfully',
    });
  } catch (err) {
    console.log(err);
    return handleResponse(res, {
      type: 'ERROR',
    });
  }
};
