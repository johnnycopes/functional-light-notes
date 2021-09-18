async function delay(ms, val = 0) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(`${val} resolved`);
			resolve(val);
		}, ms);
	});
};

module.exports = {
	delay,
};