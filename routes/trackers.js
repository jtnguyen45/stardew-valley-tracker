const express = require('express');
const router = express.Router();
const trackersCtrl = require('../controllers/trackers');
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, trackersCtrl.index);
router.get('/new', ensureLoggedIn, trackersCtrl.new);
router.get('/:id', ensureLoggedIn, trackersCtrl.show);
router.post('/', ensureLoggedIn, trackersCtrl.create);
router.get('/:trackerId/bundles/:bundleId/edit', ensureLoggedIn, trackersCtrl.edit);
router.put('/:trackerId/bundles/:bundleId/update', ensureLoggedIn, trackersCtrl.updateTracked);

module.exports = router;