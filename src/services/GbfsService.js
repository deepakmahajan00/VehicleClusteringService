const axios = require('axios');

class GbfsService {

    async getFreeBikeStatus(){
        return await this.getData("https://data-sharing.tier-services.io/tier_paris/gbfs/2.2/free-bike-status");
    }

    async getBikeStationInformation(){
        return await this.getData("https://data-sharing.tier-services.io/tier_paris/gbfs/2.2/station-information");
    }

    async getStationStatus(){
        return await this.getData("https://data-sharing.tier-services.io/tier_paris/gbfs/2.2/station-status");
    }

    async getVehicleType(){
        return await this.getData("https://data-sharing.tier-services.io/tier_paris/gbfs/2.2/vehicle-types");
    }

    async getPricingPlan(){
        return await this.getData("https://data-sharing.tier-services.io/tier_paris/gbfs/2.2/system-pricing-plans");
    }

    async getData (url) {
        return await axios.get(url)
            .then(function (response) {
                return response.data;})
            .catch(function (error) {
                console.log(error);
            });
    }

    async getAvailableVechile(availability) {
        let bikes = await this.getFreeBikeStatus();
        let result = bikes.data['bikes'];
        return await this.filterObject(result, 'is_disabled', availability);
    }

    async filterObject(result, field, value)
    {
        return Object.keys(result).filter(function (key) {
            return result[key][field] === value;
        }).reduce(function (obj, key) {
            obj[key] = result[key];
            return obj;
        }, {});
    }

    async getBikesByType(type)
    {
        let bikesResult = await this.getFreeBikeStatus();
        let result = bikesResult.data['bikes'];
        return await this.filterObject(result, 'vehicle_type_id', type);
    }

    async getPricingPlanIdByName(plan)
    {
        let pricingPlans = await this.getPricingPlan();
        pricingPlans = pricingPlans.data['plans'];
        let planType = Object.keys(pricingPlans).filter(function(key) {
            return pricingPlans[key].name === plan;
        }).reduce(function(obj, key){
            obj[key] = pricingPlans[key];
            return obj[key];
        }, {});
        return Object.keys(planType).length > 0 ? planType.plan_id : 0;
    }

    async getVehiclePricingPlanByName(plan)
    {
        const planId = await this.getPricingPlanIdByName(plan);
        let bikesResult = await this.getFreeBikeStatus();
        let result = bikesResult.data['bikes'];
        return await this.filterObject(result, 'pricing_plan_id', planId);
    }

    async getBikesByPricingPlan(pricingPlan)
    {
        return await this.getVehiclePricingPlanByName(pricingPlan);
    }
}

module.exports = new GbfsService();