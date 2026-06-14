const pool = require('../config/db');

const HifzLog = {
  findByStudent: (studentId, limit = 20, offset = 0) =>
    pool.query('SELECT * FROM hifz_logs WHERE student_id=$1 ORDER BY log_date DESC LIMIT $2 OFFSET $3', [studentId, limit, offset]),
  create: (data) => {
    const { student_id, log_date, log_type, surah_start, ayah_start, surah_end, ayah_end, quality, duration_min } = data;
    return pool.query(
      `INSERT INTO hifz_logs (student_id,log_date,log_type,surah_start,ayah_start,surah_end,ayah_end,quality,duration_min)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [student_id, log_date, log_type, surah_start, ayah_start, surah_end, ayah_end, quality, duration_min]
    );
  },
  update: (id, studentId, fields) => {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const set = keys.map((k, i) => `${k}=$${i + 1}`).join(',');
    return pool.query(`UPDATE hifz_logs SET ${set} WHERE id=$${keys.length + 1} AND student_id=$${keys.length + 2} RETURNING *`, [...values, id, studentId]);
  },
  delete: (id, studentId) => pool.query('DELETE FROM hifz_logs WHERE id=$1 AND student_id=$2', [id, studentId]),
  findByStudentAll: (studentId) => pool.query('SELECT * FROM hifz_logs WHERE student_id=$1 ORDER BY log_date DESC', [studentId]),
};

module.exports = HifzLog;
