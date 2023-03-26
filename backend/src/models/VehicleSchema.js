const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    verhicle_name: {
      type: String,
      required: true,
    },
    registration_number: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    model: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("vehicle", vehicleSchema);
