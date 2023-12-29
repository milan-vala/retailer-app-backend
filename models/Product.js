const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
