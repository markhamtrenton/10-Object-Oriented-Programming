  
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");




//questions for user--------------------

  const buildTeam = () => {

    
    
    const questions = [
        {
            type: 'list', 
            name: 'role', 
            message: 'What is your role?',
            choices: ['Manager', 'Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name', 
            message: 'What is your name?', 
        },
        {
            type: 'input',
            name: 'id', 
            message: 'What is your id?', 
        },
        {
            type: 'input',
            name: 'email', 
            message: 'What is your email??', 
        }, 
    
    ]; 
    
    inquirer.prompt(questions).then(employee=>{
        if (employee.role === 'Manager'){ 
            createManager(employee); 
        } else if (employee.role === 'Engineer'){ 
            createEngineer(employee); 
        } else {
            createIntern(employee); 
        }
    }); 
}



//new Manager object is created ----------------
const createManager = employee => { 

    const questions = [
        {
            type: 'input', 
            name: 'number', 
            message: 'What is your office number?' 
        
        },
        {
            type: 'list',
            name: 'addMember',
            message: 'Would you like to add another team member?',
            choices: ['Yes', 'No']
        }
    ]; 

    inquirer.prompt(questions).then(answers=>{ 
        const manager = new Manager(employee.name, employee.id, employee.email, answers.number); 
      
        employees.push(manager); 
        if (answers.addMember === 'Yes'){ 
            buildTeam(); 
        } else { 
            fs.writeFile('team.html', render(employees), 'utf-8', err=>{ 
                if (err) throw err; 

                console.log('Your file has been created!'); 
            }) 
        }
    }); 
} 






//new Engineer object is created--------------
const createEngineer = employee => {

    const questions = [
        {
            type: 'input',
            name: 'github', 
            message: 'What is your github username?', 
        },
        {
            type: 'list',
            name: 'addMember',
            message: 'Would you like to add another team member?',
            choices: ['Yes', 'No']
        }
    ]

    inquirer.prompt(questions).then(answers =>{ 
        const engineer = new Engineer(employee.name, employee.id, employee.email, answers.github); 
        
        employees.push(engineer); 

        if (answers.addMember === 'Yes'){ 
            buildTeam(); 
        } else { 
            fs.writeFile('team.html', render(employees), 'utf-8', err=>{ 
                if (err) throw err; 

                console.log('Your file has been created!'); 
            })
        }
    }); 
}

//Intern object is created-----------------
const createIntern = (employee) => { 
    const question = [
        {
            type: 'input',
            name: 'school', 
            message: 'What school are you from?', 
        },
        {
            type: 'list',
            name: 'addMember',
            message: 'Would you like to add another team member?',
            choices: ['Yes', 'No']
        }
    ]; 

    inquirer.prompt(question).then(answers =>{ 
        const intern = new Intern(employee.name, employee.id, employee.email, answers.school); 
        
        employees.push(intern); 

        if (answers.addMember === 'Yes'){ 
            buildTeam(); 
        } else { 
            fs.writeFile('team.html', render(employees), 'utf-8', err=>{ 
                if (err) throw err; 

                console.log('Your file has been created!'); 
            })
        }
    })
    
 
}

const employees = []; 

buildTeam(); 