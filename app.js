require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
// const { upload } = require("./middlewares/fileUpload");

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening to port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to databse: ", error);
  });

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

const baseUri = "/api/v1";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(baseUri, userRoutes);
app.use(`${baseUri}/product`, productRoutes);
