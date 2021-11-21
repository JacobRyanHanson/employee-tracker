const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get("/departments", (req, res) => {
    const sql = "SELECT * FROM departments"

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

router.post('/department', (req, res) => {
    const sql = "INSERT INTO departments (name) VALUES (?)";
    const params = [req.body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: req.body
        });
    });
});

module.exports = router;