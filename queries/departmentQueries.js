const mysql = require('mysql2');
const inquirer = require("inquirer");
require('console.table');
// Obtaines all departments from the server and returns the result.
function departments(callback) {
    const sql = "SELECT * FROM departments"
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'YJvGVmwCGu8W4PG',
            database: 'staff'
        }
    );
    db.promise().query(sql).then(function (result) {
        console.table([...result][0]);
    }).then(function () {
        db.end();
        callback();
    });
}
// Adds a departmend into the database.
function addDepartment(callback) {
    inquirer.prompt({
        type: "text",
        name: "name",
        message: "Enter a department: ",
    }).then(function (response) {
        const sql = "INSERT INTO departments (name) VALUES (?)";
        const params = response.name;
        const db = mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'YJvGVmwCGu8W4PG',
                database: 'staff'
            }
        );
        db.promise().query(sql, params).then(function () {
            return response;
        }).then(function () {
            db.end();
            console.log("Department added to the database");
            callback();
        });
    })
}

module.exports = { departments, addDepartment };