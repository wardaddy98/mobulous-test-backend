import express from 'express';
import { getUserDetails, loginUser, registerUser } from './controller.js';
const router = express.Router();

router.get('/', getUserDetails);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
