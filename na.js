const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
let scraped_headlines = [];
(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	try {
		await page.goto('https://www.nettavisen.no/', { timeout: 180000 });
		let bodyHTML = await page.evaluate(() => document.body.innerHTML);
		let $ = cheerio.load(bodyHTML);
		let article_headlines = $('a > div > div > h2 > span');
		article_headlines.each((index, element) => {
			title = $(element).find('.headline').text();
			scraped_headlines.push({
				title: title,
			});
		});
	} catch (err) {
		console.log(err);
	}
	await browser.close();
	console.log(scraped_headlines);
})();
