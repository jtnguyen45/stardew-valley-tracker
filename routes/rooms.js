const express = require('express');
const router = express.Router();
const roomsCtrl = require('../controllers/rooms');

router.get('/', roomsCtrl.home);
router.get('/new', roomsCtrl.new);
router.get('/:id', roomsCtrl.show);
router.post('/', roomsCtrl.create);

module.exports = router;