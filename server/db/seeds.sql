INSERT INTO department (name)
VALUES 
    ("Insurance")
;

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Manager", "10000", 1),
    ("IT", "2000", 1)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("John", "Lukes", 2, 1)
;