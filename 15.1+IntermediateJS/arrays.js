var guestList = ["Alice", "Bob", "Charlie", "David", "Eve"];
console.log(guestList[2]); // Outputs: Charlie

console.log(guestList.length); // Outputs: 5

console.log(guestList[guestList.length - 1]); // Outputs: Eve

guestList.push("Frank");
console.log(guestList); // Outputs: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"]

console.log(guestList.includes("Alice")); // Outputs: true

