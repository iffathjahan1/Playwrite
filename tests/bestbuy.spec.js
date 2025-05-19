import { test, expect } from '@playwright/test';

test.describe('BestBuy Website Test Suite', () => {
  let context;
  let page;

  // Run once before all tests
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://www.bestbuy.com/', { waitUntil: 'load', timeout: 120000 });
    console.log("page opened");
  });

  // Run once after all tests
  test.afterAll(async () => {
    await context.close();
  });

  // Test Case 1: Check title and navigate
  test('has title', async () => {
    await expect(page).toHaveTitle(/Best Buy International: Select your Country - Best Buy/);
    console.log("title checked");

    await page.waitForSelector("(//a[@class='us-link']//img[@alt='United States'])[1]", { visible: true, timeout: 60000 });
    await page.click("(//a[@class='us-link']//img[@alt='United States'])[1]");
    console.log("United States link clicked");

    const accountDropdown = page.locator("//span[contains(text(),'Account')]");
    await accountDropdown.waitFor({ state: 'visible', timeout: 60000 });
    await accountDropdown.click("//span[contains(text(),'Account')]");
    console.log("Account dropdown clicked");

    const signInLink = page.locator("//a[contains(text(),'Sign In')]");
    await signInLink.waitFor({ state: 'visible', timeout: 60000 });
    await signInLink.click("//a[contains(text(),'Sign In')]");
    console.log("Sign In link clicked");

    await page.locator("//input[@id='fld-e']").fill("jahaniffath7@gmail.com");
    await page.click(".c-button-secondary");
    await page.click("#password-radio");
    await page.locator('#fld-p1').fill('yourPassword'); 

    const submitButton = page.locator("//button[@type='submit']");
    await submitButton.waitFor({ state: 'visible', timeout: 60000 });
    await submitButton.click();

    const skipButton = page.locator("//button[contains(.,'Skip for now')]");
    await skipButton.waitFor({ state: 'visible', timeout: 60000 });
    await skipButton.click();
    console.log("Login process completed");

    await page.waitForSelector("//span[contains(text(),'Welcome')]", { timeout: 60000 });
    const welcomeMessage = page.locator("//span[contains(text(),'Welcome')]");
    await expect(welcomeMessage).toBeVisible();
    console.log("Login successful, welcome message displayed");
  });

  
});
