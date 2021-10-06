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
	uncurry,
	curryProps,
	partialProps,
} = require("./functions/fp");
const { print } = require("./functions/utility");

// convenience to avoid any potential binding issue
// with trying to use `console.log` as a function
function output(txt) {
	console.log( txt );
}

function printIf( predicate, msg ) {
	if (predicate( msg )) {
			output( msg );
	}
}

function isShortEnough(str) {
	return str.length <= 5;
}

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf( isShortEnough, msg1 );         // Hello
printIf( isShortEnough, msg2 );
