import { Locator, Page } from '@playwright/test';
import BasePage from '../BasePage';

class SignUpForm extends BasePage {
    public readonly firstNameField: Locator = this.page.locator('#signupName');
    public readonly lastNameField: Locator = this.page.locator('#signupLastName');
    public readonly emailField: Locator = this.page.locator('#signupEmail');
    public readonly passwordField: Locator = this.page.locator('#signupPassword');
    public readonly confirmPasswordField: Locator = this.page.locator('#signupRepeatPassword');
    public readonly signUpButton: Locator = this.page.locator('.modal-content .btn-primary');
    public readonly validationError: Locator = this.page.locator('.invalid-feedback');
    public readonly signUpError: Locator = this.page.locator('.alert-danger');

    async trigeredFieldValidation(field: Locator) {
        await field.focus();
        await field.blur();
    }
}

export default SignUpForm;
