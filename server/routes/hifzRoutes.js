const router = require('express').Router();
const { getLogs, createLog, updateLog, deleteLog } = require('../controllers/hifzController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/logs', getLogs);
router.post('/logs', createLog);
router.put('/logs/:id', updateLog);
router.delete('/logs/:id', deleteLog);

module.exports = router;
