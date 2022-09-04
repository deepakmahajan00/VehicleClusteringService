const Vehicle = require('../models/Vehicle');

const getAvailableVehicle = async (req, res, next) => {
    try {
        let [vehicle, _] = await Vehicle.findAvailableBikes(false);
        let totalRecords = Object.keys(vehicle).length;
        console.log('in getAvailableVehicle');
        res.status(200).json({'total_records': totalRecords, vehicle});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getNotAvailableVehicle = async (req, res, next) => {
    try {
        let [vehicle, _] = await Vehicle.findAvailableBikes(true);
        let totalRecords = Object.keys(vehicle).length;
        res.status(200).json({'total_records': totalRecords, vehicle});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getVehicleByType = async (req, res, next) => {
    try {
        let vehicleType = req.params.type;
        if (vehicleType.length === 0 || typeof vehicleType == 'undefined') {
            res.status(500).json({'error_message': 'Bad request param. type input is missing'});
        }
        let [vehicle, _] = await Vehicle.findByVehicleType(vehicleType);
        let totalRecords = Object.keys(vehicle).length;
        res.status(200).json({'total_records': totalRecords, 'bikes' : vehicle});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getVehicleByPricingPlan = async (req, res, next) => {
    try {
        let pricingPlan = req.params.pricingPlan;
        if (pricingPlan.length === 0 || typeof pricingPlan == 'undefined') {
            res.status(500).json({'error_message': 'Bad request param. Pricing plan input is missing'});
        }
        let [vehicle, _] = await Vehicle.findByPricingPlan(pricingPlan);
        let totalRecords = Object.keys(vehicle).length;
        res.status(200).json({'total_records': totalRecords, 'bikes' : vehicle});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    getAvailableVehicle,
    getNotAvailableVehicle,
    getVehicleByType,
    getVehicleByPricingPlan,
};
