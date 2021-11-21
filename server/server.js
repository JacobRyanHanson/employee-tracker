const express = require("express");
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

app.get("/api/departments", (req, res) => {
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

app.post('/api/department', (req, res) => {
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

app.get("/api/roles", (req, res) => {
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

app.post('/api/role', (req, res) => {
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

app.get("/api/employees", (req, res) => {
    const sql = "SELECT * FROM employees"

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

app.post('/api/employee', (req, res) => {
    const sql = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    const params = [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id];

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

app.put('/api/employee/:id', (req, res) => {
    const sql = `UPDATE employees SET manager_id = ? 
                 WHERE id = ?`;
    const params = [req.body.manager_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});