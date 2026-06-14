const HifzLog = require('../models/HifzLog');
const Streak = require('../models/Streak');

const updateStreak = async (studentId, logDate) => {
  const streakRes = await Streak.findByStudent(studentId);
  const today = logDate || new Date().toISOString().split('T')[0];
  let current = 1, longest = 1;

  if (streakRes.rows.length) {
    const s = streakRes.rows[0];
    const last = s.last_log_date ? new Date(s.last_log_date).toISOString().split('T')[0] : null;
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];

    if (last === today) { current = s.current_streak; longest = s.longest_streak; }
    else if (last === yStr) { current = s.current_streak + 1; longest = Math.max(s.longest_streak, current); }
    else { current = 1; longest = Math.max(s.longest_streak, 1); }
  }
  await Streak.upsert(studentId, current, longest, today);
};

exports.getLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const result = await HifzLog.findByStudent(req.user.id, limit, offset);
    res.json(result.rows);
  } catch (err) { next(err); }
};

exports.createLog = async (req, res, next) => {
  try {
    const data = { ...req.body, student_id: req.user.id };
    const result = await HifzLog.create(data);
    await updateStreak(req.user.id, data.log_date);
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.updateLog = async (req, res, next) => {
  try {
    const result = await HifzLog.update(req.params.id, req.user.id, req.body);
    if (!result.rows.length) return res.status(404).json({ message: 'Log not found' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.deleteLog = async (req, res, next) => {
  try {
    await HifzLog.delete(req.params.id, req.user.id);
    res.status(204).end();
  } catch (err) { next(err); }
};
