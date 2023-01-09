const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function scrapeData() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		await page.goto('https://www.dagbladet.no/', { timeout: 180000 });
		let bodyHTML = await page.evaluate(() => document.body.innerHTML);
		let $ = cheerio.load(bodyHTML);
		let article_headlines = $(' article > a > header ');
		let scraped_headlines = [];
		article_headlines.each((index, element) => {
			title = $(element).find('h3').text();
			scraped_headlines.push({
				title: title,
			});
		});
		return scraped_headlines;
	} catch (err) {
		console.log(err);
	}
	await browser.close();
}

/* const button = document.getElementById('button');
button.addEventListener('click', async () => {
	const scrapedData = await scrapeData();
	const scrapedDataElement = document.getElementById('scraped-data');
	scrapedDataElement.innerHTML = '';
	scrapedData.forEach((data) => {
		scrapedDataElement.innerHTML += `<p>${data.title}</p>`;
	});
}); */
