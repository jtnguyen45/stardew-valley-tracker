const express = require('express');
const router = express.Router();
const trackersCtrl = require('../controllers/trackers');
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, trackersCtrl.index);
router.get('/new', ensureLoggedIn, trackersCtrl.new);
router.get('/:id', ensureLoggedIn, trackersCtrl.show);
router.post('/', ensureLoggedIn, trackersCtrl.create);

module.exports = router;