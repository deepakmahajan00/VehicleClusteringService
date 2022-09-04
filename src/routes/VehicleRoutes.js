const express = require('express');
const router = express.Router();

const  {
    getAvailableVehicle,
    getNotAvailableVehicle,
    getVehicleByType,
    getVehicleByPricingPlan,
} = require('../controllers/vehicleController');

router.get("/available", getAvailableVehicle);
router.get("/not-available", getNotAvailableVehicle);
router.get("/type/:type", getVehicleByType);
router.get("/pricing/:pricingPlan", getVehicleByPricingPlan);

module.exports = router;