// var generateName = require("sillyname");

import generateName from 'sillyname';
var sillyName = generateName();

// In superheroes v4, the default export is the array of names and the random picker
// function is exported as a named export `randomSuperhero`.
import superheroes, {randomSuperhero} from 'superheroes';
// Pick a random hero name using the named export function
const heroName = randomSuperhero();


console.log(`My name is ${sillyName}.`);
console.log(`My superhero name is ${heroName}!`);