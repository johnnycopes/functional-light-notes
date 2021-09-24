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

// https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md/#spreading-properties

function foo({ x, y, z } = {}) {
	console.log( `x:${x} y:${y} z:${z}` );
}

var f1 = curryProps( foo, 3 );
var f2 = partialProps( foo, { y: 2 } );

f1( {y: 2} )( {x: 1} )( {z: 3} );
// x:1 y:2 z:3

f2( { z: 3, x: 1 } );
// x:1 y:2 z:3
