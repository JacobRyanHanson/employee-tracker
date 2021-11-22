INSERT INTO departments (name)
VALUES 
    ("Insurance"),
    ("Sales")
;

INSERT INTO roles (title, salary, department_id)
VALUES 
    ("Sales Lead", "10000", 2),
    ("Salesperson", "2000", 2),
    ("Head of Claims", "30000", 1) 
;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("John", "Doe", 1, null),
    ("Jane", "Maker", 2, 1)
;