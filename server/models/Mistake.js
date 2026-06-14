const pool = require('../config/db');

const Mistake = {
  findByStudent: (studentId, filters = {}) => {
    let q = 'SELECT * FROM mistakes WHERE student_id=$1';
    const params = [studentId];
    if (filters.surah) { params.push(filters.surah); q += ` AND surah_num=$${params.length}`; }
    if (filters.resolved !== undefined) { params.push(filters.resolved); q += ` AND resolved=$${params.length}`; }
    return pool.query(q + ' ORDER BY created_at DESC', params);
  },
  create: (data) => {
    const { student_id, log_id, surah_num, ayah_num, mistake_type, description, marked_by } = data;
    return pool.query(
      'INSERT INTO mistakes (student_id,log_id,surah_num,ayah_num,mistake_type,description,marked_by) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [student_id, log_id, surah_num, ayah_num, mistake_type, description, marked_by]
    );
  },
  resolve: (id) => pool.query('UPDATE mistakes SET resolved=TRUE WHERE id=$1 RETURNING *', [id]),
};

module.exports = Mistake;
