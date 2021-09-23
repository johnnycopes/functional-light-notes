// https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md/#visualizing-curried-functions

const {
	unary,
	identity,
	spreadArgs,
	gatherArgs,
	partial,
	partialRight,
	reverseArgs,
	curry,
} = require("./functions/fp");

const adder = curry(add);

function add(x, y) {
	return x + y;
}

console.log([1,2,3,4,5].map(val => add(3, val))); // The signature of `add` doesn't match the callback function `map` expects
console.log([1,2,3,4,5].map(partial(add, 3))); // `partial` can adapt the signature into something that will match what we want
console.log([1,2,3,4,5].map(curry(add)(3))); // `curry` can do the same as partial, but in a more destructured way...
console.log([1,2,3,4,5].map(adder(3))); // ...like here, where we set up the `adder` ahead of time in preparation for later use