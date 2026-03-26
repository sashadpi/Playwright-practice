import { test as base, Page } from '@playwright/test';
import SignInForm from '../../pom/forms/SignInForm';
import HomePage from '../../pom/pages/HomePage';
import GaragePage from '../../pom/pages/GaragePage';
import SignUpForm from '../../pom/forms/SignUpForm';

type App = {
    page: Page;
    signInForm: SignInForm;
    homePage: HomePage;
    garagePage: GaragePage;
    signUpForm: SignUpForm;
}

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            signInForm: new SignInForm(page),
            homePage: new HomePage(page),
            garagePage: new GaragePage(page),
            signUpForm: new SignUpForm(page),
        };
        await use(app);
    }       
}); 

