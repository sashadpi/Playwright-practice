import { expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
import { test } from '../utils/fixtures/userGaragePage';
test.describe('Garage page tests', () => {

    test.describe('Adding cars', () => {
        test.afterEach(async ({ userGaragePage }) => {
        await userGaragePage.deleteFirstCar();
            await expect(userGaragePage.page.locator('.alert-success p', {hasText: 'Car removed'})).toBeVisible();
        });

        test('should add new car to the garage', async ({ userGaragePage }) => {
            let mileage = faker.number.int({min: 1000, max: 300000}).toString();

            await userGaragePage.addCarButton.click();
            await userGaragePage.selectCarBrand.selectOption('Audi');
            await userGaragePage.page.waitForTimeout(500);
            await userGaragePage.selectCarModel.selectOption('Q7');
            await userGaragePage.carMileageInput.fill(mileage);
            await userGaragePage.page.locator('.modal-footer .btn-primary').click();
            await expect(userGaragePage.page.locator('p.car_name.h2').first()).toHaveText('Audi Q7');
            await expect(userGaragePage.page.locator('.car-item [name="miles"]').first()).toHaveValue(mileage);
        });
    });
});