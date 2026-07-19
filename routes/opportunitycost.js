const express = require('express');
const router = express.Router();
const opportunityCostController = require('../controllers/opportunityCostController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, opportunityCostController.getAll);
router.post('/', verifyToken, opportunityCostController.create);
router.delete('/:id', verifyToken, opportunityCostController.remove);

module.exports = router;