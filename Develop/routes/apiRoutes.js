const router = require('express').Router();
const fs = require('fs');
let db = require('../db/db.json');

router.get('/notes', (req, res) => {
    db = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(db);
});

router.post('/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() * 9999)
    }
    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

router.delete('/notes/:id', (req, res) => {
    let notesToKeep = [];
    for(let i = 0; i < db.length; i++) {
        if (db[i].id != req.params.id) {
            notesToKeep.push(db[i]);
        }
    }
    db = notesToKeep;
    fs.writeFileSync('./db/db.json', JSON.stringify(db), (err, res) => {
        if (err) {
            throw err;
        }
    });
    res.json(db);
});

module.exports = router;