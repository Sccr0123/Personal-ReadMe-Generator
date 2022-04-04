const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");
const fs = require("fs/promises");

const startQuestions = [
    {
        type: "checkbox",
        name: "create",
        message: "Do you wish to create a README?",
        choices: ["Yes", "No"],
    }
]

const baseQuestions = [
	{
		type: "input",
		name: "filename",
		message: "What would you like your file name to be?",
		default: "default.txt",
	},
	{
		type: "input",
		name: "title",
		message: "What would you like your title to be?",
	},
	{
		type: "input",
		name: "motivation",
		message: "What is your motivation for your project?",
	},
	{
		type: "input",
		name: "reason",
		message: "Why did you build this project?",
	},
	{
		type: "input",
		name: "problem",
		message: "What was the problem you looked to solve?",
	},
	{
		type: "input",
		name: "learned",
		message: "What items did you learn while working on this project?",
	},
	{
		type: "checkbox",
		name: "tableofcontents",
		message: "Would you like to include a table of contents?",
		choices: ["Yes", "No"],
	},
	{
		type: "input",
		name: "installation.text",
		message: "Provide a step by step of the installation process.",
	},
	{
		type: "input",
		name: "usage.text",
		message: "Provide instructions and examples of your code.",
	},
	{
		type: "checkbox",
		name: "screenshot.answer",
		message: "Would you like to include a screenshot?",
		choices: ["Yes", "No"],
	},
	{
		type: "input",
		name: "screenshot.path",
		message: "Provide the path to the screenshot.",
		when(answers) {
			return answers.screenshot.answer[0] === "Yes";
		},
	},
	{
		type: "checkbox",
		name: "collaborators.answer",
		message: "Did anyone help you with this project?",
		choices: ["Yes", "No"],
	},
	{
		type: "input",
		name: "collaborators.names",
		message: "What is their name? (Seperate By Comma)",
		when(answers) {
			return answers.collaborators.answer[0] === "Yes";
		},
	},
	{
		type: "list",
		name: "license.name",
		message: "What kind of license does your project include?",
		choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "none"],
	},
	// {
	// 	type: "checkbox",
	// 	name: "badges",
	// 	message: "Do you want to include any badges",
	//     choices: ["Yes", "No"],
	// },
	{
		type: "checkbox",
		name: "contribute.answer",
		message: "Do you want to include a way for others to contibute?",
		choices: ["Yes", "No"],
	},
	{
		type: "input",
		name: "contribute.location",
		message: "How would you like future contributors to reach out?",
		when(answers) {
			return answers.contribute.answer[0] === "Yes";
		},
	},
	{
		type: "checkbox",
		name: "test.answer",
		message: "Do you want to include a way for others to test?",
		choices: ["Yes", "No"],
	},
	{
		type: "input",
		name: "test.steps",
		message: "Write out a test for your program.",
		when(answers) {
			return answers.test.answer[0] === "Yes";
		},
	},
];

const colabQuestions = [
	{
		type: "input",
		name: "colabnum",
		message: "How many collaborators were there? (Not including you)",
	},
	{
		type: "input",
		name: "colabname",
		message: "What is their name? (One at a time)",
	},
	{
		type: "input",
		name: "colabgit",
		message: "What is their github? (One at a time)",
	}
];

const badgeQuestions = [
	{
		type: "input",
		name: "badgenum",
		message: "How many badges do you wish to have?",
	},
	{
		type: "input",
		name: "badge",
		message: "Provide the path to the badge.",
	},
	{
		type: "input",
		name: "features",
		message: "List your projects features.",
	}
];

const contibuteQuestions = [
	{
		type: "input",
		name: "contibuteinput",
		message: "How would you like future contributors to reach out",
	}
];

const testQuestions = [
	{
		type: "input",
		name: "testinput",
		message: "Write out a test for your program.",
	}
];


async function writeToFile(fileName, contents) {
    try {
        await fs.appendFile(fileName, contents);
        console.log("Read Me Created!");
    } catch (error) {
        console.log("ERROR", error);
    };
};

function start() {
    inquirer.prompt(startQuestions).then((data) => {
		if (data.create[0] === "No") {
			console.log("Why are you here then?");
			process.exit();
		} else if (data.create[0] === "Yes") {
            base();
		}
	});
};

async function base() {
        
    var text = await inquirer.prompt(baseQuestions).then(answers => {
        return answers;
    });

    var contents = generateMarkdown(text);

    writeToFile(text.filename, contents);
}

// TODO: Create a function to initialize app
function init() {
    start();
};

// Function call to initialize app
init();
