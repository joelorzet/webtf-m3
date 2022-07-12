const fs = require('fs');

function print(arg) {
	process.stdout.write(arg);
}

function PWD() {
	process.stdout.write(process.cwd());
}

function DATE() {
	print(Date());
}

function LIST() {
	fs.readdir('.', function (err, files) {
		if (err) throw err;
		files.forEach(function (file) {
			print(file.toString() + '\n');
		});
		print('prompt > ');
	});
}

function ECHO(param) {
	print(param);
}

function CAT(param) {
	fs.readFile(param[0], 'utf8', function (err, data) {
		if (err) throw err;

		print(data);
	});
	print('prompt > ' + '\n');
}

function HEAD(param) {
	fs.readFile(param[0], 'utf8', function (err, data) {
		if (err) throw err;

		print('\n' + data.split('\n').slice(0, 10).join('\n'));
	});
	print('prompt > ' + '\n');
}

function TAIL(param) {
	fs.readFile(param[0], 'utf8', function (err, data) {
		if (err) throw err;

		print('\n' + data.split('\n').slice(-10).join('\n'));
	});
	print('prompt > ' + '\n');
}

function CURL(param) {
	request(param[0], (err, res, body) => {
		if (err) throw err;

		print(body);
	});
}

module.exports = {
	pwd: PWD,
	date: DATE,
	ls: LIST,
	echo: ECHO,
	cat: CAT,
	head: HEAD,
	tail: TAIL,
	curl: CURL,
};
