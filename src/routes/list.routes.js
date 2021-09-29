const express = require('express');
const router = express.Router();
const pool = require('../database/database');
const { isLoggedIn } = require('../lib/authentication');

router.get('/', isLoggedIn, async (req, res) => {
    console.log(req.user);
    const username = req.user.username;
    const contacts = await pool.query('SELECT * FROM contacts WHERE user = ?', [username]);
    console.log(contacts);
    res.render('list', { contacts: contacts })
});

module.exports = router;