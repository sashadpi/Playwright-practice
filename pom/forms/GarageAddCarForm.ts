import { Locator, Page } from '@playwright/test';
import BasePage from '../BasePage';
import { VALID_USER1 } from '../../test-data/users';

class GarageAddCarForm extends BasePage {
    public readonly addCarButton: Locator = this.page.locator('.btn-primary', { hasText: 'Add Car' });
    public readonly selectCarBrand: Locator = this.page.locator('#addCarBrand');
    public readonly selectCarModel: Locator = this.page.locator('#addCarModel');
    public readonly carMileageInput: Locator = this.page.locator('#addCarMileage');
    public readonly submitAddCarButton: Locator = this.page.locator('.modal-footer .btn-primary');
    public readonly editCarButton: Locator = this.page.locator('.car-item .icon-edit').first();
    public readonly removeCarButton: Locator = this.page.locator('.btn-outline-danger').first();
    public readonly confirmRemoveCarButton: Locator = this.page.locator('.btn-danger').first();

    async open() {
        await this.page.goto('/panel/garage');
    }

    async addCar(brand: string, model: string, mileage: string) {
        await this.addCarButton.click();
        await this.selectCarBrand.selectOption(brand);
        await this.page.waitForTimeout(500);
        await this.selectCarModel.selectOption(model);
        await this.carMileageInput.fill(mileage);
        await this.submitAddCarButton.click();
    }

    async deleteFirstCar() {
        await this.editCarButton.click();
        await this.removeCarButton.click();
        await this.confirmRemoveCarButton.click();
    }
}

export default GarageAddCarForm;