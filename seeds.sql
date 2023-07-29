//-- Insert departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('Human Resources');

//-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 75000, 1),
  ('Sales Representative', 50000, 1),
  ('Marketing Manager', 70000, 2),
  ('Marketing Specialist', 55000, 2),
  ('Financial Analyst', 60000, 3),
  ('Accountant', 55000, 3),
  ('HR Manager', 70000, 4),
  ('HR Coordinator', 50000, 4);

//-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, 1),
  ('Emily', 'Lee', 4, 2),
  ('Tom', 'Brown', 5, 2),
  ('Lisa', 'Taylor', 6, 3),
  ('Alex', 'Wilson', 7, 3),
  ('Sarah', 'Clark', 8, 4);
