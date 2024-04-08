const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('landing', { title: 'Stardew Valley Tracker' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/bundles',
    failureRedirect: '/bundles'
  }
));

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/home');
  });
});

module.exports = router;
