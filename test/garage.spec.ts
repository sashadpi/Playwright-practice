import {test, expect} from '@playwright/test';
import {VALID_USER1} from '../test-data/users';
import { fa, faker } from '@faker-js/faker';

test.describe('Garage page tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.locator('.header_signin').click();
        await page.locator('#signinEmail').fill(VALID_USER1.email);
        await page.locator('#signinPassword').fill(VALID_USER1.password);
        await page.locator('.btn-primary', {hasText: 'Login'}).click();
    });

    test.describe('Adding cars', () => {
        test.afterEach(async ({ page }) => {
            await page.locator('.car-item .icon-edit').first().click();
            await page.locator('.btn-outline-danger').click();
            await page.locator('.btn-danger').click();
            await expect(page.locator('.alert-success p', {hasText: 'Car removed'})).toBeVisible();
        });

        test('should add new car to the garage', async ({ page }) => {
            let mileage = faker.number.int({min: 1000, max: 300000}).toString();
            
            await page.locator('.btn-primary', {hasText: 'Add Car'}).click();
            await page.locator('#addCarBrand').selectOption('Audi');
            await page.waitForTimeout(500);
            await page.locator('#addCarModel').selectOption('Q7');
            await page.locator('#addCarMileage').fill(mileage);
            await page.locator('.modal-footer .btn-primary').click();
            await expect(page.locator('p.car_name.h2').first()).toHaveText('Audi Q7');
            await expect(page.locator('.car-item [name="miles"]').first()).toHaveValue(mileage);
        });
    });
});