const db = require('../db');

const getAll = (req, res) => {
  const sql = 'SELECT * FROM pantry WHERE user_id = ?';
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
};

const create = (req, res) => {
  const { name, quantity, unit } = req.body;
  const sql = 'INSERT INTO pantry (user_id, name, quantity, unit) VALUES (?, ?, ?, ?)';
  db.query(sql, [req.user.id, name, quantity, unit], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal menambah item pantry' });
    res.status(201).json({ message: 'Item pantry berhasil ditambah!', id: result.insertId });
  });
};

const update = (req, res) => {
  const { quantity } = req.body;
  const sql = 'UPDATE pantry SET quantity = ? WHERE id = ? AND user_id = ?';
  db.query(sql, [quantity, req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal update pantry' });
    res.json({ message: 'Pantry berhasil diupdate!' });
  });
};

const remove = (req, res) => {
  const sql = 'DELETE FROM pantry WHERE id = ? AND user_id = ?';
  db.query(sql, [req.params.id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal hapus item pantry' });
    res.json({ message: 'Item pantry berhasil dihapus!' });
  });
};

module.exports = { getAll, create, update, remove };