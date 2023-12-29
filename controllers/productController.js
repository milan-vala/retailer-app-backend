const User = require("../models/User");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log("Error while creating a product", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "No such Product." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log("Error while getting a product", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const products = await Product.find({ userId });
    if (!products.length) {
      return res.status(404).json({ message: "There are no Products." });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log("Error while getting a products", error.message);
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, description } = req.body;

    const updatedProduct = await Product.updateOne(
      { _id: productId },
      { $set: { name, price, description } }
    );

    if (updatedProduct.nModified === 0) {
      return res.status(404).json({ message: "No such Product." });
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log("Error while updating a products", error.message);
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const response = await Product.findOneAndDelete({ _id: productId });
    if (!response) {
      return res.status(404).json({ message: "No such Product." });
    }
    res.status(200).json({ message: "Product deleted successfully", deletedProduct: response });
  } catch (error) {
    console.log("Error while deleting a products", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};
