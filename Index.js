const inquirer = require('inquirer');
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require('./queries');

// Function to start the application and display options
const startApp = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Select an option:',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then(async (answer) => {
      // Call functions based on user's choice
      switch (answer.option) {
        case 'View all departments':
          const departments = await getAllDepartments();
          console.table(departments);
          break;
        case 'View all roles':
          const roles = await getAllRoles();
          console.table(roles);
          break;
        case 'View all employees':
          const employees = await getAllEmployees();
          console.table(employees);
          break;
        case 'Add a department':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'name',
                message: 'Enter the department name:',
              },
            ])
            .then(async (answers) => {
              await addDepartment(answers.name);
              startApp();
            });
          break;
        case 'Add a role':
          // Implement the inquirer prompt to add a role
          break;
        case 'Add an employee':
          // Implement the inquirer prompt to add an employee
          break;
        case 'Update an employee role':
          // Implement the inquirer prompt to update an employee role
          break;
        case 'Exit':
          // Exit the application
          console.log('Exiting the application.');
          process.exit(0);
          break;
        default:
          console.log('Invalid option. Please choose again.');
          startApp();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

startApp();

