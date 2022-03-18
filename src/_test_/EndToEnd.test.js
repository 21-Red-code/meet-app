import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
	let browser;
	let page;
	jest.setTimeout(50000);
	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 250,
			ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting
		});
		page = await browser.newPage();
		await page.goto("http://localhost:3000/");
		await page.waitForSelector(".event");
	});

	afterAll(() => {
		browser.close();
	});

	test("An event element is collapsed by default", async () => {
		const eventDetails = await page.$(".event__more-detail");
		expect(eventDetails).toBeNull();
	});

	test("User can expand an event to see its details", async () => {
		await page.waitForSelector(".event");
		await page.click(".event__details-button");

		const eventDetails = await page.$(".event__more-detail");
		expect(eventDetails).toBeDefined();
	});

	test("User can collapse an event to hide its details", async () => {
		await page.click(".event__details-button");
		const eventDetails = await page.$(".event__more-detail");
		//the toBeNull() matcher is used to ensure the extra details element no longer exists
		expect(eventDetails).toBeNull();
	});
});
