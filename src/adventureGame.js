/*
Adventure Game
[Description of the game]
*/

const readline = require("readline-sync");

// Display the game title
console.log("Welcome to the Adventure Game!");

// Add a welcome message
console.log("Prepare yourself for an epic journey!");

//Variables for player stats
let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let playerLocation = "Village";
let gameRunning = true;
let inventory = [];

playerName = readline.question("Enter your character's name: ");

// Display welcome message and starting stats
console.log(`Welcome, ${playerName}! You start your adventure in the ${playerLocation}.`);
console.log(`Health: ${playerHealth}, Gold: ${playerGold}`);