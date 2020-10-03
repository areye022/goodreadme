const fs = require("fs"); 
const inquirer = require("inquirer"); 
const util = require("util"); 

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
            Tests
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
            }
        ];
    
        //Create the README document using the project title. 
        createDocument(name); 

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



