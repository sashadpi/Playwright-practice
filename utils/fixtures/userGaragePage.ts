import { test as base } from '@playwright/test';
import GaragePage from '../../pom/pages/GaragePage';

type MyFixtures = {
    userGaragePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: './test-data/states/validUser1.json'
        });
        const page = await context.newPage();
        const garagePage = new GaragePage(page);
        await garagePage.open();
        await use(garagePage);
        await context.close();
    },
});

