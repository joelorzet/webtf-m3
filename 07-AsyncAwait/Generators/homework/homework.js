function* fizzBuzzGenerator(max = Infinity) {
	// Tu código acá:
	let counter = 1;

	while (counter <= max) {
		if (counter % 3 === 0 && counter % 5 === 0) yield 'Fizz Buzz';
		else if (counter % 3 === 0) yield 'Fizz';
		else if (counter % 5 === 0) yield 'Buzz';
		else yield counter;
		counter++;
	}
}

module.exports = fizzBuzzGenerator;
