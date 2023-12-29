const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user.password !== password) {
      return res.status(404).json({ message: "Incorrect email or password!" });
    }
    if (!user) {
      return res.status(404).json({ message: "No such user." });
    }
    res.status(200).json({ name: user.name, email: user.email, userId: user._id });
  } catch (error) {
    console.log("Error while getting a user", error.message);
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userCreateResponse = await User.create({ name, email, password });
    res.status(200).json(userCreateResponse);
  } catch (error) {
    console.log("Error while creating user: ", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  createUser,
};
