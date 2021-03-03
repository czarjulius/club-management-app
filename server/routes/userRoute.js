import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/signup', UserController.userSignup);
router.post('/signin', UserController.userLogin);

export default router; 