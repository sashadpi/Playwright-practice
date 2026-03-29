import test, { expect } from '@playwright/test';
import cookies from '../../test-data/states/validUser1.json';
import { getSidForUser } from '../../utils/api/storege-state';
import { garageController } from '../../controllers/GarageController';

test.describe('Garage API tests', () => {
	test('Get all brands', async ({ request }) => {
		const response = await garageController.getAllBrands(request);
		const responseBody = await response.json();
		expect(response.status()).toBe(200);
		expect(responseBody.data).toHaveLength(5);
	});

	test('Get all models', async ({ request }) => {
		const response = await garageController.getAllModels(request);
		const responseBody = await response.json();
		expect(response.status()).toBe(200);
		expect(responseBody.data).toHaveLength(23);
	});

	test('Get user cars. Auth option 1', async ({ request }) => {
		const cookie = cookies.cookies[0].value;
		const response = await request.get('/api/cars', {
			headers: {
				Cookie: `sid=${cookie}`,
			},
		});
		expect(response.status()).toBe(200);
	});

	test('Get user cars. Auth option 2', async ({ request }) => {
		const response = await garageController.getUserCars(request, getSidForUser('validUser2'));
		expect(response.status()).toBe(200);
	});

	test('Add car to garage', async ({ request }) => {
		const response = await garageController.addCar(request, getSidForUser('validUser2'), '1', '1', 10000);
		expect(response.status()).toBe(201);
	});

	test('Update car mileage +1', async ({ request }) => {
		const sid = getSidForUser('validUser2');
		const carId = await garageController.getFirstCarId(request, sid);
		expect(carId).toBeTruthy();
		const carResponse = await garageController.getCarById(request, sid, carId);
		const carBody = await carResponse.json();
		const currentMileage = carBody.data.mileage;
		const updateResponse = await garageController.updateCarMileage(request, sid, carId, currentMileage + 1);
		expect(updateResponse.status()).toBe(200);
	});

	test('Update car mileage -1', async ({ request }) => {
		const sid = getSidForUser('validUser2');
		const carId = await garageController.getFirstCarId(request, sid);
		expect(carId).toBeTruthy();
		const carResponse = await garageController.getCarById(request, sid, carId);
		const carBody = await carResponse.json();
		const currentMileage = carBody.data.mileage;
		const updateResponse = await garageController.updateCarMileage(request, sid, carId, currentMileage - 1);
		expect(updateResponse.status()).toBe(400);
	});

	test('Delete car from garage', async ({ request }) => {
		const sid = getSidForUser('validUser2');
		const carId = await garageController.getFirstCarId(request, sid);
		expect(carId).toBeTruthy();
		const response = await garageController.deleteCar(request, sid, carId);
		expect(response.status()).toBe(200);
	});
});
