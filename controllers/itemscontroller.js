const db = require('../db');

const getByList = (req, res) => {
  const sql = 'SELECT * FROM items WHERE list_id = ?';
  db.query(sql, [req.params.list_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
};

const create = (req, res) => {
  const { list_id, name, price, category, weight, is_impulse } = req.body;

  const sql = 'INSERT INTO items (list_id, name, price, category, weight, is_impulse, rs_score) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [list_id, name, price, category, weight, is_impulse, 0], (err, result) => {
    if (err) {
      console.error('Error insert item:', err);
      return res.status(500).json({ message: 'Gagal menambah item', error: err.message });
    }
    res.status(201).json({ message: 'Item berhasil ditambah!', id: result.insertId });
  });
};

const update = (req, res) => {
  const { is_checked } = req.body;
  const sql = 'UPDATE items SET is_checked = ? WHERE id = ?';
  db.query(sql, [is_checked, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal update item' });
    res.json({ message: 'Item berhasil diupdate!' });
  });
};

const remove = (req, res) => {
  const sql = 'DELETE FROM items WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal hapus item' });
    res.json({ message: 'Item berhasil dihapus!' });
  });
};

module.exports = { getByList, create, update, remove };