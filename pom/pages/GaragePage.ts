import { Locator } from '@playwright/test';
import BasePage from '../BasePage'; 

class GaragePage extends BasePage {
    public readonly garageTitle: Locator = this.page.locator('.garage_title');
    public readonly addCarButton: Locator = this.page.locator('.btn-primary', { hasText: 'Add Car' });
    public readonly carList: Locator = this.page.locator('.car_list');
    public readonly titleCheck: Locator = this.page.locator('h1');
    public readonly selectCarBrand: Locator = this.page.locator('#addCarBrand');
    public readonly selectCarModel: Locator = this.page.locator('#addCarModel');
    public readonly carMileageInput: Locator = this.page.locator('#addCarMileage');
    public readonly editCarButton: Locator = this.page.locator('.car-item .icon-edit').first();
    public readonly removeCarButton: Locator = this.page.locator('.btn-outline-danger').first();
    public readonly confirmRemoveCarButton: Locator = this.page.locator('.btn-danger').first();

      async open() {
        await this.page.goto('/panel/garage');
    }

    async deleteFirstCar() {
        await this.editCarButton.first().click();
        await this.removeCarButton.click();
        await this.confirmRemoveCarButton.click();
    }
}   

  

export default GaragePage;
