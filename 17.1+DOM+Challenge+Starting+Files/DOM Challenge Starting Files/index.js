// Basic styling (same approach you originally had)
document.querySelector("h1").style.color = "#8ED081";
document.querySelector("h1").style.fontFamily = "cursive";

// Only try to style an h2 if it exists (prevents the previous error)
var maybeH2 = document.querySelector("h2");
if (maybeH2) {
    maybeH2.style.color = "#8ED081";
}

// Player labels
var labels = document.querySelectorAll('.player-label');
for (var i = 0; i < labels.length; i++) {
    labels[i].style.color = '#8ED081';
    labels[i].style.fontSize = '1.5rem';
}

// Roll 2 numbers 1–6
var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

// Update dice images
var leftDiceImg = document.querySelector('.dice-left');
if (leftDiceImg) {
    leftDiceImg.setAttribute('src', '../images/dice' + randomNumber1 + '.png');
    leftDiceImg.setAttribute('alt', 'Dice showing ' + randomNumber1);
}

var rightDiceImg = document.querySelector('.dice-right');
if (rightDiceImg) {
    rightDiceImg.setAttribute('src', '../images/dice' + randomNumber2 + '.png');
    rightDiceImg.setAttribute('alt', 'Dice showing ' + randomNumber2);
}

// Decide winner
if (randomNumber1 > randomNumber2) {
    document.querySelector('h1').textContent = '🚩 Player 1 Wins!';
} else if (randomNumber2 > randomNumber1) {
    document.querySelector('h1').textContent = 'Player 2 Wins! 🚩';
} else {
    document.querySelector('h1').textContent = "😐 It's a Draw!";
}