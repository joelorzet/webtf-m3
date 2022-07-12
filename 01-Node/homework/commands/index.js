const fs = require('fs');

function PWD() {
	process.stdout.write(process.cwd());
}

function DATE() {
	process.stdout.write(Date());
}

function LIST() {
	fs.readdir('.', function (err, files) {
		if (err) throw err;
		files.forEach(function (file) {
			process.stdout.write(file.toString() + '\n');
		});
		process.stdout.write('prompt > ');
	});
}

function ECHO(param) {
	process.stdout.write(param);
}

function CAT(param) {
	fs.readFile(param, 'utf8', function (err, data) {
		if (err) throw err;

		process.stdout.write(data);
	});
	process.stdout.write('prompt > ' + '\n');
}

module.exports = {
	pwd: PWD,
	date: DATE,
	ls: LIST,
	echo: ECHO,
	cat: CAT,
};
