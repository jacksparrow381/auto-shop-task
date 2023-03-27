const router = require("express").Router();
const Vehicle = require("../models/Vehicle");
const authMiddleware = require("../middlewares/authMiddleware");
const { check, param, validationResult } = require("express-validator");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (error) {
    res.send(error);
  }
});

router.post(
  "/create",
  [
    check("carName", "Car name is required").isString().not().isEmpty(),
    check("carCategory", "Car category is required").isString().not().isEmpty(),
    check("carColor", "Car color is required").isString().not().isEmpty(),
    check("carPrice", "Car price is required").isNumeric().not().isEmpty(),
    check("carMake", "Car make is required").isString().not().isEmpty(),
    check("carRegistrationNumber", "Car registration number is required")
      .isString()
      .not()
      .isEmpty(),
    check("carModel", "Car model is required").isNumeric().not().isEmpty(),
  ],
  authMiddleware,
  async (req, res) => {
    try {
      // Lets check if there are any errors in the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

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
  }
);

router.put(
  "/update/:id",
  [
    check("carName", "Car name is required").isString().not().isEmpty(),
    check("carCategory", "Car category is required").isString().not().isEmpty(),
    check("carColor", "Car color is required").isString().not().isEmpty(),
    check("carPrice", "Car price is required").isNumeric().not().isEmpty(),
    check("carModel", "Car model is required").isNumeric().not().isEmpty(),
    check("carMake", "Car make is required").isString().not().isEmpty(),
    check(
      "carRegistrationNumber",
      "Car registration number is required"
    ).isString(),
    param("id", "Vehicle id is required").isString().not().isEmpty(),
  ],
  authMiddleware,
  async (req, res) => {
    try {
      // Lets check if there are any errors in the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Lets get the data from the request body
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
  }
);

router.delete(
  "/delete/:id",
  [param("id", "Vehicle id is required").isString().not().isEmpty()],
  authMiddleware,
  async (req, res) => {
    try {
      // Lets check if there are any errors in the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      await Vehicle.findByIdAndDelete(req.params.id);

      const vehicles = await Vehicle.find();
      res.send(vehicles);
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = router;
