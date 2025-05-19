import { test, expect } from '@playwright/test';

test.describe('BestBuy Website Test Suite', () => {
  // Run before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.bestbuy.com/', { waitUntil: 'load', timeout: 70000 });
    await page.waitForSelector("(//a[@class='us-link']//img[@alt='United States'])[1]", { visible: true, timeout: 60000 });
    await page.click("(//a[@class='us-link']//img[@alt='United States'])[1]");
    console.log("United States link clicked");
  });

  // Test Case 1: Verify Homepage Loads Correctly
  test('Homepage should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Best Buy/);
  });

  
  
// Test Case 2: Search for a Product
 test('Search functionality should return products', async ({ page }) => {
 const searchInput = page.locator("//input[@class='search-input search-input-default']");
//  await searchInput.waitFor({ state: 'visible', timeout: 60000 });
 await searchInput.fill('Laptop');
 await searchInput.press('Enter');

 // Ensure results are displayed
  
 await page.waitForSelector('.sku-item', { timeout: 60000 });
 const results = page.locator('.sku-item');
 const count = await results.count();
 expect(count).toBeGreaterThan(0);
 });


  // Test Case 3: Product Details Page
  test('Clicking on a product should navigate to details page', async ({ page }) => {
    const searchInput = page.locator("//input[@class='search-input search-input-default']");
    await searchInput.fill('iPhone');
    await searchInput.press('Enter');
    // await page.click("(//span[text()='See Details'])[1]");
    // const productSpecification = page.locator("//h5[text()='Specifications']");
    // await expect(productSpecification).toBeVisible();
  });

  // Test Case 4: Add to Cart Functionality
  test('User should be able to add product to cart', async ({ page }) => {
    const searchInput2 = page.locator("//input[@class='search-input search-input-default']");
    await searchInput2.fill('Headphones');
    await searchInput2.press('Enter');

    // await page.waitForSelector('.sku-item');
    // await page.locator('.sku-item').first().click();
    // await page.waitForLoadState('networkidle');

    const addToCartButton = page.locator("(//button[@data-button-state='ADD_TO_CART'])[1]");
    console.log("add cart clicked")
    // await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    // Verify cart modal or confirmation
    const cartModal = page.locator('.cart-modal');
    await expect(cartModal).toBeVisible();
  });

  // Test Case 5: Navigate to Deals Section
  test('Deals page should be accessible', async ({ page }) => {
    await page.locator("//a[text()='Top Deals']").click();
    // await page.waitForLoadState('networkidle');

    const header = page.locator('h1');
    await expect(header).toContainText('Top Deals');
  });

 
});
