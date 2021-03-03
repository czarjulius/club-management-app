import express from 'express';
import clubRoute from './clubRoute';
import inviteRoute from './inviteRoute';
import userRoute from './userRoute';

const router = express.Router();

router.use('/api/v1', clubRoute);
router.use('/api/v1', inviteRoute);
router.use('/api/v1', userRoute);

export default router;