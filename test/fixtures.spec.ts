import { chromium, expect } from '@playwright/test';
import { test } from '../utils/fixtures/screenSizeFixture';

// test('Without fixtures', async () => {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await page.goto('https://wikipedia.org');
// });

// test('With fixtures', async ({ page }) => {
//     await page.goto('https://wikipedia.org');
// });

test('Open wikipedia on small screen', async ({ pageSmall }) => {
    await pageSmall.goto('https://wikipedia.org');
    await expect(pageSmall).toHaveTitle(/Wikipedia/);
});

test('Open wikipedia on medium screen', async ({ pageMedium }) => {
    await pageMedium.goto('https://wikipedia.org');
    await expect(pageMedium).toHaveTitle(/Wikipedia/);
});

test('Open wikipedia on large screen', async ({ pageLarge }) => {
    await pageLarge.goto('https://wikipedia.org');
    await expect(pageLarge).toHaveTitle(/Wikipedia/);
});