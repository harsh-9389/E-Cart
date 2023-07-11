import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

//config env
dotenv.config();

//connect to db
connectDB();

//init app
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

//rest apis
app.get("/", (req, res) => {
  res.send("Hello World");
});

//server setting
const port = process.env.PORT || 5000;
const mode = process.env.DEV_MODE || "development";
app.listen(port, () => {
  console.log(`Server is running in ${mode} mode on port ${port}`.bgCyan.white);
});
