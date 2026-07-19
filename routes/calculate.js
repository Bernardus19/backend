const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.post('/rs-score', verifyToken, (req, res) => {
  const { price, remaining_budget, category } = req.body;

  const weights = {
    'kebutuhan_pokok': 0.1,
    'kebutuhan_sekunder': 0.4,
    'keinginan': 0.8,
    'snack_premium': 0.9,
    'diskon_impulsif': 1.0
  };

  const W = weights[category] || 0.5;
  const rs_score = ((price / remaining_budget) * 100) * W;

  let status = 'aman';
  let friction_seconds = 0;
  if (rs_score > 90) { status = 'blokir'; friction_seconds = 0; }
  else if (rs_score > 70) { status = 'bahaya'; friction_seconds = 20; }
  else if (rs_score > 50) { status = 'peringatan'; friction_seconds = 10; }

  res.json({ rs_score, status, friction_seconds, category, W });
});

module.exports = router;