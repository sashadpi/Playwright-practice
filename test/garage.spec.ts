import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { test } from '../utils/fixtures/app';
test.describe('Garage page tests', () => {
test.use({storageState: './test-data/states/validUser1.json'});
    test.describe('Adding cars', () => {
        test.afterEach(async ({ app }) => {
        await app.garagePage.open();    
        await app.garageAddCarForm.deleteFirstCar();
            await expect(app.garagePage.page.locator('.alert-success p', {hasText: 'Car removed'})).toBeVisible();
        });

        test('Add Audi Q7', async ({ app }) => {
            let mileage = faker.number.int({min: 1000, max: 300000}).toString();
            await app.garagePage.open();
            await app.garageAddCarForm.addCar('Audi', 'Q7', mileage);
            await expect(app.garagePage.page.locator('p.car_name.h2').first()).toHaveText('Audi Q7');
            await expect(app.garagePage.page.locator('.car-item [name="miles"]').first()).toHaveValue(mileage);
        });

        test('Add BMW X5', async ({ app }) => {
            let mileage = faker.number.int({min: 1000, max: 300000}).toString();
            await app.garagePage.open();
            await app.garageAddCarForm.addCar('BMW', 'X5', mileage);
            await expect(app.garagePage.page.locator('p.car_name.h2').first()).toHaveText('BMW X5');
            await expect(app.garagePage.page.locator('.car-item [name="miles"]').first()).toHaveValue(mileage);
        });

         test('Add Ford Fiesta', async ({ app }) => {
            let mileage = faker.number.int({min: 1000, max: 300000}).toString();
            await app.garagePage.open();
            await app.garageAddCarForm.addCar('Ford', 'Fiesta', mileage);
            await expect(app.garagePage.page.locator('p.car_name.h2').first()).toHaveText('Ford Fiesta');
            await expect(app.garagePage.page.locator('.car-item [name="miles"]').first()).toHaveValue(mileage);
        });

        test('Add Porsche 911', async ({ app }) => {
            let mileage = faker.number.int({min: 1000, max: 300000}).toString();
            await app.garagePage.open();
            await app.garageAddCarForm.addCar('Porsche', '911', mileage);
            await expect(app.garagePage.page.locator('p.car_name.h2').first()).toHaveText('Porsche 911');
            await expect(app.garagePage.page.locator('.car-item [name="miles"]').first()).toHaveValue(mileage);
        });

        test('Add Fiat Punto', async ({ app }) => {
            let mileage = faker.number.int({min: 1000, max: 300000}).toString();
            await app.garagePage.open();
            await app.garageAddCarForm.addCar('Fiat', 'Punto', mileage);
            await expect(app.garagePage.page.locator('p.car_name.h2').first()).toHaveText('Fiat Punto');
            await expect(app.garagePage.page.locator('.car-item [name="miles"]').first()).toHaveValue(mileage);
        });
    });
});