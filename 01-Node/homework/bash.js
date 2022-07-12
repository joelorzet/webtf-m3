const commands = require('./commands/index.js');

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
	var cmd = data.toString().trim().split(' '); // remueve la nueva línea
	if (cmd[0] === 'date') {
		commands[cmd]();
	}
	if (cmd[0] === 'pwd') {
		commands[cmd]();
	}
	if (cmd[0] === 'ls') {
		commands[cmd]();
	}
	if (cmd[0] === 'echo') {
		const param = cmd.slice(1).join(' ');

		commands[cmd[0]](param);
	}

	if (cmd[0] === 'cat') {
		commands[cmd[0]](cmd[1]);
	}

	process.stdout.write('\nprompt > ');
});
