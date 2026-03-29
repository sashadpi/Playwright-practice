import { expect } from '@playwright/test';
import {VALID_USER1} from '../test-data/users';
import { INVALID_USER1 } from '../test-data/users';
import { test } from '../utils/fixtures/app';


test.describe('Sign In tests', () => {
    
    test('Should sign in successfully', async ({ app }) => {
        const newUserName = {
            "status": "ok",
            "data": {
        "userId": 332473,
        "photoFilename": "default-user.png",
        "name": "Test",
        "lastName": "Test",
        "dateBirth": "2021-03-17T15:21:05.000Z",
        "country": "Ukraine"
    }
};
        await app.signInForm.page.route('**/api/users/profile', (route: any) => route.fulfill({
            status: 200,
            body: JSON.stringify(newUserName),
    }));
        await app.signInForm.open();
        await app.signInForm.login(VALID_USER1.email, VALID_USER1.password);
        await app.signInForm.loginButton.click();
        await app.garagePage.profileButton.click();
        await expect(app.garagePage.page.locator('.profile_name')).toHaveText('Test Test');});

    test('Should show error message with invalid email', async ({ app }) => {
        await app.signInForm.open();
        await app.signInForm.login(INVALID_USER1.email, VALID_USER1.password);
        await expect(app.signInForm.invalidFeedback).toHaveText('Email is incorrect');
    });

    test('Should show error message with empty email', async ({ app }) => {
        await app.signInForm.open();
        await app.signInForm.login('', '');
        await expect(app.signInForm.invalidFeedback).toHaveText('Email required');
    });

});