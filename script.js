// https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md#one-at-a-time

const {
	unary,
	identity,
	spreadArgs,
	gatherArgs,
	// partial,
	partialRight,
	reverseArgs,
} = require("./functions/fp");

function partial(fn,...presetArgs) {
	return (...laterArgs) => fn(...presetArgs, ...laterArgs);
}

const multiply = (left, right) => left * right;

const doubleUsingBind = multiply.bind(null, 2); // same idea as partial, but 
const doubleUsingClosure = number => multiply(2, number);
const doubleUsingPartial = partial(multiply, 2);

console.log(doubleUsingBind(3), doubleUsingClosure(3), doubleUsingPartial(3));