const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppinglistcontroller');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, shoppingListController.getAll);
router.post('/', verifyToken, shoppingListController.create);
router.put('/:id', verifyToken, shoppingListController.update);
router.delete('/:id', verifyToken, shoppingListController.remove);

module.exports = router;