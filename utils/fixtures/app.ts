import { test as base, Page } from '@playwright/test';
import SignInForm from '../../pom/forms/SignInForm';
import HomePage from '../../pom/pages/HomePage';
import GaragePage from '../../pom/pages/GaragePage';
import SignUpForm from '../../pom/forms/SignUpForm';
import GarageAddCarForm from '../../pom/forms/GarageAddCarForm';

type App = {
    app: {
    page: Page;
    signInForm: SignInForm;
    homePage: HomePage;
    garagePage: GaragePage;
    signUpForm: SignUpForm;
    garageAddCarForm: GarageAddCarForm;
    };
};

export const test = base.extend<App>({
    app: async ({ page }, use) => {
        const app = {
            page,
            signInForm: new SignInForm(page),
            homePage: new HomePage(page),
            garagePage: new GaragePage(page),
            signUpForm: new SignUpForm(page),
            garageAddCarForm: new GarageAddCarForm(page),
        };
        await use(app);
    }       
}); 

