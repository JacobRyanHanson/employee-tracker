const inquirer = require("inquirer");

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
}).then(console.log)