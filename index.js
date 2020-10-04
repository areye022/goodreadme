const licenses = require("./licenses.js"); 
const fs = require("fs"); 
const inquirer = require("inquirer"); 

//Create an array of just the license titles. 
const licenseTitles = []; 
for(let license in licenses.licenseDescriptions) {
    licenseTitles.push(license); 
    //console.log(licenses.licenseDescriptions[license]); 
}

//Get the responses from the user. 
promptUser(); 

function promptUser() {
    //Prompt the user for README information. 
    inquirer.prompt([
        {
            type: "input",
            message: "Application Name:",
            name: "name"
        },
        {
            type: "input",
            message: "Application Description:",
            name: "description"
        },
        {
            type: "input",
            message: "Installation Instructions:",
            name: "installation"
        },
        {
            type: "input",
            message: "Enter Usage Information:",
            name: "usage"
        },
        {
            type: "input",
            message: "Contribution Guidelines:",
            name: "contributing"
        },
        {
            type: "input",
            message: "Test Instructions:",
            name: "tests"
        },
        {
            type: "checkbox",
            message: "Choose a License:",
            choices: [
                ...licenseTitles
            ],
            name: "license"
        },
        {
            type: "input",
            message: "Application or Owner Name (for License)",
            name: "appName"
        },
        {
            type: "input",
            message: "Year (for License)",
            name: "year"
        },
        {
            type: "input",
            message: "Enter your GitHub username:",
            name: "github"
        },
        {
            type: "input",
            message: "Enter your Email:",
            name: "email"
        }
    ])
    .then(answers => {
        //Once responses are finished, destructure the responses so that they are each a separate variable and not held in answers object. 
        const { 
            name, 
            description,
            installation,
            usage,
            contributing,
            tests,
            license,
            appName,
            year,
            github,
            email
        } = answers; 

        //Using the destructured responses, create an iterable array that holds the heading and its corresponding text. 
        //Using an array ensures iterability and prevents headings from being out of order. 
        const headings = [
            {
                heading: "Description",
                headingText: description
            },
            {
                heading: "Installation",
                headingText: installation
            },
            {
                heading: "Usage",
                headingText: usage
            },
            {
                heading: "Contributing",
                headingText: contributing
            },
            {
                heading: "Tests",
                headingText: tests
            },
            {
                heading: "Questions",
                headingText: `* [GitHub](https://github.com/${github})\n* Questions and Other Inquiries: ${email}`
            },
            {
                heading: "License",
                headingText: `This application is licensed under the [${license}](./GENERATEDLICENSE.txt).`
            }
        ];
    
        //Create the README document using the project title, and give the file a name. 
        createDocument(name); 

        //Add the badge for the license under the title. 
        addBadge(license); 

        //Create the LICENSE document.
        createLicenseFile(license, appName, year); 

        return headings; 
    })
    .then(headings => {
        //Create the Table of Contents
        createTableOfContents(); 

        return headings; 
    })
    .then(headings => {
        //For each of the main headings, create the table of contents. 
        headings.forEach(heading => {
            createTableOfContentsItem(heading); 
        }); 

        return headings; 
    })
    .then(headings => {
        //For each heading, add the appropriate section to the README.
        headings.forEach(heading => {
            addSection(heading.heading, heading.headingText); 
        }); 
    })
    .then(() => {
        //Confirm the program is completed. 
        console.log("README and LICENSE files available in current directory.");
    });
}

function createDocument(name) {
    //Create the README document. 
    fs.writeFileSync(`GENERATEDREADME.md`, `# ${name}\n`);
}

function addBadge(chosenLicense) {
    //Add the correct badge to the page. 
    fs.appendFileSync("GENERATEDREADME.md", `${licenses.licenseDescriptions[chosenLicense].badge}\n`)
}

function createLicenseFile(chosenLicense, appName, year) {
    //Create the LICENSE file. 
    fs.writeFileSync("GENERATEDLICENSE.txt", `Copyright (c) ${year} ${appName} \n\n ${licenses.licenseDescriptions[chosenLicense].text}`); 
}

function createTableOfContents() {
    //Create the table of contents. 
    fs.appendFileSync("GENERATEDREADME.md", `\n## Table of Contents\n`); 
}

function createTableOfContentsItem(heading) {
    //Create table of contents. 
    fs.appendFileSync("GENERATEDREADME.md", `* [${heading.heading}](#${heading.heading.toLowerCase()})\n`); 
}

async function addSection(heading, headingText) {
    //Using the given heading and text, add it to the readme document that was created. 
    fs.appendFileSync("GENERATEDREADME.md", `\n## ${heading}\n\n${headingText}\n\n`); 
}



