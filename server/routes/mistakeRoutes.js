const router = require('express').Router();
const { getMistakes, createMistake, resolveMistake } = require('../controllers/mistakeController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getMistakes);
router.post('/', createMistake);
router.put('/:id/resolve', resolveMistake);

module.exports = router;
