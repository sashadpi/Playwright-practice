import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage";

class HomePage extends BasePage {
    public readonly signInButton: Locator = this.page.locator('.header_signin');
    public readonly signUpButton: Locator = this.page.locator('.btn-primary', { hasText: 'Sign Up' });

    async open() {
        await this.page.goto('/');
    }
}

export default HomePage;