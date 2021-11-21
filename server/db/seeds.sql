INSERT INTO departments (name)
VALUES 
    ("Insurance")
;

INSERT INTO roles (title, salary, department_id)
VALUES 
    ("Manager", "10000", 1),
    ("IT", "2000", 1)
;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("John", "Lukes", 2, 1)
;