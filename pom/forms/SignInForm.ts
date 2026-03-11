import { Locator } from '@playwright/test';
import BasePage from '../BasePage'; 

class SignInForm extends BasePage   {
    public readonly emailField: Locator = this.page.locator('#signinEmail');
    public readonly passwordField: Locator = this.page.locator('#signinPassword');
    public readonly signInButton: Locator = this.page.locator('.modal-content .btn-primary');
    public readonly signInError: Locator = this.page.locator('.alert-danger');
}   

export default SignInForm;
