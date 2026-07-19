const db = require('../db');

const getAll = (req, res) => {
  const sql = 'SELECT * FROM shopping_lists WHERE user_id = ?';
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
};

const create = (req, res) => {
  const { budget, goal_output } = req.body;
  const sql = 'INSERT INTO shopping_lists (user_id, budget, goal_output) VALUES (?, ?, ?)';
  db.query(sql, [req.user.id, budget, goal_output], (err, result) => {
    if (err) {
      console.error('Error create list:', err);
      return res.status(500).json({ message: 'Gagal membuat list', error: err.message });
    }
    res.status(201).json({ message: 'List berhasil dibuat!', id: result.insertId });
  });
};

const update = (req, res) => {
  const { status } = req.body;
  const sql = 'UPDATE shopping_lists SET status = ? WHERE id = ? AND user_id = ?';
  db.query(sql, [status, req.params.id, req.user.id], (err) => {
    if (err) {
      console.error('Error update list:', err);
      return res.status(500).json({ message: 'Gagal update list', error: err.message });
    }
    res.json({ message: 'List berhasil diupdate!' });
  });
};

const remove = (req, res) => {
  const sqlRegret = 'DELETE FROM regret_history WHERE list_id = ?';
  db.query(sqlRegret, [req.params.id], (err) => {
    if (err) {
      console.error('Error delete regret_history:', err);
      return res.status(500).json({ message: 'Gagal hapus regret history', error: err.message });
    }

    const sqlItems = 'DELETE FROM items WHERE list_id = ?';
    db.query(sqlItems, [req.params.id], (err) => {
      if (err) {
        console.error('Error delete items:', err);
        return res.status(500).json({ message: 'Gagal hapus items', error: err.message });
      }

      const sqlList = 'DELETE FROM shopping_lists WHERE id = ? AND user_id = ?';
      db.query(sqlList, [req.params.id, req.user.id], (err, result) => {
        if (err) {
          console.error('Error remove list:', err);
          return res.status(500).json({ message: 'Gagal hapus list', error: err.message });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'List tidak ditemukan' });
        }
        res.json({ message: 'List berhasil dihapus!' });
      });
    });
  });
};

module.exports = { getAll, create, update, remove };