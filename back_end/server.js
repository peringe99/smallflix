const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { protect, checkUser } = require("./middleware/auth.middleware");
const authRoutes = require("./routes/auth.routes");
const movieRoutes = require("./routes/movie.routes");
const categoryRoutes = require("./routes/category.routes");
const adminRoutes = require("./routes/admin/admin.routes");
const initial = require("./helpers/seeds");

const app = express();

//Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.listen(process.env.PORT, () => {
  console.log(`Server Up and running on port ${4000}`);
});

//Route
app.get("/isAuthenticated", checkUser);

app.use(authRoutes);
app.use(protect, movieRoutes);
app.use(protect, categoryRoutes);
app.use("/admin", protect, adminRoutes);
