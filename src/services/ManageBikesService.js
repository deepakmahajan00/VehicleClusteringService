const GbfsService = require('./GbfsService');

class ManageBikesService extends GbfsService {
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
        if (planId.length > 0) {
            let bikesResult = await this.getFreeBikeStatus();
            let result = bikesResult.data['bikes'];
            return await this.filterObject(result, 'pricing_plan_id', planId);
        }
        return [];
    }

    async getBikesByPricingPlan(pricingPlan)
    {
        return await this.getVehiclePricingPlanByName(pricingPlan);
    }

    async getStationDetailByName(stationName)
    {
        return await this.getStationInfomation(stationName);
    }

    async getStationInfomation(stationName)
    {
        let stationDetails = await this.getStationInformation();
        let result = stationDetails.data['stations'];
        return this.filterObject(result, 'name', stationName);
    }

    async getStationStatusByName(stationName)
    {
        let stations = await this.getStationInfomation(stationName);
        let intersectionResult = [];
        if (Object.keys(stations).length > 0) {
            let stationStatus = await this.getStationStatus();
            stationStatus = stationStatus.data['stations'];
            for (let x in stations) {
                let newResult = [];
                newResult.push({'station': stations[x]});
                for (let y in stationStatus) {
                    if (stationStatus[y].station_id == stations[x].station_id) {
                        newResult.push({'station-status': stationStatus[y]});
                        stationStatus.pop();
                    }
                }
                intersectionResult.push(newResult);
            }
        }
        return intersectionResult;
    }
}

module.exports = new ManageBikesService();