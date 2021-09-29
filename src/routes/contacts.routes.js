const pool = require('../database/database');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('contacts')
});


/* Add contact */
router.get('/add', (req, res) => {
    res.render('contacts/add')
});

router.post('/add', async (req, res) => {
    const username = req.user.username;
    const { name, number } = req.body;
    const newContact = {
        name: name,
        number: number,
        user: username
    };
    console.log(newContact);
    const results = await pool.query('INSERT INTO contacts SET ?', [newContact]);
    console.log(results);
    res.redirect('/list');
});


/* Edit contact */
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const contact = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    res.render('contacts/edit', { contact: contact[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, number } = req.body;
    const updateContact = {
        name: name,
        number: number
    };
    console.log(updateContact);
    const results = await pool.query('UPDATE contacts SET ? WHERE id = ?', [updateContact, id]);
    console.log(results);
    res.redirect('/list');
});


/* Delete contact */
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const contact = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
    res.render('contacts/delete', { contact: contact[0] });
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const results = await pool.query('DELETE FROM contacts WHERE id = ?', [id]);
    console.log(results);
    res.redirect('/list');
});

module.exports = router;