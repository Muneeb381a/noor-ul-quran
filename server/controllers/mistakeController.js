const Mistake = require('../models/Mistake');

exports.getMistakes = async (req, res, next) => {
  try {
    const { surah, resolved } = req.query;
    const filters = {};
    if (surah) filters.surah = surah;
    if (resolved !== undefined) filters.resolved = resolved === 'true';
    const result = await Mistake.findByStudent(req.user.id, filters);
    res.json(result.rows);
  } catch (err) { next(err); }
};

exports.createMistake = async (req, res, next) => {
  try {
    const data = { ...req.body, student_id: req.user.id, marked_by: req.user.id };
    const result = await Mistake.create(data);
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.resolveMistake = async (req, res, next) => {
  try {
    const result = await Mistake.resolve(req.params.id);
    if (!result.rows.length) return res.status(404).json({ message: 'Mistake not found' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};
