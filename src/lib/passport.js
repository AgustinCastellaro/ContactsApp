const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const db = require('../database/database');

passport.use('local.login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body)
    await db.query('SELECT * FROM users WHERE username = ?', [username], (error, res) => {
        if(error) throw error;
        
        if(res.length > 0) {
            const user = res[0];
            if (password == user.password){
                done(null, user, req.flash('success', 'Welcome ' + user.username));
            }else{
                done(null, false, req.flash('message', 'Incorrect Password'));
            }
        }else{
            return done(null, false, req.flash('message', 'Incorrect Username'));
        }
    });
}));


passport.use('local.register', new localStrategy ({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    const { fullname } = req.body;
    const newUser = { 
        username, 
        password, 
        fullname 
    };
    await db.query('INSERT INTO users SET ?', [newUser]);
    return done(null, newUser);
}));


passport.serializeUser((user, done) => {
    console.log("serialize: ", user)
    done(null, user)
});


passport.deserializeUser(async (user, done) => {
    done(null, user);
});