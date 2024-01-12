// External packages
const inquirer = require('inquirer');
const fs = require('./node_modules/graceful-fs/graceful-fs');

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
    setTextElement(text, color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(bgColor){
        this.shapeElement = bgColor.render()

    }
    
}

// Array of questions for user input
const questions = [
        {
            type: 'input',
            name: 'text',
            message: 'Letters: Enter up to 3 characters:',
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Choose a color keyword or a hexadecimal number for your letters:',
        },
        {
            type: 'list',
            message: 'Choose your background shape:',
            name: 'bgShape',
            choices: ['Circle', 'Square', 'Triangle'],     
        },
        {
            type: 'input',
            name: 'bgColor',
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

//Function to initialize app
async function init() {
    console.log("Choose your logo specifics.");
	var svgString = "";
	var svgFile = "logo.svg";

    // Prompt the user for userResponses
    const userResponses = await inquirer.prompt(questions);

	//userResponse letters
	var userText = "";
	if (userResponses.text.length > 0 && userResponses.text.length < 4) {
		// 1-3 chars, valid
		userText = userResponses.text;
	} else {
		// 0 or 4+ chars, invalid
		console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
	}
	console.log("User text: [" + userText + "]");

	//user text color
	userTextColor = userResponses.textColor;
	console.log("User letter color: [" + userTextColor + "]");

	//user chosen shape
	userBgShape = userResponses.bgShape;
	console.log("User entered shape = [" + userBgShape + "]");

    //userShapeColor
    userBgColor = userResponses.bgColor;
	console.log("User shape color: [" + userBgColor + "]");

	
	//user shape
	let userShapeType;
	if (userBgShape === "Square" || userBgShape === "square") {
		userShapeType = new Square();
		console.log("User selected Square shape");
	}
	else if (userBgShape === "Circle" || userBgShape === "circle") {
		userShapeType = new Circle();
		console.log("User selected Circle shape");
	}
	else if (userBgShape === "Triangle" || userBgShape === "triangle") {
		userShapeType = new Triangle();
		console.log("User selected Triangle shape");
	}
	else {
		console.log("Invalid shape!");
	}
	userShapeType.setColor(userBgColor);

	// Create a new Svg instance and add the shape and text elements to it
	var svg = new Svg();
	svg.setTextElement(userText, userTextColor);
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