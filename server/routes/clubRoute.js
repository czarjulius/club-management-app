import express from 'express';
import clubController from '../controllers/clubController';
import authenticate from '../middlewares/Authentication';

const router = express.Router();

router.post('/profileclub', authenticate, clubController.profileClub);
router.post('/joinclub/:club_id',authenticate, clubController.joinClub);
router.get('/clubs',authenticate, clubController.fetchClubByUserId);
router.get('/clubs/:club_id',authenticate, clubController.getClubById);
router.get('/members/:club_id',authenticate, clubController.fetchAllClubMembers);
router.delete('/remove/:user_club_id/:club_id',authenticate, clubController.deleteClubMember);

export default router;