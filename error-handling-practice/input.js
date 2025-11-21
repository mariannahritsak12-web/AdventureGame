// Load the readline-sync library
const readline = require('readline-sync');
/*
// Get input from the user
let name = readline.question("What is your name? ");
console.log(`Hello, ${name}! Welcome to the adventure game.`);

let color = readline.question("What is your favorite color? ");
console.log(`Great choice! ${color} is a beautiful color.`);

// try to multiply text input to demonstrate error handling
try {
    let result = "hello" * 5;
    console.log("The result is: " + result);   
} catch (error) {
    console.log("Oops! Something went wrong while processing your input.", error.message);
}
console.log("Program continues running smoothly after the error.");
*/
/*
// Create a number for the user to guess
let secretNumber = 7;
// Get the user's guess
let userGuess = readline.question("Guess a number between 1 and 10: ");

try {
    let guessNumber = Number(userGuess);
    if (isNaN(guessNumber)) {
        throw "Invalid input. Please enter a numeric value.";
    }

    if (guessNumber < 1 || guessNumber > 10) {
        throw "Number out of range. Please guess a number between 1 and 10.";
    }

    if (guessNumber === secretNumber) {
        console.log("Congratulations! You guessed the correct number.");
    } else {
        console.log("Sorry, that's not correct. The secret number was " + secretNumber + ".");
    }
} catch (error) { 
    console.log("Error: " + error);
}
*/

// Get the age
let age = readline.question("What is your age? ");
// Add your validation code here
try {
    if (isNaN(age)) {
        throw "Invalid input. Please enter a valid number for your age.";
    }

    if (age < 0 || age > 120) {
        throw "This cannot be correct. Please enter a realistic age.";
    }

    if (age == "") {
        throw "Age cannot be empty. Please enter your age.";
    }

    console.log(`Your age is recorded as ${age}.`);
    if (age >= 16) {
        console.log("You can have a driver's license.");
    }
} catch (error) {
    console.log("Error message: " + error);
}