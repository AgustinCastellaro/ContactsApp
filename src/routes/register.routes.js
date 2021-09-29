const db = require('../database/database');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('register')
});

router.post('/', passport.authenticate('local.register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failureFlash: true
}));
    
/* Realizar busqueda de si hay un usuario con esos datos */
/* await db.query("SELECT * FROM users WHERE username = ?", [username], (error, res) => {
    if(error) throw error;
    
    if(res.length == 0){
        
            await db.query("INSERT INTO users SET ?", [user], (error, res) => {
            if(error) throw error;
            console.log('post register successfully');       
        }); 
        console.log(res)
    }else{ 
        res.send("User already registered");
    }
}); */

module.exports = router;
