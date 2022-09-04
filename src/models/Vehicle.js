const bikesService = require('../services/BikesService');
class Vehicle {
    async findAvailableBikes(availability) {
        let result = await bikesService.getAvailableVechile(availability);
        return [result];
    }

    async findByVehicleType(type) {
        let result = await bikesService.getBikesByType(type);
        return [result];
    }

    async findByPricingPlan(pricingPlan) {
        let result = await bikesService.getBikesByPricingPlan(pricingPlan);
        return [result];
    }
}
module.exports = new Vehicle();