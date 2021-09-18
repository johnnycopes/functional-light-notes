const { delay } = require("./utility");

function unary(fn) {
	return function onlyOneArg(arg){
			return fn( arg );
	};
}

// Shrinking the `parseInt` signature so nothing gets passed into its second argument (the `radix`)
const withoutUnary = ["1", "2", "3", "4", "5"].map(num => parseInt(num));
const withUnary = ["1", "2", "3", "4", "5"].map(unary(parseInt));

// =========================

function identity(v) {
	return v;
}

// Taking advantage of JS string coercion to filter out empty characters
var words = "   Now is the time for all...  "
	.split( /\s|\b/ )
	.filter(identity); // note: `Boolean` can also be used here

// Can serve as the default function in place of a transformation
function output(msg, formatFn = identity) {
	msg = formatFn( msg );
	console.log( msg );
}

function upper(txt) {
	return txt.toUpperCase();
}

// output( "Hello World", upper );     // HELLO WORLD
// output( "Hello World" );            // Hello World

// =========================

function constant(v) {
	return function value() {
		return v;
	}
}

/*
	Certain APIs don't let you pass a value directly into a method, but require you to pass in a function, even if all
	that function does is return the value. One such API is the then(..) method on JS Promises:
*/
const p1 = delay(600, "p1");
const p2 = delay(1300, "p2");

p1
	.then(constant(p2)) // `() => p2` works, but the FP `constant` utility is preferable because the arrow function is returning a value outside of itself
	.then(console.log);
