const db = require('../db');

const getAll = (req, res) => {
  const sql = 'SELECT * FROM opportunity_cost_config WHERE user_id = ?';
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
};

const create = (req, res) => {
  const { item_name, price_per_unit, unit } = req.body;
  const sql = 'INSERT INTO opportunity_cost_config (user_id, item_name, price_per_unit, unit) VALUES (?, ?, ?, ?)';
  db.query(sql, [req.user.id, item_name, price_per_unit, unit], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal tambah opportunity cost' });
    res.status(201).json({ message: 'Opportunity cost berhasil ditambah!', id: result.insertId });
  });
};

const remove = (req, res) => {
  const sql = 'DELETE FROM opportunity_cost_config WHERE id = ? AND user_id = ?';
  db.query(sql, [req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal hapus opportunity cost' });
    res.json({ message: 'Opportunity cost berhasil dihapus!' });
  });
};

module.exports = { getAll, create, remove };