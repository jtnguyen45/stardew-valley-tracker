const express = require('express');
const router = express.Router();
const bundlesCtrl = require('../controllers/bundles');

router.get('/', bundlesCtrl.index);
router.get('/new', bundlesCtrl.new);
router.get('/:id', bundlesCtrl.show);
router.post('/', bundlesCtrl.create);
router.delete('/:id', bundlesCtrl.delete);

module.exports = router;
