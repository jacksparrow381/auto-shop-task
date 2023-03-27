const router = require("express").Router();
const Category = require("../models/Category");
const authMiddleware = require("../middlewares/authMiddleware");
const { check, param, validationResult } = require("express-validator");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
});

router.post(
  "/create",
  [
    check("categoryName", "Category name is required")
      .isString()
      .not()
      .isEmpty(),
  ],
  authMiddleware,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { categoryName } = req.body;

      const category = new Category({
        category_name: categoryName,
      });

      await category.save();

      res.send(category);
    } catch (error) {
      res.send(error);
    }
  }
);

router.put(
  "/update/:id",
  [
    check("categoryName", "Category name is required")
      .isString()
      .not()
      .isEmpty(),
    param("id", "Category id is required").isString().not().isEmpty(),
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

      const { categoryName } = req.body;

      await Category.findByIdAndUpdate(req.params.id, {
        category_name: categoryName,
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
  [param("id", "Category id is required").isString().not().isEmpty()],
  authMiddleware,
  async (req, res) => {
    try {
      // Lets check if there are any errors in the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      await Category.findByIdAndDelete(req.params.id);

      const categories = await Category.find();
      res.send(categories);
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = router;
