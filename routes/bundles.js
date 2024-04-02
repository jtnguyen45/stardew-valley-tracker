const express = require('express');
const router = express.Router();
const bundlesCtrl = require('../controllers/bundles');

router.get('/', bundlesCtrl.index);

module.exports = router;
