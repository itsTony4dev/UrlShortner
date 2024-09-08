import mongoose, { Schema } from "mongoose";

const urlSchema: Schema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  urlCode: { type: String, required: true, unique: true },
  date: { type: String, default: Date.now },
});

const Url = mongoose.model("URL", urlSchema);

export default Url;
