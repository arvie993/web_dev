// Guest list name checker (Node.js version)
// Note: In a browser you can use prompt(). In Node.js we use the built-in readline module instead.

const readline = require('readline');

const guestList = ["Alice", "Bob", "Charlie", "David", "Eve"];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your name: ", (input) => {
    const userName = (input || "").trim();

    if (!userName) {
        console.log("You didn't enter a name.");
    } else if (guestList.includes(userName)) { // exact, case-sensitive match to stay close to original behavior
        console.log("Welcome to the party, " + userName + "!");
    } else {
        console.log("Sorry, you are not on the guest list.");
    }
    rl.close();
});

rl.on('close', () => {
    process.exit(0);
});