function unary(fn) {
	return function onlyOneArg(arg){
			return fn( arg );
	};
}

function identity(v) {
	return v;
}

function spreadArgs(fn) {
	return function spreadFn(argsArr) {
		return fn(...argsArr);
	}
}

function gatherArgs(fn) {
	return function gatherFn(...args) {
		return fn(args);
	}
}

function partial(fn,...presetArgs) {
	return function partiallyApplied(...laterArgs){
			return fn(...presetArgs, ...laterArgs);
	};
}

function partialRight(fn, ...presetArgs) {
	return function partiallyAppliedRight(...laterArgs) {
		return fn(...laterArgs, ...presetArgs);
	}
}

function reverseArgs(fn) {
	return function argsReversed(...args) {
		fn(...args.reverse());
	}
}

module.exports = {
	unary,
	identity,
	spreadArgs,
	gatherArgs,
	partial,
	partialRight,
	reverseArgs,
};