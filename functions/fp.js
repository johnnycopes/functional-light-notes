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
			return fn( ...presetArgs, ...laterArgs );
	};
}

module.exports = {
	unary,
	identity,
	spreadArgs,
	gatherArgs,
	partial,
};