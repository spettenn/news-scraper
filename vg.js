const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = process.env || 3000;
const url = 'https://www.vg.no/';

let headlines = [];

const fetchVg = async () => {
	try {
		let res = await axios.get(url);
		let $ = cheerio.load(res.data);
		$('article > div > a > div').each((index, element) => {
			headlines.push($(element).text().trim);
		});
	} catch (error) {
		console.log(error);
	}
};

app.get('/index.html', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
