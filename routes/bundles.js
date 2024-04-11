const express = require('express');
const router = express.Router();
const bundlesCtrl = require('../controllers/bundles');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', bundlesCtrl.index);
router.get('/new', ensureLoggedIn, bundlesCtrl.new);
router.get('/:id', bundlesCtrl.show);
router.post('/', ensureLoggedIn, bundlesCtrl.create);
router.get('/edit/:id', ensureLoggedIn, bundlesCtrl.edit);
router.put('/:id', ensureLoggedIn, bundlesCtrl.update);
router.delete('/:id', ensureLoggedIn, bundlesCtrl.delete);

module.exports = router;
