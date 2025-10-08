// var buttons = document.querySelectorAll(".drum");

// for (var i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener("click", function () {
//         var key = this.innerHTML.trim();
//         var soundMap = {
//             w: "tom-1",
//             a: "tom-2",
//             s: "tom-3",
//             d: "tom-4",
//             j: "snare",
//             k: "crash",
//             l: "kick-bass"
//         };
//         var soundFile = soundMap[key];
//         if (!soundFile) return;
//         var audio = new Audio("sounds/" + soundFile + ".mp3");
//         audio.play();
//     });
// }

// Detecting Button Press

var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML;
        buttonAnimation(buttonInnerHTML);
        switch (buttonInnerHTML) {
            case "w":
                var tom1 = new Audio("sounds/tom-1.mp3");
                tom1.play();
                break;
            case "a":
                var tom2 = new Audio("sounds/tom-2.mp3");
                tom2.play();
                break;
            case "s":
                var tom3 = new Audio("sounds/tom-3.mp3");
                tom3.play();
                break;
            case "d":
                var tom4 = new Audio("sounds/tom-4.mp3");
                tom4.play();
                break;
            case "j":
                var snare = new Audio("sounds/snare.mp3");
                snare.play();
                break;
            case "k":
                var crash = new Audio("sounds/crash.mp3");
                crash.play();
                break;
            case "l":
                var kick = new Audio("sounds/kick-bass.mp3");
                kick.play();
                break;
            default: console.log(buttonInnerHTML);
        }

    });
}



// Detecting Keyboard Press
document.addEventListener("keypress", function (event) {
    makeSound(event.key);
    buttonAnimation(event.key);
});

function makeSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");  
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "k":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
        case "l":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
    }
}

// Alternative approach using data-key attributes for better scalability

// document.addEventListener("keydown", function (event) {
//     var key = event.key.toLowerCase();
//     var soundMap = {
//         w: "tom-1",
//         a: "tom-2",
//         s: "tom-3",
//         d: "tom-4",
//         j: "snare",
//         k: "crash",
//         l: "kick-bass"
//     };
//     var colorMap = {
//         w: "white",
//         a: "white",
//         s: "white",
//         d: "white",
//         j: "black",
//         k: "black",
//         l: "white"
//     };
//     var soundFile = soundMap[key];
//     if (!soundFile) return;
//     var audio = new Audio("sounds/" + soundFile + ".mp3");
//     audio.play();
//     // Prefer data-key if added; fallback to innerText for robustness
//     var button = document.querySelector('.drum[data-key="' + key + '"]') ||
//         Array.from(document.querySelectorAll(".drum")).find(function (b) {
//             return b.innerText.trim().toLowerCase() === key;
//         });
//     if (button) {
//         button.style.color = colorMap[key];
//         // Optional: revert after a short delay for a flash effect
//         setTimeout(function () {
//             button.style.color = "";
//         }, 1500);
//     } else {
//         console.warn("No drum button found for key:", key);
//     }
// });


// Button Animation
function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    if (activeButton) {
        activeButton.classList.add("pressed");
        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 150);
    }
}