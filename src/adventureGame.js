/*
Adventure Game
[Description of the game]
*/
const readline = require("readline-sync");

// FUNCTIONS
function displayStatus() { 
    console.log(`Status - Health: ${playerHealth}, Gold: ${playerGold}, Location: ${currentLocation}`);
}

function displayLocationInfo() { 
    if (currentLocation === "Village") {
        console.log("=== VILLAGE ===");
        console.log("You are in the peaceful village of Eldenbrook.");
        console.log("You stand in the center of the village square. The air smells of bread and iron.");
        if (firstVisit) {
            console.log("As this is your first visit, you receive a welcome gift of 10 gold!");
            playerGold += 10;
            firstVisit = false;
        }
        console.log("-------------------------------");
        console.log("Villager: `Welcome, adventurer! Rumor has it there's a dragon in the mountains...`");
        console.log("------------------------------");

        console.log("Where would you like to go?");
        console.log("1: Visit the blacksmith");
        console.log("2. Visit the market");
        console.log("3: Enter the forest");
        console.log("4: Check your status");
        console.log("5: Check your inventory");
        console.log("6: Quit game");
    } else if (currentLocation === "Blacksmith") {
        console.log("=== BLACKSMITH ===");
        console.log("You are at the blacksmith's forge.");
        console.log("The forge glows hot as the blacksmith hammers at a glowing blade.");
        console.log("You smell smoke and hear the ring of metal on metal.");
        console.log("------------------------------");
        console.log("What would you like to do?");
        console.log("1: Return to the village");
        console.log("2: Check your status");
        console.log("3: Buy a sword for 15 gold");
        console.log("4: Quit game");
    } else if (currentLocation === "Market") {
        console.log("=== MARKET ===");
        console.log("You are in the bustling market.");
        console.log("Stalls line the streets, filled with exotic goods and lively merchants.");
        console.log("What would you like to do?");
        console.log("1: Return to the village");
        console.log("2: Buy a healing potion for 10 gold");
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
}

function checkInventory() {
    console.log('Checking inventory...');
    for (let i = 1; i <= inventorySize; i++) {
        if (inventory.length === 0) {
            console.log("Your inventory is empty.");
            break;
        }
        if (inventory[i - 1]) {
            console.log(`Found: ${inventory[i - 1]}`);
        } else {
            console.log(`${i}: Empty Slot`);
        }
    }
}


function move(choice) {
    if (currentLocation === "Village") {
        if (choice === 1) {
            currentLocation = "Blacksmith";
            return true;
        } else if (choice === 2) {
            currentLocation = "Market";
            return true;
        } else if (choice === 3) {
            currentLocation = "Forest";
            return true;
        }    
    } else if (currentLocation === "Blacksmith") {
        if (choice === 1) {
            currentLocation = "Village";
            return true;
        }
    } else if (currentLocation === "Market") {
        if (choice === 1) {
            currentLocation = "Village";
            return true;
        }
    } else if (currentLocation === "Forest") {
        if (choice === 1) {
            currentLocation = "Village";
            return true;
        }
    }
    return false;
}


function checkCombatResult() {
    console.log("A wild goblin appears!");
    let wynik;

    let monsterHealth = 30;

    while (monsterHealth > 0 && playerHealth > 0) {
        console.log(`Your Health: ${playerHealth}, Goblin Health: ${monsterHealth}`);
        console.log("1: Attack");
        console.log("2: Run back to the village");
        console.log("3. Use Healing Potion");
        let battleChoice = parseInt(readline.question("Enter the number of your choice: "));


        if (battleChoice === 1) {
            console.log("You attack the goblin!");
            let damageDealt = Math.max(0, weaponDamage - monsterDefense);
            monsterHealth -= damageDealt;
            console.log(`You dealt ${damageDealt} damage to the goblin.`);

            console.log("The goblin attacks you back!");
            updateHealth(-10);

            if (monsterHealth <= 0) {
                console.log("You have defeated the goblin!");
                //playerGold += 10;
                console.log("You found 10 gold on the goblin.");
                wynik = "win";
                break;
            } else if (playerHealth <= 0) {
                console.log("You have been defeated by the goblin. Game over.");
                //gameRunning = false;
                wynik = "lose";
                break;
            }
        }
        else if (battleChoice === 2) {
            console.log("You run back to the village!");
            //currentLocation = "Village";
            wynik = "run";
            break;
        }
        else if (battleChoice === 3) { 
            updateHealth(healingPotionValue);
            // Remove one healing potion from inventory
        }
    }
    return wynik;
}

function updateHealth(amount) { 
    playerHealth += amount;

    if (playerHealth > 100) {
        playerHealth = 100;
        console.log("Your health is already full.");
    }

    if (playerHealth <= 0) {
        playerHealth = 0;
        console.log("You have died. Game over.");
    }

    console.log(`Your health is now ${playerHealth}.`);
    return playerHealth;
}


// Display the game title
console.log("===|| WELCOME TO THE ADVENTURE GAME ||===");
console.log("=== Prepare yourself for an epic journey! ===");

//Variables for player stats
let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let playerLocation = "Village";
let gameRunning = true;
let inventory = [];
let inventorySize = 10;
let weapon = "Sword";
let weaponDamage = 0;
let monsterDefense = 5;
let healingPotionValue = 30;
let hasWeapon = false;
let hasPotion = false;
let hasArmor = false;

// Display welcome message and starting stats
playerName = readline.question("Enter your character's name: ");
console.log("-------------------------------");
console.log(`Welcome, ${playerName}! You start your adventure in the ${playerLocation}.`);
console.log(`Health: ${playerHealth}, Gold: ${playerGold}, Weapon Damage: ${weaponDamage}`);

console.log("-------------------------------");
// Create variable to track weapon damage
console.log(`When you buy a sword, weapon damage will increase to 10!`);
console.log(`The monster you will face has a defense of ${monsterDefense}`);

console.log("-------------------------------");
// Set healing potion restoration value
console.log(`Healing potions will restore ${healingPotionValue} health points!`);
console.log(`You can find healing potions in the shop!`);


console.log("-------------------------------");
// Track current location and first visit status
let currentLocation = "Village";
let firstVisit = true;

console.log(`You are currently in the ${currentLocation}. Explore to find new locations!`);
if (firstVisit) {
    console.log(`This is your first visit to this location. First visits often have special events or items!`);
}

// Check if player is in tavern and display appropriate message
/*let inTavern = true;
if (inTavern) {
  console.log("You are in the tavern. You can rest and recover your health here.");
} else {
  console.log("You are not in the tavern. Find it to rest and recover.");
}
*/

// Main Game Loop
while (gameRunning) {
    console.log("-------------------------------");
    displayLocationInfo();
    displayStatus();
    
    // Handle player movement choices from town square. Handle invalid inputs.
    let validChoice = false;
    let choice; // Declare 'choice' outside the try block

    while (!validChoice) {
        try {
            // --- Input Reading & Initial Validation ---
            let rawInput = readline.question("Enter the number of your choice: ");
            
            if (rawInput.trim() === "") {
                throw "Invalid input. Please enter a number.";
            }

            choice = parseInt(rawInput);

            if (isNaN(choice)) {
                throw "That's not a number. Please enter a valid number.";
            }
            
            // --- Check Input Range based on Location ---
            // This is still good practice to keep inside the try block since it's user-input-driven validation
            if (currentLocation === "Village") {
                if (choice < 1 || choice > 6) {
                    throw "Choice out of range. Please choose a number between 1 and 6.";
                }
            } else if (currentLocation === "Blacksmith") {
                // NOTE: DisplayInfo shows choices 1-4, but you only handle 1-3. Fixed range to match Blacksmith display (1, 2, 3, 4)
                if (choice < 1 || choice > 4) { 
                    throw "Choice out of range. Please choose a number between 1 and 4.";
                }
            } else if (currentLocation === "Market") {
                if (choice < 1 || choice > 4) {
                    throw "Choice out of range. Please choose a number between 1 and 4.";
                }
            } else if (currentLocation === "Forest") {
                if (choice < 1 || choice > 4) {
                    throw "Choice out of range. Please choose a number between 1 and 4.";
                }
            }
            
            // If all input and range checks pass, we can proceed to logic and set validChoice = true
            validChoice = true; 

        } catch (error) {
            console.log("Error: " + error);
            // validChoice remains false, loop repeats
            continue; 
        }

        // --- Game Logic Execution (Runs only if input is valid) ---
        
        // Village Logic
        if (currentLocation === "Village") {
            if (choice <= 3) {
                if (!move(choice)) {
                    console.log("Move failed. Please try again.");
                }
            } else if (choice === 4) {
                displayStatus();
                validChoice = false; // Stay in the input loop after checking status
            } else if (choice === 5) {
                checkInventory();
                validChoice = false; // Stay in the input loop after checking inventory
            }
            else if (choice === 6) {
                gameRunning = false;
                console.log("Thank you for playing the Adventure Game!");
            }

        // Blacksmith Logic
        } else if (currentLocation === "Blacksmith") {
            if (choice === 1) {
                if (!move(choice)) {
                    console.log("Move failed. Please try again.");
                }
            } else if (choice === 2) {
                displayStatus();
                validChoice = false; // Stay in the input loop
            } else if (choice === 3) {
                // NOTE: Your Blacksmith choices are 1, 2, 3, 4, but your previous code only handled 1, 2, 3.
                // Assuming choice 3 is "Buy a sword"
                if (playerGold >= 15) {
                    playerGold -= 15;
                    inventory.push("Sword");
                    weaponDamage = 10;
                    hasWeapon = true;
                    console.log("You bought a shiny new sword! Your weapon damage is now 10.");
                } else {
                    console.log("You do not have enough gold for the sword (15 gold required).");
                }
                validChoice = false; // Stay in the input loop
            }
            else if (choice === 4) { // Handling the new 'Quit' choice
                gameRunning = false;
                console.log("Thank you for playing the Adventure Game!");
            }

        // Market Logic
        } else if (currentLocation === "Market") {
            if (choice === 1) {
                if (!move(choice)) {
                    console.log("Move failed. Please try again.");
                }
            } else if (choice === 2) {
                // Buy Healing Potion
                if (playerGold >= 10) {
                    playerGold -= 10;
                    inventory.push("Healing Potion");
                    hasPotion = true;
                    console.log("You bought a healing potion for 10 gold and put it in your inventory!");
                } else {
                    console.log("You do not have enough gold for a healing potion (10 gold required).");
                }
                validChoice = false; // Stay in the input loop
            } else if (choice === 3) {
                displayStatus();
                validChoice = false; // Stay in the input loop
            } else if (choice === 4) {
                console.log("Thank you for playing the Adventure Game!");
                gameRunning = false;
            }

        // Forest Logic
        } else if (currentLocation === "Forest") {
            if (choice === 1) {
                if (!move(choice)) {
                    console.log("Move failed. Please try again.");
                }
            } else if (choice === 2) {
                console.log("You venture deeper into the forest...");
                
                // --- Call Combat Function and handle result ---
                // Reset monster stats before combat if needed
                monsterHealth = 20; 
                goblinHealth = 20; // Re-initializing to start a new fight
                
                let combatResult = checkCombatResult();

                if (combatResult === "win" || combatResult === "run") {
                    // Successful action (win or run), return to the main loop start
                    currentLocation = (combatResult === "run") ? "Village" : currentLocation; 
                } else if (combatResult === "lose") {
                    gameRunning = false;
                }

                validChoice = true; // Combat is a complete turn, exit the inner loop
                
            } else if (choice === 3) {
                displayStatus();
                validChoice = false; // Stay in the input loop
            } else if (choice === 4) {
                console.log("Thank you for playing the Adventure Game!");
                gameRunning = false;
            }
        }
    } // end of while (!validChoice)
} // end of while (gameRunning)