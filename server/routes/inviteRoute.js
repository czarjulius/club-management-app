import express from 'express';
import inviteController from '../controllers/inviteController';
import authenticate from '../middlewares/Authentication';

const router = express.Router();

// router.post('/invite/:club_id',authenticate, inviteController.invite);
// router.get('/invite/:user_email',authenticate, inviteController.fetchUserPendingInvitations);

// router.post('/invite/:club_id',authenticate, inviteController.invite);
router.get('/invite', inviteController.fetchUserPendingInvitations);

export default router;