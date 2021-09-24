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

function curry(fn, arity = fn.length) {
	return (function nextCurried(prevArgs) {
		return function curried(nextArg) {
			var args = [...prevArgs, nextArg];
			if (args.length >= arity) {
				return fn(...args);
			} else {
				return nextCurried(args);
			}
		};
	})([]);
}

function looseCurry(fn, arity = fn.length) {
	return (function nextCurried(prevArgs) {
		return function curried(...nextArgs) {
			var args = [...prevArgs, ...nextArgs];

			if (args.length >= arity) {
				return fn(...args);
			}
			else {
				return nextCurried(args);
			}
		};
	})([]);
}

function uncurry(fn) {
	return function uncurried(...args) {
		var ret = fn;

		for (let arg of args) {
			ret = ret(arg);
		}

		return ret;
	};
}

function partialProps(fn, presetArgsObj) {
	return function partiallyApplied(laterArgsObj) {
		return fn(Object.assign({}, presetArgsObj, laterArgsObj));
	};
}

function curryProps(fn, arity = 1) {
	return (function nextCurried(prevArgsObj) {
		return function curried(nextArgObj = {}) {
			var [key] = Object.keys(nextArgObj);
			var allArgsObj = Object.assign(
				{}, prevArgsObj, { [key]: nextArgObj[key] }
			);

			if (Object.keys(allArgsObj).length >= arity) {
				return fn(allArgsObj);
			}
			else {
				return nextCurried(allArgsObj);
			}
		};
	})({});
}

module.exports = {
	unary,
	identity,
	spreadArgs,
	gatherArgs,
	partial,
	partialRight,
	reverseArgs,
	curry,
	looseCurry,
	uncurry,
	partialProps,
	curryProps,
};