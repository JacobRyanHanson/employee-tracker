const mysql = require('mysql2');
const inquirer = require("inquirer");
require('console.table');
// Outputs the employee's name, title, departmend, salary, and manager.
function employees(callback) {
    // Here the tables were given variable names to allow for a self join to determine the manager.
    const sql = `SELECT e.id, e.first_name, e.last_name, roles.title, 
                departments.name As department, roles.salary, 
                CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employees e
                LEFT JOIN roles ON e.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees m ON e.manager_id = m.id 
                `;
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
// Adds and employee to the database.
function addEmployee(callback) {
    inquirer.prompt({
        type: "text",
        name: "firstName",
        message: "Enter the employee's first name: "
    }).then(function (response) {
        inquirer.prompt({
            type: "text",
            name: "lastName",
            message: "Enter the employee's last name:? "
        }).then(function (lastNameResponse) {
            response.lastName = lastNameResponse.lastName;
            inquirer.prompt({
                type: "text",
                name: "roleId",
                message: "Enter the employee's role id:? "
            }).then(function (roleResponse) {
                response.roleId = roleResponse.roleId;
                inquirer.prompt({
                    type: "text",
                    name: "manager",
                    message: "Enter the employee's manager's id: "
                }).then(function (managerResponse) {
                    response.managerId = managerResponse.managerId;
                    return response;
                }).then(function () {
                    const sql = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
                    const params = [response.firstName, response.lastName, response.roleId, response.managerId];
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
                        console.log("Employee added to the database");
                        callback();
                    });
                });
            });
        });
    });
}
// Updates and employee's role in the database.
function updateEmployeeRole(callback) {
    firstAndLastName(update);

    function update(employeeList) {
        inquirer.prompt({
            type: "list",
            name: "employee",
            message: "Select the employee: ",
            choices: employeeList
        }).then(function (response) {
            console.log(response.employee)
            inquirer.prompt({
                type: "text",
                name: "roleId",
                message: "Enter the employee's new role id:? "
            }).then(function (roleIdResponse) {
                const sql = `UPDATE employees SET role_id = ? 
                             WHERE id = ?`;
                const params = [roleIdResponse.roleId, response.employee.charAt(response.employee.length - 2)];
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
                    console.log("Employee's role updated in the database");
                    callback();
                });
            })
        });
    } 
}
// Returns an array of employees for selection above.
function firstAndLastName(callback) {
    const sql = "SELECT first_name, last_name, id FROM employees";
    let employeeList;
    db.promise().query(sql).then(function (result) {
        employeeList = [...result][0].map(function (element) {
            return element.first_name + " " + element.last_name + " (" + element.id + ")";
        });
        return employeeList;
    }).then(function () {
        callback(employeeList);
    });
}

module.exports = { employees, addEmployee, updateEmployeeRole };