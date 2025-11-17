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


// Display welcome message and starting stats
playerName = readline.question("Enter your character's name: ");
console.log(`Welcome, ${playerName}! You start your adventure in the ${playerLocation}.`);
console.log(`Health: ${playerHealth}, Gold: ${playerGold}`);

console.log("-------------------------------");
// Initialize weapon damage
let weaponDamage = 0;
console.log(`Your current weapon damage is: ${weaponDamage}`);

console.log("-------------------------------");
// Create variable to track weapon damage
let weapon = "Sword";
console.log(`When you buy a sword, weapon damage will increase to 10!`);

console.log("-------------------------------");
 // Setup a simple monster defense value
let onsterDefense = 5;
console.log(`The monster you will face has a defense of: ${onsterDefense}`);
console.log(`Monsters can withstand some damage in combat!`);

console.log("-------------------------------");
// Set healing potion restoration value
let healingPotionValue = 30;
console.log(`Healing potions will restore ${healingPotionValue} health points!`);
console.log(`You can find healing potions in the shop!`);


console.log("-------------------------------");
// Track current location and first visit status
let currentLocation = "Village";
console.log(`You are currently in the ${currentLocation}. Explore to find new locations!`);

let firstVisit = true;
console.log(`This is your first visit to this location: ${firstVisit}`);
console.log(`First visits often have special events or items!`);

// Check if player is in tavern and display appropriate message
let inTavern = true;
if (inTavern) {
  console.log("You are in the tavern. You can rest and recover your health here.");
} else {
  console.log("You are not in the tavern. Find it to rest and recover.");
}


while (gameRunning) {
    console.log("-------------------------------");
    if (currentLocation === "Village") {
        console.log("=== VILLAGE ===");
        console.log("You are in the peaceful village of Eldenbrook.");
        console.log("You stand in the center of the village square. The air smells of bread and iron.");
        if (firstVisit) {
            console.log("As this is your first visit, you receive a welcome gift of 10 gold!");
            playerGold += 10;
            firstVisit = false;
        }
        console.log("------------------------------");
        console.log("Where would you like to go?");
        console.log("1: Visit the blacksmith");
        console.log("2. Visit the market");
        console.log("3: Enter the forest");
        console.log("4: Check your status");
        console.log("5: Quit game");

        console.log("Villager: `Welcome, adventurer! Rumor has it there's a dragon in the mountains...`");
    } else if (currentLocation === "Blacksmith") {
        console.log("=== BLACKSMITH ===");
        console.log("You are at the blacksmith's forge.");
        console.log("The forge glows hot as the blacksmith hammers at a glowing blade.");
        console.log("You smell smoke and hear the ring of metal on metal.");
        console.log("------------------------------");
        console.log("What would you like to do?");
        console.log("1: Return to the village");
        console.log("2: Check your status");
        console.log("3: Quit game");
    }

    // Handle player movement choices from town square
    let choice = parseInt(readline.question("Enter the number of your choice: "));
    if (currentLocation === "Village") {
        if (choice === 1) {
            currentLocation = "Blacksmith";
            console.log("You head to the blacksmith's forge.");
        } else if (choice === 2) {
            currentLocation = "Market";
            console.log("You visit the bustling market.");
        } else if (choice === 3) {
            currentLocation = "Forest";
            console.log("You enter the dark forest.");
        } else if (choice === 4) {
            console.log(`Status - Health: ${playerHealth}, Gold: ${playerGold}, Location: ${currentLocation}`);
        } else if (choice === 5) {
            gameRunning = false;
            console.log("Thank you for playing the Adventure Game!");
        } else {
            console.log("Invalid choice. Please try again.");
        }
    } else if (currentLocation === "Blacksmith") {
        if (choice === 1) {
            currentLocation = "Village";
            console.log("You return to the village square.");
            currentLocation = "Village";
        } else if (choice === 2) {
            console.log(`Status - Health: ${playerHealth}, Gold: ${playerGold}, Location: ${currentLocation}`);
        } else if (choice === 3) {
            gameRunning = false;
            console.log("Thank you for playing the Adventure Game!");
        } else {
            console.log("Invalid choice. Please try again.");
        }
    }


    // Create battle loop for monster combat
    while (currentLocation === "Forest" && gameRunning) {
        console.log("-------------------------------");
        console.log("A wild goblin appears!");
        let goblinHealth = 50;

        while (goblinHealth > 0) {
            console.log(`Your Health: ${playerHealth}, Goblin Health: ${goblinHealth}`);
            console.log("1: Attack");
            console.log("2: Run");
            let battleChoice = parseInt(readline.question("Enter the number of your choice: "));

            if (battleChoice === 1) {
                console.log("Battle started! You attack the goblin!");
                goblinHealth -= weaponDamage;
                if (goblinHealth <= 0) {
                    console.log("You have defeated the goblin!");
                    playerGold += 10;
                    console.log("You found 10 gold on the goblin.");
                    break;
                }
            }
            else if (battleChoice === 2) {
                console.log("You run back to the village!");
                currentLocation = "Village";
                break;
            }
        }
    }
}