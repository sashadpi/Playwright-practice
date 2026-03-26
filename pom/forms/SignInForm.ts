import { Locator } from '@playwright/test';
import BasePage from '../BasePage'; 
import { VALID_USER1 } from '../../test-data/users';

class SignInForm extends BasePage   {
    public readonly signInEmail: Locator = this.page.locator('#signinEmail');
    public readonly signInPassword: Locator = this.page.locator('#signinPassword');
    public readonly loginButton: Locator = this.page.locator('.btn-primary', {hasText: 'Login'});
    public readonly signInError: Locator = this.page.locator('.alert-danger');
    public readonly invalidFeedback: Locator = this.page.locator('.invalid-feedback');

    async login(email: string, password: string) {
        await this.signInEmail.fill(email);
        await this.signInPassword.fill(password);    }
}   

export default SignInForm;
