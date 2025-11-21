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
let inventorySize = 10;
let hasWeapon = false;
let hasPotion = false;
let hasArmor = false;

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
        console.log("5: Check your inventory");
        console.log("6: Quit game");

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
    } else if (currentLocation === "Market") {
        console.log("=== MARKET ===");
        console.log("You are in the bustling market.");
        console.log("Stalls line the streets, filled with exotic goods and lively merchants.");
        console.log("What would you like to do?");
        console.log("1: Return to the village");
        console.log("2: Go to the shop");
        console.log("3: Check your status");
        console.log("4: Quit game");
    } else if (currentLocation === "Forest") { 
        console.log("=== FOREST ===");
        console.log("You are in the dark forest.");
        console.log("The trees tower above you, their leaves blocking out most of the sunlight.");
        console.log("You hear the sounds of wildlife all around you.");
        console.log("What would you like to do?");
        console.log("1: Return to the village");
        console.log("2: Explore deeper into the forest");
        console.log("3: Check your status");
        console.log("4: Quit game");
    }

    // Handle player movement choices from town square. Handle invalid inputs.
    let validChoice = false;
    while (!validChoice) {
        try {
            let choice = readline.question("Enter the number of your choice: ");
            
            if (choice.trim() === "") {
                throw "Invalid input. Please enter a number.";
            }

            choice = parseInt(choice);

            if (isNaN(choice)) {
                throw "That's not a number. Please enter a valid number.";
            }
      
            if (currentLocation === "Village") {
                if (choice < 1 || choice > 6) {
                    throw "Choice out of range. Please choose a number between 1 and 6.";
                }

                validChoice = true;

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
                    for (let i = 1; i <= inventorySize; i++) {
                        if (inventory.length === 0) {
                            console.log("Your inventory is empty.");
                            break;
                        }
                        console.log('Checking inventory...');
                        console.log(`Checking item slot ${i}...`);
                        if (inventory[i - 1]) {
                            console.log(`Found: ${inventory[i - 1]}`);
                        } else {
                            console.log(`${i}: Empty Slot`);
                        }
                    }
                }
                else if (choice === 6) {
                    gameRunning = false;
                    console.log("Thank you for playing the Adventure Game!");
                } else {
                    console.log("Invalid choice. Please try again.");
                }
            } else if (currentLocation === "Blacksmith") {
        
                if (choice < 1 || choice > 3) {
                    throw "Choice out of range. Please choose a number between 1 and 4.";
                }

                validChoice = true;
                if (choice === 1) {
                    currentLocation = "Village";
                    console.log("You return to the village square.");
                } else if (choice === 2) {
                    console.log(`Status - Health: ${playerHealth}, Gold: ${playerGold}, Location: ${currentLocation}`);
                } else if (choice === 3) {
                    gameRunning = false;
                    console.log("Thank you for playing the Adventure Game!");
                }
            } else if (currentLocation === "Market") { 
                if (choice < 1 || choice > 4) { 
                    throw "Choice out of range. Please choose a number between 1 and 4.";
                }

                validChoice = true;
                if (choice === 1) {
                    currentLocation = "Village";
                    console.log("You return to the village square.");
                } else if (choice === 2) {
                    console.log("You enter the shop.");
                } else if (choice === 3) {
                    console.log(`Status - Health: ${playerHealth}, Gold: ${playerGold}, Location: ${currentLocation}`);
                } else if (choice === 4) { 
                    console.log("Thank you for playing the Adventure Game!");
                    gameRunning = false;
                }
            }
        } catch (error) { 
            console.log("Error: " + error);
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
                goblinHealth += weaponDamage - onsterDefense;
                if (goblinHealth <= 0) {
                    console.log("You have defeated the goblin!");
                    playerGold += 10;
                    console.log("You found 10 gold on the goblin.");
                    break;
                } else if (playerHealth <= 0) { 
                    console.log("You have been defeated by the goblin. Game over.");
                    gameRunning = false;
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