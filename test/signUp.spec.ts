import { test, expect } from '@playwright/test';
import { VALID_USER1 } from '../test-data/users';
import { VALID_USER2 } from '../test-data/users';

test.describe('Sign-up tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.locator('.btn-primary').click();
	});

	test.describe('Validation First name field', () => {
		test('Empty First name field', async ({ page }) => {
			await page.locator('#signupName').focus();
			await page.locator('#signupName').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Name required');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Short First name', async ({ page }) => {
			await page.locator('#signupName').fill('d');
			await page.locator('#signupName').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Long First name', async ({ page }) => {
			await page.locator('#signupName').fill('adadadadadadadadadadadad');
			await page.locator('#signupName').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Invalid First name', async ({ page }) => {
			await page.locator('#signupName').fill('@12345');
			await page.locator('#signupName').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Name is invalid');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Valid First name', async ({ page }) => {
			await page.locator('#signupName').fill('Sasha');
			await page.locator('#signupName').blur();
			await expect(page.locator('.invalid-feedback')).toBeHidden();
		});
	});

	test.describe('Validation Last name field', () => {
		test('Empty Last name field', async ({ page }) => {
			await page.locator('#signupLastName').focus();
			await page.locator('#signupLastName').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Last name required');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Short Last name', async ({ page }) => {
			await page.locator('#signupLastName').fill('f');
			await page.locator('#signupLastName').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Long Last name', async ({ page }) => {
			await page.locator('#signupLastName').fill('adadadadadadadadadadadad');
			await page.locator('#signupLastName').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Invalid Last name', async ({ page }) => {
			await page.locator('#signupLastName').fill('#$%^7');
			await page.locator('#signupLastName').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Last name is invalid');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Valid Last name', async ({ page }) => {
			await page.locator('#signupLastName').fill('Brusnichenko');
			await page.locator('#signupLastName').blur();
			await expect(page.locator('.invalid-feedback')).toBeHidden();
		});
	});
	test.describe('Validation Email field', () => {
		test('Empty email field', async ({ page }) => {
			await page.locator('#signupEmail').focus();
			await page.locator('#signupEmail').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Email required');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Invalid email', async ({ page }) => {
			await page.locator('#signupEmail').fill('asap');
			await page.locator('#signupEmail').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Valid email', async ({ page }) => {
			await page.locator('#signupEmail').fill('test@test.com');
			await page.locator('#signupEmail').blur();
			await expect(page.locator('.invalid-feedback')).toBeHidden();
		});
	});

	test.describe('Validation Password field', () => {
		test('Empty password field', async ({ page }) => {
			await page.locator('#signupPassword').focus();
			await page.locator('#signupPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password required');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Password less than 8', async ({ page }) => {
			await page.locator('#signupPassword').fill('123');
			await page.locator('#signupPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Password more than 15', async ({ page }) => {
			await page.locator('#signupPassword').fill('assaAAA@#!1234567891011121314151617');
			await page.locator('#signupPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Password without integers', async ({ page }) => {
			await page.locator('#signupPassword').fill('PasswordLong');
			await page.locator('#signupPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Password without capital letters', async ({ page }) => {
			await page.locator('#signupPassword').fill('abc123456789');
			await page.locator('#signupPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Password without small letters', async ({ page }) => {
			await page.locator('#signupPassword').fill('ABC123456789');
			await page.locator('#signupPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Valid password', async ({ page }) => {
			await page.locator('#signupPassword').fill('!Pre2225500');
			await page.locator('#signupPassword').blur();
			await expect(page.locator('.invalid-feedback')).toBeHidden();
		});
	});

	test.describe('Validation Re-enter password field', () => {
		test('Empty re-password field', async ({ page }) => {
			await page.locator('#signupRepeatPassword').focus();
			await page.locator('#signupRepeatPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Re-enter password required');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Re-password more than 15', async ({ page }) => {
			await page.locator('#signupRepeatPassword').fill('asdfghjklzxcvbasdfghjk');
			await page.locator('#signupRepeatPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Re-password less than 8', async ({ page }) => {
			await page.locator('#signupRepeatPassword').fill('456asd');
			await page.locator('#signupRepeatPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Re-password without integers', async ({ page }) => {
			await page.locator('#signupRepeatPassword').fill('Repassword');
			await page.locator('#signupRepeatPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Re-password without capital letters', async ({ page }) => {
			await page.locator('#signupRepeatPassword').fill('abc123456789');
			await page.locator('#signupRepeatPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Re-password without small letters', async ({ page }) => {
			await page.locator('#signupRepeatPassword').fill('ABC123456789');
			await page.locator('#signupRepeatPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Passwords do not match', async ({ page }) => {
			await page.locator('#signupPassword').fill('!Pre2225500');
			await page.locator('#signupRepeatPassword').fill('@Pre2225500');
			await page.locator('#signupRepeatPassword').blur();
			await expect(page.locator('.invalid-feedback')).toHaveText('Passwords do not match');
			await expect(page.locator('.invalid-feedback')).toHaveCSS('color', 'rgb(220, 53, 69)');
		});

		test('Valid re-password', async ({ page }) => {
			await page.locator('#signupPassword').fill('!Pre2225500');
			await page.locator('#signupRepeatPassword').fill('!Pre2225500');
			await page.locator('#signupRepeatPassword').blur();
			await expect(page.locator('.invalid-feedback')).toBeHidden();
		});
	});

	test.describe('Use all fields in sign up', () => {	
		test('Successful sign up', async ({ page }) => {
			await page.locator('#signupName').fill('Sasha');
			await page.locator('#signupLastName').fill('Brusnichenko');
			await page.locator('#signupEmail').fill(VALID_USER2.email);
			await page.locator('#signupPassword').fill(VALID_USER2.password);
			await page.locator('#signupRepeatPassword').fill(VALID_USER2.password);
			await page.locator('.modal-content .btn-primary').click();
			await expect(page.locator('h1')).toHaveText('Garage');
		});

		test('Sign up with already registered email', async ({ page }) => {
			await page.locator('#signupName').fill('Sasha');
			await page.locator('#signupLastName').fill('Brusnichenko');
			await page.locator('#signupEmail').fill(VALID_USER1.email);
			await page.locator('#signupPassword').fill(VALID_USER1.password);
			await page.locator('#signupRepeatPassword').fill(VALID_USER1.password);
			await page.locator('.modal-content .btn-primary').click();
			await expect(page.locator('.alert-danger')).toHaveText('User already exists');
			await expect(page.locator('.alert-danger')).toHaveCSS('color', 'rgb(114, 28, 36)');
		});

		test('Sign up with empty fields', async ({ page }) => {
			await page.locator('#signupName').focus();
			await page.locator('#signupLastName').focus();
			await page.locator('#signupEmail').focus();
			await page.locator('#signupPassword').focus();
			await page.locator('#signupRepeatPassword').focus();
			await page.locator('#signupRepeatPassword').blur();
			await expect(page.locator('.btn-primary', { hasText: 'Register' })).toBeDisabled();
		});
	});
});