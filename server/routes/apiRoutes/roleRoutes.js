const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


router.get("/roles", (req, res) => {
    const sql = "SELECT * FROM roles"

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

router.post('/role', (req, res) => {
    const sql = "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
    const params = [req.body.title, req.body.salary, req.body.department_id];

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