const licenses = require("./licenses.js"); 
const fs = require("fs"); 
const inquirer = require("inquirer"); 
const util = require("util"); 

//Create an array of just the license titles. 
const licenseTitles = []; 
for(let license in licenses.licenseDescriptions) {
    licenseTitles.push(license); 
    //console.log(licenses.licenseDescriptions[license]); 
}

console.log(licenseTitles); 

//Get the responses from the user. 
promptUser(); 

function promptUser() {
    inquirer.prompt([
        {
            type: "input",
            message: "Application Name:",
            name: "name"
        },
        {
            type: "input",
            message: "Application Description:",
            name: "Description"
        },
        {
            type: "input",
            message: "Installation Instructions:",
            name: "Installation"
        },
        {
            type: "input",
            message: "Enter Usage Information:",
            name: "Usage"
        },
        {
            type: "input",
            message: "Contribution Guidelines:",
            name: "Contributing"
        },
        {
            type: "input",
            message: "Test Instructions:",
            name: "Tests"
        },
        {
            type: "checkbox",
            message: "Choose a License:",
            choices: [
                ...licenseTitles
            ],
            name: "License"
        }
    ])
    .then(answers => {
        //Once responses are finished, destructure the responses so that they are each a separate variable and not held in answers object. 
        const { 
            name, 
            Description,
            Installation,
            Usage,
            Contributing,
            Tests,
            License
        } = answers; 

        //Using the destructured responses, create an iterable array that holds the heading and its corresponding text. 
        //Using an array ensures iterability and prevents headings from being out of order. 
        const headings = [
            {
                heading: "Description",
                headingText: Description
            },
            {
                heading: "Installation",
                headingText: Installation
            },
            {
                heading: "Usage",
                headingText: Usage
            },
            {
                heading: "Contributing",
                headingText: Contributing
            },
            {
                heading: "Tests",
                headingText: Tests
            },
            {
                heading: "License",
                headingText: `This application is licensed under the ${License}.`
            }
        ];
    
        //Create the README document using the project title. 
        createDocument(name); 

        //Add the badge for the license under the title. 
        addBadge(License); 

        return headings; 
    })
    .then(headings => {
        //Create the Table of Contents
        createTableOfContents(headings); 

        return headings; 
    })
    .then(headings => {

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
    });
}

function createDocument(name) {
    //Create the README document. 
    fs.writeFileSync("README.md", `# ${name}\n`);
}

function addBadge(chosenLicense) {
    //Add the correct badge to the page. 
    fs.appendFileSync("README.md", `${licenses.licenseDescriptions[chosenLicense].badge}\n`)
}

function createTableOfContents(headings) {

    fs.appendFileSync("README.md", `\n## Table of Contents\n`); 

}

function createTableOfContentsItem(heading) {

    fs.appendFileSync("README.md", `* [${heading.heading}](#${heading.heading.toLowerCase()})\n`); 

}

async function addSection(heading, headingText) {
    //Using the given heading and text, add it to the readme document that was created. 
    fs.appendFileSync("README.md", `\n## ${heading}\n\n${headingText}\n\n`); 

}



