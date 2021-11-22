const inquirer = require("inquirer");
const {departments, addDepartment} = require("./queries/departmentQueries");
const {roles, addRole} = require("./queries/roleQueries");
const {employees, addEmployee, updateEmployeeRole} = require("./queries/employeeQueries");

init();

function init() {
    inquirer.prompt({
        type: "list",
        name: "options",
        message: "Select one of the following: ",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role"
        ]
    }).then(selectFunction);
}

function selectFunction({options}) {
    if (options === "View All Departments") {
        departments(init);
    } else if (options === "View All Roles"){
        roles(init);
    } else if (options === "View All Employees") {
        employees(init);
    } else if (options === "Add a Department") {
        addDepartment(init);
    } else if (options === "Add a Role") {
        addRole(init);
    } else if (options === "Add an Employee") {
        addEmployee(init);
    } else {
        updateEmployeeRole(init);
    }
}

