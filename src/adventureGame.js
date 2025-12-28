// ===ADVENTURE GAME===
// A simple text-based adventure game where players can explore locations, interact with NPCs, manage inventory, and engage in combat.

const readline = require("readline-sync");

// ===FUNCTIONS===

// DISPLAYING INFORMATION

function showHelp() {
    console.log("=== HELP MENU ===");
    console.log("\nMovement:");
    console.log(" - From the village, you can go to three locations: blacksmith's forge, market, and forest.");
    console.log(" - Use the numbered options to navigate between locations.");
    console.log(" - In each location, you can return to the village and perform specific actions such as buying items or engaging in combat.");

    console.log("\nInventory Management:");
    console.log(" - You can check your inventory at any time to see what items you have collected.");
    console.log(" - You can carry a limited number of items (5), so choose wisely what to keep.");

    console.log("\nStatus: ");
    console.log(" - Your health and gold are displayed regularly. Keep an eye on your health during combat.");
    console.log(" - You can buy weapons and healing potions to improve your chances of survival.");

    console.log("\nCombat: ");
    console.log(" - When you enter the forest, you may encounter monsters like goblins.");
    console.log(" - During combat, you can choose to attack, use healing items, or flee back to the village.");
    console.log(" - You must have a weapon to effectively fight monsters.");
    console.log(" - Defeating monsters rewards you with gold, but be careful not to let your health drop to zero!");

    console.log("\nItem Purchases:");
    console.log(" - You can buy a sword from the blacksmith to increase your attack damage.");
    console.log(" - Healing potions can be purchased from the market to restore health during combat.");
    console.log(" - Make sure you have enough gold before attempting to buy items.");

    console.log("Good luck on your adventure!");
}

// Function to display player status
function displayStatus() { 
    console.log("=== PLAYER STATUS ===");
    console.log(`Health: ${playerHealth}, Gold: ${playerGold}, Location: ${currentLocation}`);

    checkInventory();
}

function displayBattleStatus() {
    console.log("=== STATUS ===");
    console.log(`Your Health: ${playerHealth}, Weapon: ${weapon ? weapon.name : "None"}, Weapon Damage: ${weapon ? weapon.effect : 0}, Weapon durubility: , Weapon Defense: `); // ADD: Weapon durubility and defense 
    console.log(`Goblin Health: ${goblin.health}, Goblin Defense: ${goblin.defense}, Goblin Attack: ${goblin.attack}`); 
    console.log("-------------------------------");
}

// Function to display location information and options
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
        //console.log("4: Visit the tavern"); // Sleep and recover option - restores health points
        // console.log("5. Talk to the village elder"); // Future quest option - player can earn gold or items
        // console.log("6. Explore the village"); // Future exploration option - find hidden items
        // console.log("7: Learn new skills"); // Future skill learning option - improve combat abilities
        console.log("4: Check your status");
        console.log("5: Check your inventory");
        console.log("6. Use item");
        console.log("7: Quit game");
        console.log("8: Help");
    } else if (currentLocation === "Blacksmith") {
        console.log("=== BLACKSMITH ===");
        console.log("You are at the blacksmith's forge.");
        console.log("The forge glows hot as the blacksmith hammers at a glowing blade.");
        console.log("You smell smoke and hear the ring of metal on metal.");
        console.log("------------------------------");
        console.log("What would you like to do?");
        console.log("1: Return to the village");
        console.log("2: Check your status");
        // console.log("3: Talk to the blacksmith"); // Future NPC interaction option - gain information or side quests
        console.log("3: Check inventory"); 
        console.log("4. Use item");
        console.log("5: Buy a sword for " + sword.value + " gold");
        //console.log("4: Buy armor for 20 gold"); // Improve defense option
        // console.log("5. Upgrade weapon for 30 gold"); // Future weapon upgrade option - increase damage by 10
        // console.log("6: Sell items"); // Future item selling option
        // console.log("7: Craft items"); // Future crafting option
        console.log("6: Quit game");
        console.log("7: Help");
    } else if (currentLocation === "Market") {
        console.log("=== MARKET ===");
        console.log("You are in the bustling market.");
        console.log("Stalls line the streets, filled with exotic goods and lively merchants.");
        console.log("What would you like to do?");
        console.log("1: Return to the village");
        console.log("2: Buy a healing potion for " + healthPotion.value + " gold");
        //console.log("3: Buy food for 5 gold"); // Future health regeneration option
        // console.log("4: Buy supplies"); // Future item collection option - crafting system
        console.log("3: Check your status");
        console.log("4: Check inventory"); 
        console.log("5. Use item");
        console.log("6: Quit game");
        console.log("7: Help");
    } else if (currentLocation === "Forest") {
        console.log("=== FOREST ===");
        console.log("You are in the dark forest.");
        console.log("The trees tower above you, their leaves blocking out most of the sunlight.");
        console.log("You hear the sounds of wildlife all around you.");
        console.log("What would you like to do?");
        console.log("1: Return to the village");
        // Future options for forest exploration and activities
        console.log("2: Explore deeper into the forest"); // Potential combat encounter - earn gold
        // console.log("3: Gather herbs"); // Future item collection option - crafting system
        // console.log("4. Count the wildlife"); // Future exploration option - find hidden items
        // console.log("5: Set up camp"); // Future exploration option - find hidden items
        // console.log("6: Hunt"); // Future exploration option - earn food or gold
        // console.log("7: Take a side quest"); // Future exploration option - earn gold or items
        console.log("3: Check your status");
        console.log("4: Check inventory"); 
        console.log("5. Use item");
        console.log("6: Quit game");
        console.log("7: Help");
    } 
    // Go to the mountains - future location with stronger monsters and better rewards
    // Player can only access after reaching certain level or completing specific quests
    // Player should defeat a series of monsters to reach the dragon's lair
} 
// Function to check inventory
function checkInventory() {
    console.log('=== INVENTORY ===');
    for (let i = 1; i <= inventorySize; i++) {
        if (inventory.length === 0) {
            console.log("Your inventory is empty.");
            break;
        }
        if (inventory[i - 1]) {
            console.log(`${i}: ${inventory[i - 1].name}`);
        } 
    }
}

function hasItemType(type) {
    return inventory.some(item => item.type === type);
}

function useItem() {
    // Delete item from inventory after use
    if (inventory.length === 0) {
        console.log("Your inventory is empty.");
        return false;
    }
    
    checkInventory();
    let choice = readline.question("What item do you want to use? (enter number or 'c' to cancel): ");

    let index = parseInt(choice) - 1;

    if (index == isNaN || (index < 0 && index >= inventory.length)) {
        console.log("Invalid choice! Please try again.");
        return false;
    }

    let item = inventory[index];

    if (item.type === "potion") {
        updateHealth(item.effect);
        console.log(`You have used ${healthPotion.name}. Your health increased by ${healthPotion.effect}`);
    }
    else if (item.type === "weapon") {
        console.log("You're ready to fight!");
    }

    inventory.splice(index, 1);
    return true;
}

// GAMEPLAY FUNCTIONS
// Function to handle player movement
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

function buyFromMarket() {
    if (playerGold >= healthPotion.value) {
        playerGold -= healthPotion.value;
        inventory.push({ ...healthPotion });
        console.log("You bought a " + healthPotion.name + " for " + healthPotion.value + " gold and put it in your inventory!");
        } else {
            console.log("You do not have enough gold for a healing potion ( + " + healthPotion.value + " gold required).");
    }
    // CHANGE QUANTITY IF PLAYER BUYS MORE THAN ONE ITEM OF THE SAME NAME
}

function buyFromBlacksmith() {
    if (playerGold >= sword.value) {
        playerGold -= sword.value;
        inventory.push({ ...sword });
        console.log("You bought a " + sword.name + " for " + sword.value + " gold! Your weapon damage is now " + sword.effect + ".");
    } else {
        console.log("You do not have enough gold for the sword ( " + sword.value + " gold required).");
    }
    // CHANGE QUANTITY IF PLAYER BUYS MORE THAN ONE ITEM OF THE SAME NAME
}

const goblin = {
    name: "Goblin",
    type : "monster",
    health: 30,
    defense: 5,
    attack: 10,
    goldReward: 10
}

const dragon = {
    name: "Dragon",
    type : "monster",
    health: 100,
    defense: 15,
    attack: 25,
    goldReward: 100
}

const villageElder = {
    name: "Village Elder",
    type : "npc",
    dialogue: "The forest is dangerous. Be sure to prepare before you venture in.",
    quest: "Defeat the goblin in the forest to protect our village.",
    goldReward: 20
}

// Function to handle combat with a goblin
// Check if player has a weapon before allowing attack
function handleCombat() {
    if (!hasItemType("weapon")) {
        console.log("You don't have any weapon! You must retreat!");
        updateHealth(-20);
        return false;
    } else {
        return true;
    }
}

// Function to update player health
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

// Function to update player gold
function updateGold(amount) { 
    playerGold += amount;
    // TODO: Add checks for negative gold if needed
    return playerGold;
}

// DECLARING VARIABLES
let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let playerLocation = "Village";
let gameRunning = true;

let weapon = "Sword";
let weaponDamage = 0;
let monsterDefense = 5;
let healingPotionValue = 30;
let hasWeapon = false;
let hasPotion = false;
let hasArmor = false;

// Inventory system - array to store player items
let inventory = [];
let inventorySize = 5;

const healthPotion = {
    name: "Health Potion",
    type: "potion",
    value: 5,
    effect: 30,
    quantity: 0,
    description: "Restores 30 health points."
};

const sword = {
    name: "Sword",
    type: "weapon",
    value: 10,
    effect: 10,
    quantity: 0,
    description: "A sharp blade that increases your attack damage by 10."
};

const axe = {
    name: "Axe",
    type: "weapon",
    value: 20,
    effect: 30,
    quantity: 0,
    description: "A heavy axe that increases your attack damage by 30."
}

const woddenArmor = {
    name: "Wooden Armor",
    type: "armor",
    value: 8,
    effect: 10,
    quantity: 0,
    description: "A wooden shield that increases your defense by 10."
}

const ironArmor = {
    name: "Iron Armor",
    type: "armor",
    value: 15,
    effect: 20,
    quantity: 0,
    description: "A sturdy iron armor that increases your defense by 20."
}

// ===MAIN GAME CODE===

// Display the game title
console.log("===|| WELCOME TO THE ADVENTURE GAME ||===");
console.log("=== Prepare yourself for an epic journey! ===");

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

// MAIN GAME LOOP
while (gameRunning) {
    console.log("-------------------------------");
    displayLocationInfo();
    displayStatus();
    
    // Handle player movement choices from town square. Handle invalid inputs.
    let validChoice = false;
    let choice;

    while (!validChoice) {
        try {
            // --- Input Reading and Initial Validation ---
            let rawInput = readline.question("Enter the number of your choice: ");
            
            if (rawInput.trim() === "") {
                throw "Invalid input. Please enter a number.";
            }

            choice = parseInt(rawInput);

            if (isNaN(choice)) {
                throw "That's not a number. Please enter a valid number.";
            }
            
            // --- Check Input Range based on Location ---
            if (currentLocation === "Village") {
                if (choice < 1 || choice > 8) {
                    throw "Choice out of range. Please choose a number between 1 and 8.";
                }
            } else if (currentLocation === "Blacksmith") {
                if (choice < 1 || choice > 7) {
                    throw "Choice out of range. Please choose a number between 1 and 7.";
                }
            } else if (currentLocation === "Market") {
                if (choice < 1 || choice > 7) {
                    throw "Choice out of range. Please choose a number between 1 and 7.";
                }
            } else if (currentLocation === "Forest") {
                if (choice < 1 || choice > 7) {
                    throw "Choice out of range. Please choose a number between 1 and 7.";
                }
            }
            
            validChoice = true;

        } catch (error) {
            console.log("Error: " + error);
            continue;
        }
    }
        // --- Game Logic Execution  ---
        
        // Village Logic
        if (currentLocation === "Village") {
            if (choice <= 3) {
                if (!move(choice)) {
                    console.log("Move failed. Please try again.");
                }
            } else if (choice === 4) {
                displayStatus();
                validChoice = false;
            } else if (choice === 5) {
                checkInventory();
                validChoice = false;
            }
            else if (choice === 6) {
                useItem();
                validChoice = false;
            }
            else if (choice === 7) {
                gameRunning = false;
                console.log("Thank you for playing the Adventure Game!");
            }
            else if (choice === 8) {
                showHelp();
                validChoice = false;
            }

            // Blacksmith Logic
        } else if (currentLocation === "Blacksmith") {
            if (choice === 1) {
                if (!move(choice)) {
                    console.log("Move failed. Please try again.");
                }
            } else if (choice === 2) {
                displayStatus();
                validChoice = false;
            }
            else if (choice === 3) {
                checkInventory();
                validChoice = false;
            }
            else if (choice === 4) {
                useItem();
                validChoice = false;
            } else if (choice === 5) {
                // Buy Sword 
                buyFromBlacksmith();
                validChoice = false;
            }
            else if (choice === 6) {
                gameRunning = false;
                console.log("Thank you for playing the Adventure Game!");
            }
            else if (choice === 7) {
                showHelp();
                validChoice = false;
            }
        }
            // Market Logic
            else if (currentLocation === "Market") {
                if (choice === 1) {
                    if (!move(choice)) {
                        console.log("Move failed. Please try again.");
                    }
                } else if (choice === 2) {
                    // Buy Healing Potion
                    buyFromMarket();
                    validChoice = false;
                } else if (choice === 3) {
                    displayStatus();
                    validChoice = false;
                }
                else if (choice === 4) {
                    checkInventory();
                    validChoice = false;
                }
                else if (choice === 5) {
                    useItem();
                    validChoice = false;
                }
                else if (choice === 6) {
                    console.log("Thank you for playing the Adventure Game!");
                    gameRunning = false;
                }
                else if (choice === 7) {
                    showHelp();
                    validChoice = false;
                }

                // Forest Logic
            } else if (currentLocation === "Forest") {
                if (choice === 1) {
                    if (!move(choice)) {
                        console.log("Move failed. Please try again.");
                    }
                } else if (choice === 2) {
                    console.log("You venture deeper into the forest...");

                    console.log("A wild goblin appears!");
                    let monsterHealth = 30;
                    let weapon = inventory.find(item => item.type === "weapon");

                    while (monsterHealth > 0 && playerHealth > 0) {
                        displayBattleStatus();
                        if (handleCombat()) {
                            // TODO: INPUT VALIDATION
                            console.log("What will you do?");
                            console.log("1: Attack"); // Attack happens only if player has a weapon
                            console.log("2: Run back to the village");
                            console.log("3. Check inventory");
                            console.log("4. Use item");
                            // console.log("4: Defend"); // Future defense option - reduce damage taken next turn (use armor or shield)
                            // console.log("5: Use special ability"); // Future special ability option - unique player skills
                            let battleChoice = parseInt(readline.question("Enter the number of your choice: "));

                            if (battleChoice === 1) {
                                console.log("You attack the goblin!");
                                let damage = Math.max(0, weapon.effect - goblin.defense);
                                if (damage > 0) {
                                    goblin.health -= damage;
                                    console.log(`You dealt ${damage} damage to the goblin.`);
                                }
                                else {
                                    console.log("Your attack couldn't penetrate the goblin's defense!");
                                }

                                console.log("The goblin attacks you back!");
                                updateHealth(-10);

                                if (goblin.health <= 0) {
                                    console.log("------------------------------");
                                    console.log("You have defeated the goblin!");
                                    playerGold += 40;
                                    console.log("You found 40 gold on the goblin.");
                                    //wynik = "win";
                                    break;
                                } else if (playerHealth <= 0) {
                                    console.log("You have been defeated by the goblin!");
                                    console.log("GAME OVER.");
                                    gameRunning = false;
                                    //wynik = "lose";
                                    break;
                                }
                            }
                            else if (battleChoice === 2) {
                                console.log("You run back to the village!");
                                currentLocation = "Village";
                                // wynik = "run";
                                break;
                            }
                            else if (battleChoice === 3) {
                                checkInventory();
                                continue;
                            }
                            else if (battleChoice === 4) {
                                useItem();
                                continue;
                            }
                        } else {
                            currentLocation = "Village";
                            return;
                        }
                    }
                    validChoice = false;
                
                } else if (choice === 3) {
                    displayStatus();
                    validChoice = false;
                } else if (choice === 4) {
                    checkInventory();
                    validChoice = false;
                } else if (choice === 5) {
                    useItem();
                }
                else if (choice === 6) {
                    console.log("Thank you for playing the Adventure Game!");
                    gameRunning = false;
                }
                else if (choice === 7) {
                    showHelp();
                    validChoice = false;
                }
         }
    // end of while (!validChoice)
}// end of main game loop 
// ===END OF GAME CODE===