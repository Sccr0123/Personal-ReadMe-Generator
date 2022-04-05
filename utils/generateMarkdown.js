// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
	var badge = "";
	if (license === "MIT") {
		badge =
			`[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
			`;
	} else if (license === "APACHE 2.0") {
		badge =
			`[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
			`;
	} else if (license === "GPL 3.0") {
		badge =
			`[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
			`;
	} else if (license === "BSD 3") {
		badge =
			`[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
			`;
	} else {
		badge = "";
	}

	return badge;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
	console.log(data);

	console.log(license.name);
	data.license.final = renderLicenseBadge(license.name);

	//Table of Contents
	if (data.tableofcontents[0] === "Yes") {
		data.tableofcontents.final = `## Table of Contents

  [Installation](#installation)
  [Usage](#usage)
  [License](#credits)
  [Contributing](#contributing)
  [Tests](#tests)
  [Questions](#questions)`;
	} else {
		data.tableofcontents.final = "";
	}

	//Screenshot
	if (data.screenshot.answer[0] === "Yes") {
		data.usage.final = `## Usage

  ${data.usage.text}
  ${data.screenshot.path}`;
	} else {
		data.usage.final = `## Usage

    ${data.usage.text}`;
	}

	//Credits
	if (data.collaborators.answer[0] === "Yes") {
		data.collaborators.final = `## Credits

  ${data.collaborators.names}`;
	} else {
		data.collaborators.final = "";
	}

	//License
	if (data.license.name != "none") {
		data.license.final = `## License

  ${data.license.name}`;
	} else if (data.license.name === "none") {
		data.license.final = "";
	}

	//How to Contribute
	if (data.contribute.answer[0] === "Yes") {
		data.contribute.final = `## How to Contribute

  ${data.contribute.location}`;
	} else {
		data.contribute.final = "";
	}

	//Tests
	if (data.test.answer[0] === "Yes") {
		data.test.final = `## Tests

  ${data.test.steps}`;
	} else {
		data.test.final = "";
	}

	//Return
	return `# ${data.title}
${data.license.final}
## Description
  - ${data.motivation}
  - ${data.reason}
  - ${data.problem}
  - ${data.learned}
  
${data.tableofcontents.final}

## Installation

  ${data.installation.text}

${data.usage.final}

${data.collaborators.final}

${data.license.final}

${data.contribute.final}

${data.test.final}
`;
}

module.exports = generateMarkdown;
