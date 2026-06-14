const router = require('express').Router();
const ctrl = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/profile', ctrl.getProfile);
router.put('/profile', ctrl.updateProfile);
router.get('/bookmarks', ctrl.getBookmarks);
router.post('/bookmarks', ctrl.addBookmark);
router.delete('/bookmarks/:id', ctrl.deleteBookmark);
router.get('/dua-favorites', ctrl.getDuaFavorites);
router.post('/dua-favorites', ctrl.addDuaFavorite);
router.delete('/dua-favorites/:duaId', ctrl.deleteDuaFavorite);
router.get('/qaida-progress', ctrl.getQaidaProgress);
router.put('/qaida-progress/:lessonNum', ctrl.updateQaidaProgress);

module.exports = router;
