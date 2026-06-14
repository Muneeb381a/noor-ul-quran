const router = require('express').Router();
const { body } = require('express-validator');
const { register, login, getMe, generateInvite } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  register
);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/invite', protect, generateInvite);

module.exports = router;
