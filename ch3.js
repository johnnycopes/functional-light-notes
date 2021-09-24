const { curry, identity, gatherArgs, spreadArgs, unary, partial } = require("./functions/fp");
const { delay } = require("./functions/utility");

// Shrinking the `parseInt` signature so nothing gets passed into its second argument (the `radix`)
const withoutUnary = ["1", "2", "3", "4", "5"].map(num => parseInt(num));
const withUnary = ["1", "2", "3", "4", "5"].map(unary(parseInt));

// =========================

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

output( "Hello World", upper );     // HELLO WORLD
output( "Hello World" );            // Hello World

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

// =========================

/*
	Spread/gather args (known as `apply` and `unapply` in functional libraries like Ramda) are useful utilities
	for working with functions that have incompatible signatures. If one function expects an array as an input,
	but another function expects individual arguments, these utilities can help transform one to match what the
	other is expecting.
*/

function foo(x,y) {
	console.log( x + y );
}

function bar(fn) {
	fn( [ 3, 9 ] );
}

function combineFirstTwo([ v1, v2 ]) {
	return v1 + v2;
}

// [1,2,3,4,5].reduce(combineFirstTwo); // fails
[1,2,3,4,5].reduce(gatherArgs(combineFirstTwo)); // works!


// bar( foo ); // fails
bar( spreadArgs(foo) ); // works!

// =========================

// Reduce arity of repetitive function calls
function ajax(url, data, callback) {
	console.log(`Calling ${url} with ${data} and executing ${callback?.name}...`);
}

const getPerson = partial(ajax, "http://some.api/person");
const getSpecificUserV1 = partial(ajax, "http://some.api/person", "1"); // good
const getSpecificUserV2 = partial(getPerson, "1"); // better (reuses something that already exists)

function add(x, y) {
	return x + y;
}

const adder = curry(add);

[1,2,3,4,5].map(val => add(3, val)); // The signature of `add` doesn't match the callback function `map` expects
[1,2,3,4,5].map(partial(add, 3)); // `partial` can adapt the signature into something that will match what we want
[1,2,3,4,5].map(curry(add)(3)); // `curry` can do the same as partial, but in a more destructured way...
[1,2,3,4,5].map(adder(3)); // ...like here, where we set up the `adder` ahead of time in preparation for later use

// =========================

/*
	Partial application and currying are typically done with arrays, but they can
	work with objects as well. One advantage of this is getting to disregard order
	of arguments. For example, if we had our same `ajax` function as before, but
	with named arguments in the function signature:
*/

function ajax({ url, data, callback }) {
	console.log(`Calling ${url} with ${data} and executing ${callback?.name}...`);
}

// Partial application
const getPerson = partial(ajax, "http://some.api/person");
const getSpecificUser = partial(ajax, { url: "http://some.api/person", data: "1" });
getPerson({ callback: () => null });

// Currying
const curriedAjax = curryProps(ajax, 3);
const getSpecificAnimal = curriedAjax({ url: "http://some.api/animal" })({ data: "1" });
getSpecificAnimal({ callback: () => null });