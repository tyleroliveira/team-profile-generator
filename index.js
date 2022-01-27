const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const teamMembers = [];
function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Engineer name?",
        name: "name",
      },
      {
        type: "input",
        message: "Engineer employee id?",
        name: "id",
      },
      {
        type: "input",
        message: "Engineer email?",
        name: "email",
      },
      {
        type: "input",
        message: "github?",
        name: "github",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      teamMembers.push(engineer);
      selectMember();
    });
}
function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Intern name?",
        name: "name",
      },
      {
        type: "input",
        message: "Intern employee id?",
        name: "id",
      },
      {
        type: "input",
        message: "Intern email?",
        name: "email",
      },
      {
        type: "input",
        message: "School?",
        name: "school",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      teamMembers.push(intern);
      selectMember();
    });
}
function startHtml() {
  let htmlTag = ``;
  for (let i = 0; i < teamMembers.length; i++) {
    htmlTag += addHtml(teamMembers[i]);
  }
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
${htmlTag}
           </div>
            </body>
            </html>`;
  fs.writeFile("./output/team.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("start");
}
function addHtml(member) {
  const name = member.getName();
  const role = member.getRole();
  const id = member.getId();
  const email = member.getEmail();
  let data = "";
  if (role === "Engineer") {
    const gitHub = member.getGithub();
    data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
  } else if (role === "Intern") {
    const school = member.getSchool();
    data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
  } else {
    const officePhone = member.getOfficeNumber();
    data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`;
  }
  return data;
}
function selectMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "Would you like to add another?",
        choices: ["Add Engineer", "Add Intern", "Done"],
      },
    ])
    .then((answers) => {
      if (answers.selection === "Add Engineer") {
        createEngineer();
      } else if (answers.selection === "Add Intern") {
        createIntern();
      } else {
        startHtml();
      }
    });
}
inquirer
  .prompt([
    {
      type: "input",
      message: "managers name?",
      name: "name",
    },
    {
      type: "input",
      message: "managers employee id?",
      name: "id",
    },
    {
      type: "input",
      message: "managers email?",
      name: "email",
    },
    {
      type: "input",
      message: "managers office number?",
      name: "officeNumber",
    },
  ])
  .then((answers) => {
    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    teamMembers.push(manager);
    selectMember();
  });
