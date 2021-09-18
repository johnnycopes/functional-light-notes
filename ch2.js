function formatter(formatFn) {
	return function inner(str) {
		return formatFn(str);
	}
}

const lower = formatter(str => str.toLowerCase());
const upper = formatter(str => str.toUpperCase());
const upperFirst = formatter(
	(str) => upper(str[0]) + lower(str.substr(1))
);

const text = "HoWdY";
// console.log(lower(text));
// console.log(upper(text));
// console.log(upperFirst(text));