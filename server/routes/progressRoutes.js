const router = require('express').Router();
const { getProgress, getSurahProgress, updateSurahProgress, getStreak } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getProgress);
router.get('/streak', getStreak);
router.get('/:surahNum', getSurahProgress);
router.put('/:surahNum', updateSurahProgress);

module.exports = router;
