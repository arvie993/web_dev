var names = ["Angela", "Ben", "Jenny", "Michael", "Chloe", "Aravind", "Carla"];
function whosBuyingLunch() {
    var numberofPeople = names.length;
    var randomIndex = Math.floor(Math.random() * numberofPeople);
    var randomPerson = names[randomIndex];
    return randomPerson + " is going to buy lunch today!";
}

console.log(whosBuyingLunch());