const pool = require('../config/db');
const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const result = await User.findById(req.user.id);
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, language_pref, theme } = req.body;
    const fields = {};
    if (name) fields.name = name;
    if (language_pref) fields.language_pref = language_pref;
    if (theme) fields.theme = theme;
    const result = await User.update(req.user.id, fields);
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.getBookmarks = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM bookmarks WHERE user_id=$1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) { next(err); }
};

exports.addBookmark = async (req, res, next) => {
  try {
    const { surah_num, ayah_num, label } = req.body;
    const result = await pool.query(
      'INSERT INTO bookmarks (user_id,surah_num,ayah_num,label) VALUES ($1,$2,$3,$4) RETURNING *',
      [req.user.id, surah_num, ayah_num, label]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.deleteBookmark = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM bookmarks WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
    res.status(204).end();
  } catch (err) { next(err); }
};

exports.getDuaFavorites = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM dua_favorites WHERE user_id=$1', [req.user.id]);
    res.json(result.rows);
  } catch (err) { next(err); }
};

exports.addDuaFavorite = async (req, res, next) => {
  try {
    const { dua_id } = req.body;
    const result = await pool.query(
      'INSERT INTO dua_favorites (user_id,dua_id) VALUES ($1,$2) ON CONFLICT DO NOTHING RETURNING *',
      [req.user.id, dua_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.deleteDuaFavorite = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM dua_favorites WHERE user_id=$1 AND dua_id=$2', [req.user.id, req.params.duaId]);
    res.status(204).end();
  } catch (err) { next(err); }
};

exports.getQaidaProgress = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM qaida_progress WHERE user_id=$1 ORDER BY lesson_num', [req.user.id]);
    res.json(result.rows);
  } catch (err) { next(err); }
};

exports.updateQaidaProgress = async (req, res, next) => {
  try {
    const { completed, score } = req.body;
    const result = await pool.query(
      `INSERT INTO qaida_progress (user_id,lesson_num,completed,score,completed_at)
       VALUES ($1,$2,$3,$4,NOW())
       ON CONFLICT (user_id,lesson_num) DO UPDATE SET completed=$3,score=$4,completed_at=NOW() RETURNING *`,
      [req.user.id, req.params.lessonNum, completed, score]
    );
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};
