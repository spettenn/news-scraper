const http = require('http');
const fs = require('fs');

http
	.createServer(function (req, res) {
		fs.readFile('index.html', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(data);
			res.end();
		});
	})
	.listen(8080);

/* const url = require('url'); */

/* http
	.createServer(function (req, res) {
		const q = url.parse(req.url, true);
		if (q.pathname === '/db') {
			scrapeData().then((data) => {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(data));
				res.end();
			});
		} else {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.write('404 Not Found');
			res.end();
		}
	})
	.listen(8080); */
