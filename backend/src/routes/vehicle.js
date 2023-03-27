const router = require("express").Router();
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (error) {
    res.send(error);
  }
});

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const {
      carName,
      carCategory,
      carColor,
      carPrice,
      carMake,
      carRegistrationNumber,
      carModel,
    } = req.body;

    const vehicle = new Vehicle({
      verhicle_name: carName,
      registration_number: carRegistrationNumber,
      category: carCategory,
      model: carModel,
      color: carColor,
      make: carMake,
      price: carPrice,
    });

    await vehicle.save();

    res.send(vehicle);
  } catch (error) {
    res.send(error);
  }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const {
      carName,
      carCategory,
      carColor,
      carPrice,
      carMake,
      carRegistrationNumber,
      carModel,
    } = req.body;

    await Vehicle.findByIdAndUpdate(req.params.id, {
      verhicle_name: carName,
      registration_number: carRegistrationNumber,
      category: carCategory,
      model: carModel,
      color: carColor,
      make: carMake,
      price: carPrice,
    });

    const vehicles = await Vehicle.find();

    res.send(vehicles);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);

    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
