import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { JWT_SECRET_KEY } from '../../constants.js';
import { User } from '../../models/user.model.js';
import { handleResponse } from '../../utils/handleResponse.js';

export const registerUser = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    const user = await User.findOne({ email: payload.email }).lean();

    if (!_.isEmpty(user)) {
      return handleResponse(res, {
        type: 'BAD_REQUEST',
        message: 'User already exists',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);
    payload.password = hashedPassword;

    let createdUser = await User.create(payload);

    const authToken = jwt.sign({ _id: createdUser._id }, JWT_SECRET_KEY);

    return handleResponse(res, {
      type: 'SUCCESS',
      message: 'User created successfully',
      body: {
        authToken,
        createdUser,
      },
    });
  } catch (err) {
    console.log(err);
    return handleResponse(res, {
      type: 'ERROR',
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (_.isEmpty(user)) {
      return handleResponse(res, {
        type: 'BAD_REQUEST',
        message: 'User does not exist!',
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return handleResponse(res, {
        type: 'UNAUTHORIZED',
        message: 'Password is incorrect!',
      });
    }

    const authToken = jwt.sign({ _id: user._id }, JWT_SECRET_KEY);

    return handleResponse(res, {
      type: 'SUCCESS',
      message: 'User logged in successfully',
      body: {
        authToken,
      },
    });
  } catch (err) {
    console.log(err);
    return handleResponse(res, {
      type: 'ERROR',
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return handleResponse(res, {
        type: 'FORBIDDEN',
        message: 'Missing authorization token',
      });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET_KEY, async (err, tokenData) => {
      if (err) {
        return handleResponse(res, {
          type: 'FORBIDDEN',
          message: 'Invalid access token',
        });
      } else {
        const user = await User.findById(tokenData._id).lean();

        if (_.isEmpty(user)) {
          return handleResponse(res, {
            type: 'FORBIDDEN',
            message: 'User does not exist!',
          });
        }
        delete user.password;
        delete user.__v;

        return handleResponse(res, {
          type: 'SUCCESS',
          message: 'User details loaded successfully',
          body: { user },
        });
      }
    });
  } catch (err) {
    return handleResponse(res, {
      type: 'ERROR',
    });
  }
};
