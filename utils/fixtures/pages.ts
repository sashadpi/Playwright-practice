import { test as base, expect, Page } from '@playwright/test';
import SignInForm from '../../pom/forms/SignInForm';
import HomePage from '../../pom/pages/HomePage';
import GaragePage from '../../pom/pages/GaragePage';
import SignUpForm from '../../pom/forms/SignUpForm';

type Pages = {
    signInForm: SignInForm;
    homePage: HomePage;
    garagePage: GaragePage;
    signUpForm: SignUpForm;
};

export const test = base.extend<Pages>({
    signInForm: async ({ page }, use) => {
        const signInForm = new SignInForm(page);
        const homePage = new HomePage(page);
        await homePage.open();
        await homePage.signInButton.click();
        await use(signInForm);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    garagePage: async ({ page }, use) => {
        const garagePage = new GaragePage(page);
        await garagePage.open();
        await use(garagePage);
    },
    signUpForm: async ({ page }, use) => {
        const signUpForm = new SignUpForm(page);
        await use(signUpForm);
    },
});