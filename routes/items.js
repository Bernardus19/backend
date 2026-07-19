const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const { verifyToken } = require('../middleware/auth');

router.get('/:list_id', verifyToken, itemsController.getByList);
router.post('/', verifyToken, itemsController.create);
router.put('/:id', verifyToken, itemsController.update);
router.delete('/:id', verifyToken, itemsController.remove);

module.exports = router;