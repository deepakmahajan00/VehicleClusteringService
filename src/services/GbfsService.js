const axios = require('axios');

class GbfsService {

    async getFreeBikeStatus(){
        return await this.getData("https://data-sharing.tier-services.io/tier_paris/gbfs/2.2/free-bike-status");
    }

    async getStationInformation(){
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
}

module.exports = GbfsService;