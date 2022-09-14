const express = require('express');
const router = express.Router();

const  {
    getAvailableVehicle,
    getNotAvailableVehicle,
    getVehicleByType,
    getVehicleByPricingPlan,
    getStationDetailByName,
    getStationStationByName,
} = require('../controllers/vehicleController');

router.get("/available", getAvailableVehicle);
router.get("/not-available", getNotAvailableVehicle);
router.get("/type/:type", getVehicleByType);
router.get("/pricing/:pricingPlan", getVehicleByPricingPlan);
router.get("/station/:stationName", getStationDetailByName);
router.get("/station-status/:stationName", getStationStationByName);

module.exports = router;