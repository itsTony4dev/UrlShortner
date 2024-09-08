import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRoutes from "./Router/urlRoutes";

dotenv.config();
 
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", urlRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

export default app;
