import { expect} from '@playwright/test';
import {VALID_USER1} from '../test-data/users';
import { INVALID_USER1 } from '../test-data/users';
import { test } from '../utils/fixtures/pages';


test.describe('Sign In tests', () => {
    
    test('Should sign in successfully', async ({ signInForm }) => {
        await signInForm.login(VALID_USER1.email, VALID_USER1.password);
        await signInForm.loginButton.click();
        await expect(signInForm.page).toHaveURL('/panel/garage');
    });

    test('Should show error message with invalid email', async ({ signInForm }) => {
        await signInForm.login(INVALID_USER1.email, VALID_USER1.password);
        await expect(signInForm.invalidFeedback).toHaveText('Email is incorrect');
    });

    test('Should show error message with empty email', async ({ signInForm }) => {
        await signInForm.login('', '');
        await expect(signInForm.invalidFeedback).toHaveText('Email required');
    });

});