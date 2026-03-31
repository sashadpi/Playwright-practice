import { test as setup, expect } from '@playwright/test';
import { VALID_USER1, VALID_USER2 } from '../../test-data/users';
import { authControllers } from '../../controllers/AuthControllers';

setup('Sign in valid user 1 and save storage state', async ({ request }) => {
	const authResponse = await authControllers.signIn(request, VALID_USER1.email, VALID_USER1.password);
	expect(authResponse.status()).toBe(200);
	await request.storageState({ path: './test-data/states/validUser1.json' });
});

setup('Sign in valid user 2 and save storage state', async ({ request }) => {
	const authResponse = await authControllers.signIn(request, VALID_USER2.email, VALID_USER2.password);
	expect(authResponse.status()).toBe(200);
	await request.storageState({ path: './test-data/states/validUser2.json' });
});
