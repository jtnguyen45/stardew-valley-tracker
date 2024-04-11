const express = require('express');
const router = express.Router();
const bundlesCtrl = require('../controllers/bundles');

router.get('/', bundlesCtrl.index);
router.get('/new', bundlesCtrl.new);
router.get('/:id', bundlesCtrl.show);
router.post('/', bundlesCtrl.create);
router.get('/edit/:id', bundlesCtrl.edit);
router.put('/:id', bundlesCtrl.update);
router.delete('/:id', bundlesCtrl.delete);

module.exports = router;
