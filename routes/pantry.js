const express = require('express');
const router = express.Router();
const pantryController = require('../controllers/pantryController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, pantryController.getAll);
router.post('/', verifyToken, pantryController.create);
router.put('/:id', verifyToken, pantryController.update);
router.delete('/:id', verifyToken, pantryController.remove);

module.exports = router;