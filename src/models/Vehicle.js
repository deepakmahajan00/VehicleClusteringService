const manageBikesService = require('../services/ManageBikesService');
class Vehicle {
    async findAvailableBikes(availability) {
        let result = await manageBikesService.getAvailableVechile(availability);
        return [result];
    }

    async findByVehicleType(type) {
        let result = await manageBikesService.getBikesByType(type);
        return [result];
    }

    async findByPricingPlan(pricingPlan) {
        let result = await manageBikesService.getBikesByPricingPlan(pricingPlan);
        return [result];
    }

    async findStationByName(stationName) {
        let result = await manageBikesService.getStationDetailByName(stationName);
        return [result];
    }

    async findStationStatusByName(stationName) {
        let result = await manageBikesService.getStationStatusByName(stationName);
        return [result];
    }
}
module.exports = new Vehicle();