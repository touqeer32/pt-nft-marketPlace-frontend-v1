const { test, expect } = require("@playwright/test");

test("Home Page", async({ page }) => {
    await page.goto("http://localhost:3000");
    const homepageMeta = page.locator(".meta");
    await expect(homepageMeta).toHaveText("PharmaTrace NFT Marketplace");
});