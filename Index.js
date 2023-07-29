require('events').EventEmitter.defaultMaxListeners = 15; // Increase the maximum number of listeners

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
      try {
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
                const departmentId = await addDepartment(answers.name);
                if (departmentId !== null) {
                  console.log(`Department with ID ${departmentId} added successfully.`);
                } else {
                  console.log('Failed to add department. Please check the provided information.');
                }
                startApp();
              })
              .catch((error) => {
                console.error('Error adding department:', error);
                startApp();
              });
            break;
          case 'Add a role':
            try {
              const departmentList = await getAllDepartments();
              console.log('All Departments:', departmentList);

              inquirer
                .prompt([
                  {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the role title:',
                  },
                  {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the role salary:',
                    validate: (input) => {
                      const salary = parseFloat(input);
                      if (Number.isNaN(salary) || salary <= 0) {
                        return 'Please enter a valid salary (a positive number).';
                      }
                      return true;
                    },
                  },
                  {
                    type: 'list',
                    name: 'department',
                    message: 'Select the department for the role:',
                    choices: departmentList.map((department) => department.name),
                  },
                ])
                .then(async (answers) => {
                  const departments = await getAllDepartments();
                  console.log('All Departments:', departments);
                  const selectedDepartment = departments.find((department) => department.name === answers.department);
                  console.log('Selected Department:', selectedDepartment);

                  if (selectedDepartment) {
                    const roleId = await addRole(answers.title, answers.salary, selectedDepartment.id);
                    if (roleId !== null) {
                      console.log(`Role with ID ${roleId} added successfully.`);
                    } else {
                      console.log('Failed to add role. Please check the provided information.');
                    }
                  } else {
                    console.log('Invalid department selected. Please try again.');
                  }
                  startApp();
                })
                .catch((error) => {
                  console.error('Error adding role:', error);
                  startApp();
                });
            } catch (error) {
              console.error('Error adding role:', error);
              startApp();
            }
            break;
          case 'Add an employee':
            try {
              const employeeDetails = await inquirer.prompt([
                {
                  type: 'input',
                  name: 'firstName',
                  message: 'Enter the first name of the employee:',
                },
                {
                  type: 'input',
                  name: 'lastName',
                  message: 'Enter the last name of the employee:',
                },
                {
                  type: 'list',
                  name: 'roleId',
                  message: 'Select the role ID for the employee:',
                  choices: (await getAllRoles()).map((role) => ({
                    name: role.title,
                    value: role.id,
                  })),
                },
                {
                  type: 'input',
                  name: 'managerId',
                  message: 'Enter the manager ID for the employee (leave empty if none):',
                  filter: (input) => (input.trim() === '' ? null : input),
                },
              ]);

              const employeeId = await addEmployee(
                employeeDetails.firstName,
                employeeDetails.lastName,
                employeeDetails.roleId,
                employeeDetails.managerId
              );
              if (employeeId !== null) {
                console.log(`Employee with ID ${employeeId} added successfully.`);
              } else {
                console.log('Failed to add employee. Please check the provided information.');
              }
            } catch (error) {
              console.error('Error adding employee:', error);
            }
            break;
          case 'Update an employee role':
            const employeeUpdateDetails = await inquirer.prompt([
              {
                type: 'input',
                name: 'employeeId',
                message: 'Enter the ID of the employee you want to update:',
                validate: (input) => {
                  const employeeId = parseInt(input);
                  if (Number.isNaN(employeeId)) {
                    return 'Please enter a valid employee ID (a number).';
                  }
                  return true;
                },
              },
              {
                type: 'list',
                name: 'roleId',
                message: 'Select the new role ID for the employee:',
                choices: (await getAllRoles()).map((role) => ({
                  name: role.title,
                  value: role.id,
                })),
              },
            ]);

            const success = await updateEmployeeRole(
              employeeUpdateDetails.employeeId,
              employeeUpdateDetails.roleId
            );
            if (success) {
              console.log(`Employee with ID ${employeeUpdateDetails.employeeId}'s role updated successfully.`);
            } else {
              console.log('Failed to update employee role. Please check the provided information.');
            }
            break;
          case 'Exit':
            console.log('Exiting the application.');
            process.exit(0);
            break;
          default:
            console.log('Invalid option. Please choose again.');
        }
        startApp();
      } catch (error) {
        console.error('Error:', error);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

startApp();
