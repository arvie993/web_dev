// Generate a random love score between 1 and 100
let loveScore = Math.random() * 100;
loveScore = Math.floor(loveScore) + 1;

// Helper to show a message in browser (alert) or Node (console)
function showMessage(msg) {
    if (typeof alert !== 'undefined') {
        alert(msg);
    } else {
        console.log(msg);
    }
}

showMessage("Your love score is " + loveScore + "%");

if (loveScore >= 80) {
    showMessage("You are in love!");
} else if (loveScore > 50) {
    showMessage("You like them!");
} else {
    showMessage("You are just friends.");
}