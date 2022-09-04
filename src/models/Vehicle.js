const gbfsService = require('../services/GbfsService');
class Vehicle {
    async findAvailableBikes(availability) {
        let result = await gbfsService.getAvailableVechile(availability);
        return [result];
    }

    async findByVehicleType(type) {
        let result = await gbfsService.getBikesByType(type);
        return [result];
    }

    async findByPricingPlan(pricingPlan) {
        let result = await gbfsService.getBikesByPricingPlan(pricingPlan);
        return [result];
    }
}
module.exports = new Vehicle();