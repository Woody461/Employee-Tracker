//-- Insert departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('Human Resources');

//-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 75000, 1),
  ('Sales Representative', 50000, 1),
  ('Marketing Manager', 70000, 2),
  ('Marketing Specialist', 55000, 2),
  ('Financial Analyst', 60000, 3),
  ('Accountant', 55000, 3),
  ('HR Manager', 70000, 4),
  ('HR Coordinator', 50000, 4);

//-- Insert employees
INSERT INTO employee (name, age, role_id, manager_id) VALUES
  ('John Doe', 30, 1, NULL),
  ('Jane Smith', 25, 2, 1),
  ('Mike Johnson', 35, 3, 1),
  ('Emily Lee', 28, 4, 2),8
  ('Tom Brown', 32, 5, 2),
  ('Lisa Taylor', 27, 6, 3),
  ('Alex Wilson', 29, 7, 3),
  ('Sarah Clark', 33, 8, 4);
