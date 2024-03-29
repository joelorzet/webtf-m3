const commands = require('./commands/index.js');

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
	//var cmd = data.toString().trim().split(' ');
	const [cmd, ...resto] = data.toString().trim().split(' ');
	// remueve la nueva línea

	if (commands[cmd]) {
		commands[cmd](resto);
	}

	process.stdout.write('\nprompt > ');
});
