const express = require('express');
const router = express.Router();
const itemsCtrl = require('../controllers/items');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', itemsCtrl.index);
router.get('/new', ensureLoggedIn, itemsCtrl.new);
router.get('/:id', itemsCtrl.show);
router.post('/', ensureLoggedIn, itemsCtrl.create);
router.get('/edit/:id', ensureLoggedIn, itemsCtrl.edit);
router.put('/:id', ensureLoggedIn, itemsCtrl.update);
router.delete('/:id', ensureLoggedIn, itemsCtrl.delete);

module.exports = router;