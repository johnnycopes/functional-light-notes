// https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md#bind

const {
	unary,
	identity,
	spreadArgs,
	gatherArgs,
	partial,
} = require("./functions/fp");

function add(x, y) {
	return x + y;
}

const result = [1,2,3,4,5].map( partial(add, 3) );
console.log(result); // [4,5,6,7,8]
