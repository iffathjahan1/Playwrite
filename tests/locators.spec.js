import {test,expect} from '@playwright/test';

test('locators', async ({ page })=> {
   await page.goto("https://www.bestbuy.com/")
//    click on united stste page
      // await page.locator().click()
      await page.click("(//a[@class='us-link']//img[@alt='United States'])[1]");
      await page.click("//span[contains(text(),'Account')]")
})