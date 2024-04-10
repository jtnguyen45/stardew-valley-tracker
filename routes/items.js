const express = require('express');
const router = express.Router();
const itemsCtrl = require('../controllers/items');

router.get('/', itemsCtrl.index);
router.get('/new', itemsCtrl.new);
router.get('/:id', itemsCtrl.show);
router.post('/', itemsCtrl.create);
router.get('/edit/:id', itemsCtrl.edit);
router.put('/:id', itemsCtrl.update);
router.delete('/:id', itemsCtrl.delete);

module.exports = router;