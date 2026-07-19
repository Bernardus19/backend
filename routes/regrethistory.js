const express = require('express');
const router = express.Router();
const regretHistoryController = require('../controllers/regretHistoryController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, regretHistoryController.getAll);
router.post('/', verifyToken, regretHistoryController.create);
router.delete('/:id', verifyToken, regretHistoryController.remove);

module.exports = router;