const db = require('../db');

const getAll = (req, res) => {
  const sql = 'SELECT * FROM regret_history WHERE user_id = ? ORDER BY created_at DESC';
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
};

const create = (req, res) => {
  const { list_id, total_budget, total_spent, total_impulse, regret_index } = req.body;
  const sql = 'INSERT INTO regret_history (user_id, list_id, total_budget, total_spent, total_impulse, regret_index) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [req.user.id, list_id, total_budget, total_spent, total_impulse, regret_index], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal simpan regret history' });
    res.status(201).json({ message: 'Regret history berhasil disimpan!', id: result.insertId });
  });
};

const remove = (req, res) => {
  const sql = 'DELETE FROM regret_history WHERE id = ? AND user_id = ?';
  db.query(sql, [req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal hapus riwayat' });
    res.json({ message: 'Riwayat berhasil dihapus!' });
  });
};

module.exports = { getAll, create, remove };