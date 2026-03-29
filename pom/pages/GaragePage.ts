import { Locator, Page } from '@playwright/test';
import BasePage from '../BasePage'; 

class GaragePage extends BasePage {
    [x: string]: any;

    public readonly garageTitle: Locator = this.page.locator('.garage_title');
    public readonly addCarButton: Locator = this.page.locator('.btn-primary', { hasText: 'Add Car' });
    public readonly carList: Locator = this.page.locator('.car_list');
    public readonly titleCheck: Locator = this.page.locator('h1');
    public readonly selectCarBrand: Locator = this.page.locator('#addCarBrand');
    public readonly selectCarModel: Locator = this.page.locator('#addCarModel');
    public readonly carMileageInput: Locator = this.page.locator('#addCarMileage');
    public readonly profileButton: Locator = this.page.locator('.icon-profile');


      async open() {
        await this.page.goto('/panel/garage');
    }
}   

export default GaragePage;
