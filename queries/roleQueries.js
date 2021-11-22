const mysql = require('mysql2');
const inquirer = require("inquirer");
require('console.table');

function roles(callback) {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;
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

function addRole(callback) {
    inquirer.prompt({
        type: "text",
        name: "title",
        message: "Enter a title: ",
    }).then(function (response) {
        inquirer.prompt({
            type: "text",
            name: "salary",
            message: "Enter a salary: ",
        }).then(function (salaryResponse) {
            response.salary = salaryResponse.salary;
            inquirer.prompt({
                type: "text",
                name: "departmentId",
                message: "Enter a department id: "
            }).then(function (departmentResponse) {
                response.departmentId = departmentResponse.departmentId;
                return response;
            }).then(function (response) {
                const sql = "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
                const params = [response.title, response.salary, response.departmentId];
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
                    console.log("Role added to the database");
                    callback();
                });
            });
        });
    });
}

module.exports = {roles, addRole};