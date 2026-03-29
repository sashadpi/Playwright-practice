import test, { expect } from "@playwright/test";
import { authControllers } from "../../controllers/AuthControllers";
import { INVALID_USER1, VALID_USER1 } from "../../test-data/users";

test.describe('Sign In API tests', () => {
    test('Successful sign in', async ({ request }) => {
        const response = await authControllers.signIn(request, VALID_USER1.email, VALID_USER1.password);
        expect(response.status()).toBe(200);
    });

    test('Sign in with invalid email', async ({ request }) => {
        const response = await authControllers.signIn(request, INVALID_USER1.email, VALID_USER1.password); 
        expect(response.status()).toBe(400);
    });

    test('Sign in with empty email', async ({ request }) => {
        const response = await authControllers.signIn(request, '', VALID_USER1.password); 
        expect(response.status()).toBe(400);
    });

    test('Sign in with empty password', async ({ request }) => {
        const response = await authControllers.signIn(request, VALID_USER1.email, ''); 
        expect(response.status()).toBe(400);
    });
});