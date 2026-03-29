import { test as base } from '@playwright/test';
import GaragePage from '../../pom/pages/GaragePage';
import GarageAddCarForm from '../../pom/forms/GarageAddCarForm';

type MyFixtures = {
    userGaragePage: GaragePage;
    garageAddCarForm: GarageAddCarForm;
};

export const test = base.extend<MyFixtures>({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: './test-data/states/validUser1.json'
        });
        const page = await context.newPage();
        const garagePage = new GaragePage(page)
        await garagePage.open();
        await use(garagePage);
        await context.close();
    },
    garageAddCarForm: async ({ page }, use) => {
        const garageAddCarForm = new GarageAddCarForm(page);
        await use(garageAddCarForm);
    },
});

