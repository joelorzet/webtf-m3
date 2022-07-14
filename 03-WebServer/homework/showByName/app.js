var fs = require('fs');
var http = require('http');

// Escribí acá tu servidor

http
	.createServer((req, res) => {
		fs.readFile(`${__dirname}/images/${req.url}.jpg`, (err, data) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('No existe el archivo que estas buscando');
			} else {
				res.writeHead(200, { 'Content-Type': 'image/jpg' });
				res.end(data);
			}
		});
	})
	.listen(3001, 'localhost');
