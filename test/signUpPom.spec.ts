import { test, expect } from '@playwright/test';
import { VALID_USER1 } from '../test-data/users';
import { RANDOM_USER1 } from '../test-data/users';
import HomePage from '../pom/pages/HomePage';
import SignUpForm from '../pom/forms/SignUpForm';
import { SignUpMessagesError } from '../test-data/messeges';
import GaragePage from '../pom/pages/GaragePage';
import { INVALID_USER1 } from '../test-data/users';

test.describe('Sign-up form tests', () => {
	let homePage: HomePage;
	let signUpForm: SignUpForm;
	let garagePage: GaragePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		signUpForm = new SignUpForm(page);
		garagePage = new GaragePage(page);
		await homePage.open();
		await homePage.signUpButton.click();
	});

	test.describe('Validation First name field', () => {
		test('Empty First name field', async () => {
			await signUpForm.trigeredFieldValidation(signUpForm.firstNameField);
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.firstNameRequired);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Short First name', async () => {
			await signUpForm.firstNameField.fill('d');
			await signUpForm.firstNameField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.firstNameIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Long First name', async () => {
			await signUpForm.firstNameField.fill('adadadadadadadadadadadad');
			await signUpForm.firstNameField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.firstNameIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Invalid First name', async () => {
			await signUpForm.firstNameField.fill('@12345');
			await signUpForm.firstNameField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.firstNameInvalid);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Valid First name', async () => {
			await signUpForm.firstNameField.fill('Sasha');
			await signUpForm.firstNameField.blur();
			await expect(signUpForm.validationError).toBeHidden();
		});
	});

	test.describe('Validation Last name field', () => {
		test('Empty Last name field', async () => {
			await signUpForm.lastNameField.focus();
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.lastNameRequired);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Short Last name', async () => {
			await signUpForm.lastNameField.fill('f');
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.lastNameIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Long Last name', async () => {
			await signUpForm.lastNameField.fill('adadadadadadadadadadadad');
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.lastNameIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Invalid Last name', async () => {
			await signUpForm.lastNameField.fill('#$%^7');
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.lastNameInvalid);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Valid Last name', async () => {
			await signUpForm.lastNameField.fill('Brusnichenko');
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.validationError).toBeHidden();
		});
	});
	test.describe('Validation Email field', () => {
		test('Empty email field', async () => {
			await signUpForm.emailField.focus();
			await signUpForm.emailField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.emailRequired);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Invalid email', async () => {
			await signUpForm.emailField.fill(INVALID_USER1.email);
			await signUpForm.emailField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.emailIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Valid email', async () => {
			await signUpForm.emailField.fill('test@test.com');
			await signUpForm.emailField.blur();
			await expect(signUpForm.validationError).toBeHidden();
		});
	});

	test.describe('Validation Password field', () => {
		test('Empty password field', async () => {
			await signUpForm.passwordField.focus();
			await signUpForm.passwordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.passwordRequired);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Password less than 8', async () => {
			await signUpForm.passwordField.fill('123');
			await signUpForm.passwordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.passwordIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Password more than 15', async () => {
			await signUpForm.passwordField.fill('assaAAA@#!1234567891011121314151617');
			await signUpForm.passwordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.passwordIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Password without integers', async () => {
			await signUpForm.passwordField.fill('PasswordLong');
			await signUpForm.passwordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.passwordIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Password without capital letters', async () => {
			await signUpForm.passwordField.fill('abc123456789');
			await signUpForm.passwordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.passwordIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Password without small letters', async () => {
			await signUpForm.passwordField.fill('ABC123456789');
			await signUpForm.passwordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.passwordIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Valid password', async () => {
			await signUpForm.passwordField.fill('!Pre2225500');
			await signUpForm.passwordField.blur();
			await expect(signUpForm.validationError).toBeHidden();
		});
	});

	test.describe('Validation Re-enter password field', () => {
		test('Empty re-password field', async () => {
			await signUpForm.trigeredFieldValidation(signUpForm.confirmPasswordField);
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordRequired);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Re-password more than 15', async () => {
			await signUpForm.confirmPasswordField.fill('asdfghjklzxcvbasdfghjk');
			await signUpForm.confirmPasswordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Re-password less than 8', async () => {
			await signUpForm.confirmPasswordField.fill('456asd');
			await signUpForm.confirmPasswordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Re-password without integers', async () => {
			await signUpForm.confirmPasswordField.fill('Repassword');
			await signUpForm.confirmPasswordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Re-password without capital letters', async () => {
			await signUpForm.confirmPasswordField.fill('abc123456789');
			await signUpForm.confirmPasswordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Re-password without small letters', async () => {
			await signUpForm.confirmPasswordField.fill('ABC123456789');
			await signUpForm.confirmPasswordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.confirmPasswordIncorrect);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Passwords do not match', async () => {
			await signUpForm.passwordField.fill('!Pre2225500');
			await signUpForm.confirmPasswordField.fill('@Pre2225500');
			await signUpForm.confirmPasswordField.blur();
			await expect(signUpForm.validationError).toHaveText(SignUpMessagesError.passwordsDoNotMatch);
			await expect(signUpForm.validationError).toHaveCSS('color', SignUpMessagesError.toHaveColor);
		});

		test('Valid re-password', async () => {
			await signUpForm.passwordField.fill('!Pre2225500');
			await signUpForm.confirmPasswordField.fill('!Pre2225500');
			await signUpForm.confirmPasswordField.blur();
			await expect(signUpForm.validationError).toBeHidden();
		});
	});

	test.describe('Use all fields in sign up', () => {	
		test('Successful sign up', async () => {
			await signUpForm.firstNameField.fill('Sasha');
			await signUpForm.lastNameField.fill('Brusnichenko');
			await signUpForm.emailField.fill(RANDOM_USER1.email);
			await signUpForm.passwordField.fill(RANDOM_USER1.password);
			await signUpForm.confirmPasswordField.fill(RANDOM_USER1.password);
			await signUpForm.signUpButton.click();
			await expect(garagePage.garageTitle).toHaveText(SignUpMessagesError.toHaveTextonGaragePage);
		});

		test('Sign up with already registered email', async () => {
			await signUpForm.firstNameField.fill('Sasha');
			await signUpForm.lastNameField.fill('Brusnichenko');
			await signUpForm.emailField.fill(VALID_USER1.email);
			await signUpForm.passwordField.fill(VALID_USER1.password);
			await signUpForm.confirmPasswordField.fill(VALID_USER1.password);
			await signUpForm.signUpButton.click();
			await expect(signUpForm.signUpError).toHaveText('User already exists');
			await expect(signUpForm.signUpError).toHaveCSS('color', 'rgb(114, 28, 36)');
		});

		test('Sign up with empty fields', async () => {
			await signUpForm.firstNameField.focus();
			await signUpForm.lastNameField.focus();
			await signUpForm.emailField.focus();
			await signUpForm.passwordField.focus();
			await signUpForm.confirmPasswordField.focus();
			await signUpForm.confirmPasswordField.blur();
			await expect(signUpForm.signUpButton).toBeDisabled();
		});
	});
});