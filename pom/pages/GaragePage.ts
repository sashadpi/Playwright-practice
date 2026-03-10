import { Locator } from '@playwright/test';
import BasePage from '../BasePage'; 

class GaragePage extends BasePage {
    public readonly garageTitle: Locator = this.page.locator('.garage_title');
    public readonly addCarButton: Locator = this.page.locator('.btn-primary', { hasText: 'Add Car' });
    public readonly carList: Locator = this.page.locator('.car_list');
    public readonly titleCheck: Locator = this.page.locator('h1');
}   

export default GaragePage;
