// External packages
const inquirer = require("inquirer");
const fs = require('fs');
const util = require('util');
// const fs = require('./node_modules/graceful-fs/graceful-fs');

// Internal
const {Circle, Square, Triangle} = require('./lib/shapes');


class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
    
};


// Array of questions for user input
const questions = [
        {
            type: 'input',
            name: 'letters',
            message: 'Letters: Enter up to 3 characters:',
        },
        {
            type: 'input',
            name: 'letter-color',
            message: 'Choose a color keyword or a hexadecimal number for your letters:',
        },
        {
            type: 'list',
            message: 'Choose your background shape:',
            name: 'shape',
            choices: ['Circle', 'Square', 'Triangle'],     
        },
        {
            type: 'input',
            name: 'shape-color',
            message: 'Choose a color keyword or a hexadecimal number for your background shape:',
        },       
    ];

    
// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Great work! Your logo.svg has been generated")
    });
};

const writeFileAsync = util.promisify(writeToFile);

//Function to initialize app
async function init() {
    console.log("Starting init");
	var svgString = "";
	var svgFile = "logo.svg";

    // Prompt the user for userResponses
    const userResponses = await inquirer.prompt(questions);

	//userResponse letters
	var userLetters = "";
	if (userResponses.letters.length > 0 && userResponses.letters.length < 4) {
		// 1-3 chars, valid
		userLetters = userResponses.letters;
	} else {
		// 0 or 4+ chars, invalid
		console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
	}
	console.log("User text: [" + userLetters + "]");

	//userLetter color
	userLetterColor = userResponses.letter-color;
	console.log("User letter color: [" + userLetterColor + "]");

	//userShape
	userShapeType = userResponses.shape;
	console.log("User entered shape = [" + userShapeType + "]");

    //userShapeColor
    userShapeColor = userResponses.shape-color;
	console.log("User shape color: [" + userShapeColor + "]");

	
	//user shape
	let userShapeType;
	if (userShapeType === "Square" || userShapeType === "square") {
		userShapeType = new Square();
		console.log("User selected Square shape");
	}
	else if (userShapeType === "Circle" || userShapeType === "circle") {
		userShapeType = new Circle();
		console.log("User selected Circle shape");
	}
	else if (userShapeType === "Triangle" || userShapeType === "triangle") {
		userShapeType = new Triangle();
		console.log("User selected Triangle shape");
	}
	else {
		console.log("Invalid shape!");
	}
	userShapeType.setColor(userShapeColor);

	// Create a new Svg instance and add the shape and text elements to it
	var svg = new Svg();
	svg.setTextElement(userLetters, userLetterColor);
	svg.setShapeElement(userShapeType);
	svgString = svg.render();
	
	//Print shape to log
	console.log("Displaying shape:\n\n" + svgString);
	//document.getElementById("svg_image").innerHTML = svgString;

	console.log("Shape generation complete!");
	console.log("Writing shape to file...");
	writeToFile(svgFile, svgString); 
}
init();