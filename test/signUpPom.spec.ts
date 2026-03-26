import { expect } from '@playwright/test';
import { VALID_USER1 } from '../test-data/users';
import { RANDOM_USER1 } from '../test-data/users';
import { SignUpMessagesError } from '../test-data/messeges';
import { INVALID_USER1 } from '../test-data/users';
import { test } from '../utils/fixtures/app';

test.describe('Sign-up form tests', () => {


	test.beforeEach(async ({ app }) => {
		await app.homePage.open();
		await app.homePage.signUpButton.click();
	});

	test.describe('Validation First name field', () => {
		test('Empty First name field', async ({ app }) => {
			await app.signUpForm.trigeredFieldValidation(app.signUpForm.firstNameField);
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.firstNameRequired);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Short First name', async ({ app }) => {
			await app.signUpForm.firstNameField.fill('d');
			await app.signUpForm.firstNameField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.firstNameIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Long First name', async ({ app }) => {
			await app.signUpForm.firstNameField.fill('adadadadadadadadadadadad');
			await app.signUpForm.firstNameField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.firstNameIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Invalid First name', async ({ app }) => {
			await app.signUpForm.firstNameField.fill('@12345');
			await app.signUpForm.firstNameField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.firstNameInvalid);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Valid First name', async ({ app }) => {
			await app.signUpForm.firstNameField.fill('Sasha');
			await app.signUpForm.firstNameField.blur();
			await expect(app.signUpForm.validationError).toBeHidden();
		});
	});

	test.describe('Validation Last name field', () => {
		test('Empty Last name field', async ({ app }) => {
			await app.signUpForm.lastNameField.focus();
			await app.signUpForm.lastNameField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.lastNameRequired);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Short Last name', async ({ app }) => {
			await app.signUpForm.lastNameField.fill('f');
			await app.signUpForm.lastNameField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.lastNameIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Long Last name', async ({ app }) => {
			await app.signUpForm.lastNameField.fill('adadadadadadadadadadadad');
			await app.signUpForm.lastNameField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.lastNameIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Invalid Last name', async ({ app }) => {
			await app.signUpForm.lastNameField.fill('#$%^7');
			await app.signUpForm.lastNameField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.lastNameInvalid);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Valid Last name', async ({ app }) => {
			await app.signUpForm.lastNameField.fill('Brusnichenko');
			await app.signUpForm.lastNameField.blur();
			await expect(app.signUpForm.validationError).toBeHidden();
		});
	});
	test.describe('Validation Email field', () => {
		test('Empty email field', async ({ app }) => {
			await app.signUpForm.emailField.focus();
			await app.signUpForm.emailField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.emailRequired);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Invalid email', async ({ app }) => {
			await app.signUpForm.emailField.fill(INVALID_USER1.email);
			await app.signUpForm.emailField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.emailIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Valid email', async ({ app }) => {
			await app.signUpForm.emailField.fill('test@test.com');
			await app.signUpForm.emailField.blur();
			await expect(app.signUpForm.validationError).toBeHidden();
		});
	});

	test.describe('Validation Password field', () => {
		test('Empty password field', async ({ app }) => {
			await app.signUpForm.passwordField.focus();
			await app.signUpForm.passwordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.passwordRequired);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Password less than 8', async ({ app }) => {
			await app.signUpForm.passwordField.fill('123');
			await app.signUpForm.passwordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.passwordIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Password more than 15', async ({ app }) => {
			await app.signUpForm.passwordField.fill('assaAAA@#!1234567891011121314151617');
			await app.signUpForm.passwordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.passwordIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Password without integers', async ({ app }) => {
			await app.signUpForm.passwordField.fill('PasswordLong');
			await app.signUpForm.passwordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.passwordIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Password without capital letters', async ({ app }) => {
			await app.signUpForm.passwordField.fill('abc123456789');
			await app.signUpForm.passwordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.passwordIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Password without small letters', async ({ app }) => {
			await app.signUpForm.passwordField.fill('ABC123456789');
			await app.signUpForm.passwordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.passwordIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Valid password', async ({ app }) => {
			await app.signUpForm.passwordField.fill('!Pre2225500');
			await app.signUpForm.passwordField.blur();
			await expect(app.signUpForm.validationError).toBeHidden();
		});
	});

	test.describe('Validation Re-enter password field', () => {
		test('Empty re-password field', async ({ app }) => {
			await app.signUpForm.trigeredFieldValidation(app.signUpForm.confirmPasswordField);
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordRequired);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Re-password more than 15', async ({ app }) => {
			await app.signUpForm.confirmPasswordField.fill('asdfghjklzxcvbasdfghjk');
			await app.signUpForm.confirmPasswordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Re-password less than 8', async ({ app }) => {
			await app.signUpForm.confirmPasswordField.fill('456asd');
			await app.signUpForm.confirmPasswordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Re-password without integers', async ({ app }) => {
			await app.signUpForm.confirmPasswordField.fill('Repassword');
			await app.signUpForm.confirmPasswordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Re-password without capital letters', async ({ app }) => {
			await app.signUpForm.confirmPasswordField.fill('abc123456789');
			await app.signUpForm.confirmPasswordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Re-password without small letters', async ({ app }) => {
			await app.signUpForm.confirmPasswordField.fill('ABC123456789');
			await app.signUpForm.confirmPasswordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordIncorrect);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Passwords do not match', async ({ app }) => {
			await app.signUpForm.passwordField.fill('!Pre2225500');
			await app.signUpForm.confirmPasswordField.fill('@Pre2225500');
			await app.signUpForm.confirmPasswordField.blur();
			await expect(app.signUpForm.validationError).toHaveText(SignUpMessagesError.passwordsDoNotMatch);
			await expect(app.signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Valid re-password', async ({ app }) => {
			await app.signUpForm.passwordField.fill('!Pre2225500');
			await app.signUpForm.confirmPasswordField.fill('!Pre2225500');
			await app.signUpForm.confirmPasswordField.blur();
			await expect(app.signUpForm.validationError).toBeHidden();
		});
	});

	test.describe('Use all fields in sign up', () => {	
		test('Successful sign up', async ({ app }) => {
			await app.signUpForm.firstNameField.fill('Sasha');
			await app.signUpForm.lastNameField.fill('Brusnichenko');
			await app.signUpForm.emailField.fill(RANDOM_USER1.email);
			await app.signUpForm.passwordField.fill(RANDOM_USER1.password);
			await app.signUpForm.confirmPasswordField.fill(RANDOM_USER1.password);
			await app.signUpForm.signUpButton.click();
			await expect(app.signInForm.page).toHaveURL('/panel/garage');
		});

		test('Sign up with already registered email', async ({ app }) => {
			await app.signUpForm.firstNameField.fill('Sasha');
			await app.signUpForm.lastNameField.fill('Brusnichenko');
			await app.signUpForm.emailField.fill(VALID_USER1.email);
			await app.signUpForm.passwordField.fill(VALID_USER1.password);
			await app.signUpForm.confirmPasswordField.fill(VALID_USER1.password);
			await app.signUpForm.signUpButton.click();
			await expect(app.signUpForm.signUpError).toHaveText('User already exists');
			await expect(app.signUpForm.signUpError).toHaveCSS('color', 'rgb(114, 28, 36)');
		});

		test('Sign up with empty fields', async ({ app }) => {
			await app.signUpForm.firstNameField.focus();
			await app.signUpForm.lastNameField.focus();
			await app.signUpForm.emailField.focus();
			await app.signUpForm.passwordField.focus();
			await app.signUpForm.confirmPasswordField.focus();
			await app.signUpForm.confirmPasswordField.blur();
			await expect(app.signUpForm.signUpButton).toBeDisabled();
		});
	});
});