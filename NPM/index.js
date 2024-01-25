import generateName from "sillyname";
import sh from "superheroes";

var sillyName = generateName();
var heroName = sh.random();

console.log(`My name is ${sillyName} and I am ${heroName}`);