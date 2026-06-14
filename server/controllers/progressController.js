const Progress = require('../models/Progress');
const Streak = require('../models/Streak');

exports.getProgress = async (req, res, next) => {
  try {
    const result = await Progress.findByStudent(req.user.id);
    res.json(result.rows);
  } catch (err) { next(err); }
};

exports.getSurahProgress = async (req, res, next) => {
  try {
    const result = await Progress.findBySurah(req.user.id, req.params.surahNum);
    res.json(result.rows[0] || { surah_num: req.params.surahNum, status: 'not_started', memorized_pct: 0 });
  } catch (err) { next(err); }
};

exports.updateSurahProgress = async (req, res, next) => {
  try {
    const result = await Progress.upsert(req.user.id, req.params.surahNum, req.body);
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.getStreak = async (req, res, next) => {
  try {
    const result = await Streak.findByStudent(req.user.id);
    res.json(result.rows[0] || { current_streak: 0, longest_streak: 0 });
  } catch (err) { next(err); }
};
