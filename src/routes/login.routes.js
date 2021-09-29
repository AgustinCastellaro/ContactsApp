const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/' , (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/list',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
})


module.exports = router;
