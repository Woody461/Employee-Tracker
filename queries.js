const db = require('./db');

const getAllDepartments = async () => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM department');
    return rows;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};

const getAllRoles = async () => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM role');
    return rows;
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
};

const getAllEmployees = async () => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM employees');
    return rows;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
};

const addDepartment = async (name) => {
  try {
    const [result] = await db.query('INSERT INTO department (name) VALUES (?)', [name]);
    return result.insertId;
  } catch (error) {
    console.error('Error adding department:', error);
    return null;
  }
};

const addRole = async (title, salary, departmentName) => {
  try {
    // Fetch the department ID based on the provided department name
    const [department] = await db.query('SELECT id FROM department WHERE name = ?', [departmentName]);
    if (department.length === 0) {
      console.error('Department not found:', departmentName);
      return null;
    }

    // Insert the role using the fetched department ID
    const [result] = await db.query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [title, salary, department[0].id]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error adding role:', error);
    return null;
  }
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
  try {
    const [result] = await db.query(
      'INSERT INTO employees (name, role_id, manager_id) VALUES (?, ?, ?)',
      [`${firstName} ${lastName}`, roleId, managerId === '' ? null : managerId]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error adding employee:', error);
    return null;
  }
};

const updateEmployeeRole = async (employeeId, newRoleId) => {
  try {
    const [result] = await db.query('UPDATE employees SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating employee role:', error);
    return false;
  }
};

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};